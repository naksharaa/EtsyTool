// Etsy API Service - Fetches real data from Etsy Open API v3

const ETSY_API_BASE = 'https://openapi.etsy.com/v3';
const CORS_PROXIES = [
  'https://corsproxy.io/?url=',
  'https://api.allorigins.win/raw?url=',
];

const STORAGE = {
  API_KEY: 'stylinsoul_api_key',
  SECRET: 'stylinsoul_shared_secret',
  SHOP_ID: 'stylinsoul_shop_id',
  CONNECTED: 'stylinsoul_connected',
  SHOP_DATA: 'stylinsoul_shop_data',
  LISTINGS: 'stylinsoul_listings',
  LISTINGS_UPDATED: 'stylinsoul_listings_updated',
  RECEIPTS: 'stylinsoul_receipts',
  LAST_SYNC: 'stylinsoul_last_sync',
};

export interface EtsyShop {
  shop_id: number;
  shop_name: string;
  title: string;
  description: string;
  sale_count: number;
  num_favorers: number;
  creation_tsz: number;
  review_count: number;
  average_rating: number;
  url: string;
  image_url_760x100: string;
  icon_url_fullxfull: string;
}

export interface EtsyListing {
  listing_id: number;
  title: string;
  description: string;
  price: { amount: number; divisor: number; currency_code: string };
  tags: string[];
  taxonomy_id: number;
  quantity: number;
  views: number;
  num_favorers: number;
  url: string;
  listing_type: string;
  created_tsz: number;
  state: string;
  images: { url_fullxfull: string; full_height: number; full_width: number }[];
  shop_id: number;
  user_who_made: number;
  shipping_template_id: number;
  processing_min: number;
  processing_max: number;
  is_supply: number;
  who_made: string;
  when_made: string;
  style: string[];
  category_path: string[];
}

export interface EtsyReceipt {
  receipt_id: number;
  buyer_user_id: number;
  name: string;
  first_line: string;
  city: string;
  state: string;
  country_iso_code: string;
  format_price: string;
  price_gross: string;
  price_shipping: string;
  subtotal: string;
  total_price: string;
  total_tax_price: string;
  seller_user_id: number;
  was_paid: boolean;
  transactions: any[];
  created_tsz: number;
}

function getApiKey(): string {
  return localStorage.getItem(STORAGE.API_KEY) || '';
}

function getShopId(): string {
  return localStorage.getItem(STORAGE.SHOP_ID) || '';
}

