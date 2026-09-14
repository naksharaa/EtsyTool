import React, { useState, useEffect } from 'react';
import { Eye, Heart, DollarSign, Package, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedListings = localStorage.getItem('etsy_listings');
      const storedShop = localStorage.getItem('etsy_shop_data');

      if (storedListings) {
        const parsed = JSON.parse(storedListings);
        if (Array.isArray(parsed)) {
          setListings(parsed);
        }
      }

      if (storedShop) {
        setShop(JSON.parse(storedShop));
      }
    } catch (e) {
      console.error('Failed to load data');
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Yet</h2>
          <p className="text-gray-600 mb-6">Connect your Etsy API to see real-time data from your shop.</p>
          <div className="text-sm text-gray-500">
            <p className="mb-2">To get started:</p>
            <ol className="text-left max-w-md mx-auto space-y-2">
              <li>1. Go to API Settings in the sidebar</li>
              <li>2. Enter your Etsy API key and shared secret</li>
              <li>3. Click "Test Connection"</li>
              <li>4. Click "Sync Listings" to fetch your data</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
  const totalFavorites = listings.reduce((sum, l) => sum + (l.num_favorers || 0), 0);
  const avgPrice = listings.length > 0
    ? listings.reduce((sum, l) => sum + ((l.price?.amount || 0) / (l.price?.divisor || 100)), 0) / listings.length
    : 0;

  const topListings = [...listings]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const categoryData = prepareCategoryData(listings);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {shop ? `Welcome back, ${shop.shop_name}!` : 'Dashboard'}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {shop ? `${shop.sale_count || 0} total sales · ${(shop.average_rating || 0).toFixed(1)}★ rating` : 'Real-time shop data'}
          </p>
        </div>
        {shop?.url && (
          <a
            href={shop.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Shop
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          label="Total Views"
          value={totalViews.toLocaleString()}
          color="blue"
        />
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          label="Total Favorites"
          value={totalFavorites.toLocaleString()}
          color="pink"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Avg Order Value"
          value={`$${avgPrice.toFixed(2)}`}
          color="green"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Active Listings"
          value={listings.length.toString()}
          color="purple"
        />
      </div>

      {categoryData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Listings by Views</h2>
        <div className="space-y-3">
          {topListings.map((listing, index) => (
            <div key={listing.listing_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm line-clamp-1">{listing.title}</p>
                  <p className="text-xs text-gray-500">
                    ${((listing.price?.amount || 0) / (listing.price?.divisor || 100)).toFixed(2)} · {listing.views} views · {listing.num_favorers} favorites
                  </p>
                </div>
              </div>
              {listing.url && (
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {shop && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shop Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Shop Name</p>
              <p className="font-medium text-gray-800">{shop.shop_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="font-medium text-gray-800">{shop.sale_count || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="font-medium text-gray-800">{(shop.average_rating || 0).toFixed(1)}★ ({shop.review_count || 0} reviews)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Shop Favorites</p>
              <p className="font-medium text-gray-800">{shop.num_favorers || 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function prepareCategoryData(listings: any[]) {
  const categories: Record<string, number> = {};
  const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b', '#06b6d4', '#ec4899'];

  listings.forEach(listing => {
    const category = listing.tags?.[0] || 'Other';
    categories[category] = (categories[category] || 0) + 1;
  });

  return Object.entries(categories)
    .map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}
