export interface EtsyListing {
  listing_id: number;
  title: string;
  description: string;
  price: string;
  tags: string[];
  category: string;
  views: number;
  favorites: number;
  sales: number;
  created: string;
  images: string[];
  score: number;
  issues: string[];
  suggestions: string[];
}

export interface NicheData {
  name: string;
  demand: number;
  competition: number;
  opportunity: number;
  trend: 'up' | 'down' | 'stable';
  avgPrice: string;
  monthlySearches: number;
  topKeywords: string[];
}

export interface SalesIssue {
  listing_id: number;
  title: string;
  issues: {
    category: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
    fix: string;
  }[];
  estimatedImpact: string;
}

export interface ApiConfig {
  apiKey: string;
  shopId: string;
  connected: boolean;
}