async function fetchWithProxy(url: string, headers: Record<string, string>): Promise<Response> {
  // Try direct first
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, { 
      headers,
      signal: controller.signal 
    });
    clearTimeout(timeout);
    if (response.ok || response.status === 401 || response.status === 403 || response.status === 404) {
      return response;
    }
  } catch (e) {
    // CORS blocked or timeout, try proxies
  }

  // Try each CORS proxy
  for (const proxy of CORS_PROXIES) {
    try {
      const proxyUrl = proxy + encodeURIComponent(url);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(proxyUrl, {
        headers: {
          ...headers,
          'x-requested-with': 'XMLHttpRequest',
        },
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (response.ok) return response;
    } catch (e) {
      continue;
    }
  }

  throw new Error('CORS blocked: Etsy API does not allow browser requests. You need a backend proxy server to access the API. See instructions below.');
}

export async function testConnection(apiKey: string, shopId: string): Promise<{
  success: boolean;
  shop?: EtsyShop;
  error?: string;
}> {
  if (!apiKey || !shopId) {
    return { success: false, error: 'API key and shop ID are required' };
  }

  const headers = {
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  };

  try {
    const url = `${ETSY_API_BASE}/application/shops/${shopId}`;
    const response = await fetchWithProxy(url, headers);

    if (response.ok) {
      const data = await response.json();
      return { success: true, shop: data };
    } else if (response.status === 401 || response.status === 403) {
      return { success: false, error: 'Invalid API key. Please check your keystring.' };
    } else if (response.status === 404) {
      return { success: false, error: `Shop "${shopId}" not found. Check your shop name.` };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || `HTTP ${response.status}` };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection failed' };
  }
}

export async function fetchShopData(apiKey: string, shopId: string): Promise<EtsyShop | null> {
  const headers = { 'x-api-key': apiKey, 'Content-Type': 'application/json' };
  try {
    const url = `${ETSY_API_BASE}/application/shops/${shopId}`;
    const response = await fetchWithProxy(url, headers);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem(STORAGE.SHOP_DATA, JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Failed to fetch shop data:', e);
  }
  return null;
}

export async function fetchListings(
  apiKey: string,
  shopId: string,
  onProgress?: (current: number, total: number, status: string) => void
): Promise<EtsyListing[]> {
  const headers = { 'x-api-key': apiKey, 'Content-Type': 'application/json' };
  const allListings: EtsyListing[] = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  onProgress?.(0, 111, 'Starting sync...');

  while (hasMore) {
    try {
      onProgress?.(allListings.length, 111, `Fetching listings ${offset + 1}-${offset + limit}...`);
      const url = `${ETSY_API_BASE}/application/shops/${shopId}/listings/active?limit=${limit}&offset=${offset}&sort_on=created&sort_order=down`;
      const response = await fetchWithProxy(url, headers);

      if (response.ok) {
        const data = await response.json();
        const listings = data.results || [];
        allListings.push(...listings);
        hasMore = data.pagination && data.pagination.next_offset !== null;
        offset += limit;

        if (data.count) {
          onProgress?.(allListings.length, data.count, `Fetched ${allListings.length} of ${data.count} listings...`);
        }
      } else {
        throw new Error(`API returned ${response.status}`);
      }
    } catch (err) {
      hasMore = false;
    }
  }

  if (allListings.length > 0) {
    localStorage.setItem(STORAGE.LISTINGS, JSON.stringify(allListings));
    localStorage.setItem(STORAGE.LISTINGS_UPDATED, new Date().toISOString());
    localStorage.setItem(STORAGE.LAST_SYNC, new Date().toISOString());
  }

  onProgress?.(allListings.length, allListings.length, 'Sync complete!');
  return allListings;
}

export async function fetchReceipts(apiKey: string, shopId: string): Promise<EtsyReceipt[]> {
  const headers = { 'x-api-key': apiKey, 'Content-Type': 'application/json' };
  try {
    const url = `${ETSY_API_BASE}/application/shops/${shopId}/receipts?limit=100&was_paid=true`;
    const response = await fetchWithProxy(url, headers);
    if (response.ok) {
      const data = await response.json();
      const receipts = data.results || [];
      localStorage.setItem(STORAGE.RECEIPTS, JSON.stringify(receipts));
      return receipts;
    }
  } catch (e) {
    console.error('Failed to fetch receipts:', e);
  }
  return [];
}

export function getStoredListings(): EtsyListing[] {
  try {
    const data = localStorage.getItem(STORAGE.LISTINGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getStoredShop(): EtsyShop | null {
  try {
    const data = localStorage.getItem(STORAGE.SHOP_DATA);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function getStoredReceipts(): EtsyReceipt[] {
  try {
    const data = localStorage.getItem(STORAGE.RECEIPTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getLastSyncTime(): string | null {
  return localStorage.getItem(STORAGE.LAST_SYNC);
}

export function clearAllData() {
  Object.values(STORAGE).forEach(key => localStorage.removeItem(key));
}

export function calculateRevenue(listings: EtsyListing[]): {
  totalRevenue: number;
  monthlyRevenue: number;
  monthlySales: number;
  avgOrderValue: number;
  monthlyData: { month: string; sales: number; revenue: number }[];
} {
  // Since we can't get exact sales per listing from public API,
  // we estimate based on views and favorites
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Estimate: conversion rate ~0.5-1% for views, or ~5-10% for favorites
  let estimatedMonthlySales = 0;
  let estimatedMonthlyRevenue = 0;

  const monthlyData: { month: string; sales: number; revenue: number }[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = months[d.getMonth()];

    // Estimate based on listing age and views
    const listingsThisMonth = listings.filter(l => {
      const created = new Date(l.created_tsz * 1000);
      return created <= d;
    });

    // Rough estimate: each listing gets ~50-200 views/month, 0.5-1% conversion
    const avgViewsPerListing = 100;
    const conversionRate = 0.008;
    const sales = Math.round(listingsThisMonth.length * avgViewsPerListing * conversionRate);
    const avgPrice = listingsThisMonth.length > 0
      ? listingsThisMonth.reduce((sum, l) => sum + (l.price.amount / l.price.divisor), 0) / listingsThisMonth.length
      : 35.74;
    const revenue = Math.round(sales * avgPrice * 100) / 100;

    monthlyData.push({ month: monthName, sales, revenue });
    if (i === 0) {
      estimatedMonthlySales = sales;
      estimatedMonthlyRevenue = revenue;
    }
  }

  const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
  const avgPrice = listings.length > 0
    ? listings.reduce((sum, l) => sum + (l.price.amount / l.price.divisor), 0) / listings.length
    : 35.74;

  return {
    totalRevenue: Math.round(totalViews * 0.005 * avgPrice),
    monthlyRevenue: estimatedMonthlyRevenue,
    monthlySales: estimatedMonthlySales,
    avgOrderValue: Math.round(avgPrice * 100) / 100,
    monthlyData,
  };
}
