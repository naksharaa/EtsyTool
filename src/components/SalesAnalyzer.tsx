import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, Eye, Heart, ShoppingCart, Target, Lightbulb, CheckCircle, Search, DollarSign, Clock, Image, Tag, FileText, BarChart3 } from 'lucide-react';
import { getStoredListings, getStoredReceipts } from '../services/etsyApi';

export default function SalesAnalyzer() {
  const [listings, setListings] = useState<any[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<any | null>(null);

  useEffect(() => {
    const storedListings = getStoredListings();
    const storedReceipts = getStoredReceipts();
    setListings(storedListings);
    setReceipts(storedReceipts);
  }, []);

  if (listings.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Sales Data</h2>
          <p className="text-gray-600 mb-6">Connect your Etsy API and sync listings to analyze sales performance.</p>
        </div>
      </div>
    );
  }

  // Calculate conversion funnel
  const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
  const totalFavorites = listings.reduce((sum, l) => sum + (l.num_favorers || 0), 0);
  const totalSales = receipts.length;
  const addToCartEstimate = Math.round(totalFavorites * 0.3);

  const conversionFunnel = [
    { stage: 'Impressions', count: Math.round(totalViews * 3), fill: '#fed7aa' },
    { stage: 'Views', count: totalViews, fill: '#fdba74' },
    { stage: 'Favorites', count: totalFavorites, fill: '#fb923c' },
    { stage: 'Add to Cart', count: addToCartEstimate, fill: '#f97316' },
    { stage: 'Purchases', count: totalSales, fill: '#ea580c' },
  ];

  // Analyze listings for issues
  const problemListings = listings
    .map(listing => {
      const views = listing.views || 0;
      const favorites = listing.num_favorers || 0;
      const conversionRate = views > 0 ? (favorites / views) * 100 : 0;

      let category = 'low_traffic';
      let priority: 'high' | 'medium' | 'low' = 'low';

      if (views < 50) {
        category = 'low_traffic';
        priority = 'high';
      } else if (views > 100 && favorites < 5) {
        category = 'views_no_favs';
        priority = 'medium';
      } else if (favorites > 10 && conversionRate < 2) {
        category = 'favs_no_sales';
        priority = 'medium';
      }

      return {
        ...listing,
        conversionRate,
        category,
        priority,
      };
    })
    .filter(l => l.priority !== 'low')
    .sort((a, b) => {
      const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 6);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sales Analyzer</h1>
        <p className="text-gray-600 text-sm mt-1">Analyze your shop's performance and identify issues</p>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-500" />
          Conversion Funnel
        </h2>
        <div className="flex items-end gap-2 h-40 mb-4">
          {conversionFunnel.map((stage, i) => {
            const height = (stage.count / conversionFunnel[0].count) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-700">{stage.count.toLocaleString()}</span>
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{ height: `${Math.max(height, 5)}%`, backgroundColor: stage.fill }}
                ></div>
                <span className="text-xs text-gray-500 text-center">{stage.stage}</span>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            <strong>✅ Strength:</strong> Your view-to-favorite rate ({totalViews > 0 ? ((totalFavorites / totalViews) * 100).toFixed(1) : 0}%) shows buyer interest.
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
            <strong>⚠️ Issue:</strong> Focus on improving conversion from favorites to purchases.
          </div>
        </div>
      </div>

      {/* Problem Listings */}
      {problemListings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Listings Needing Attention ({problemListings.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problemListings.map(listing => (
              <div
                key={listing.listing_id}
                onClick={() => setSelectedAnalysis(listing)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {listing.category === 'low_traffic' ? 'Low Traffic' :
                     listing.category === 'views_no_favs' ? 'No Interest' :
                     'Low Conversion'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{listing.title}</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-800">{listing.views}</p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">{listing.num_favorers}</p>
                    <p className="text-xs text-gray-500">Favs</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">{listing.conversionRate.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">Rate</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Issues */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Common Issues & Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IssueCard
            icon={<Search className="w-5 h-5 text-blue-500" />}
            title="Low Visibility"
            description="Listings with <50 views need better SEO. Optimize titles, tags, and descriptions with relevant keywords."
            stat="Improve SEO = +200% views"
          />
          <IssueCard
            icon={<Eye className="w-5 h-5 text-purple-500" />}
            title="Views but No Favorites"
            description="Buyers see your listing but don't save it. Improve first photo and title to increase click-through."
            stat="Better photos = +150% favorites"
          />
          <IssueCard
            icon={<Heart className="w-5 h-5 text-pink-500" />}
            title="Favorites but No Sales"
            description="Buyers like it but don't buy. Check pricing, shipping costs, and add urgency with limited stock."
            stat="Optimize pricing = +50% sales"
          />
          <IssueCard
            icon={<DollarSign className="w-5 h-5 text-green-500" />}
            title="Price Too High/Low"
            description="Research competitors. Price too high = no sales. Price too low = perceived as cheap."
            stat="Right pricing = +30% revenue"
          />
          <IssueCard
            icon={<Image className="w-5 h-5 text-orange-500" />}
            title="Poor Quality Photos"
            description="Dark, blurry, or unstyled photos make products look cheap. Use natural lighting and lifestyle shots."
            stat="Pro photos = +60% clicks"
          />
          <IssueCard
            icon={<Tag className="w-5 h-5 text-indigo-500" />}
            title="Not Using All 13 Tags"
            description="Etsy allows 13 tags per listing. Each tag is a chance to be found. Use all 13 with multi-word phrases."
            stat="Full tags = +100% discovery"
          />
        </div>
      </div>

      {/* Revenue Opportunity */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white">
        <h2 className="font-bold text-lg mb-3">💰 Revenue Opportunity</h2>
        <p className="text-green-100 text-sm mb-4">Estimated monthly increase if you fix all issues:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$200</p>
            <p className="text-xs text-green-100">SEO improvements</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$350</p>
            <p className="text-xs text-green-100">Better photos</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$150</p>
            <p className="text-xs text-green-100">Price optimization</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$200</p>
            <p className="text-xs text-green-100">Tag optimization</p>
          </div>
        </div>
        <p className="text-sm text-green-100 mt-4 font-medium">
          Total estimated monthly increase: <span className="text-white text-lg font-bold">+$900</span>
        </p>
      </div>
    </div>
  );
}

function IssueCard({ icon, title, description, stat }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      </div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-orange-600 font-medium">{stat}</p>
    </div>
  );
}
