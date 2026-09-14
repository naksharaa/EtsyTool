import React, { useState } from 'react';
import {
  AlertTriangle, Eye, ShoppingCart, Target, Lightbulb, CheckCircle, Search, DollarSign, Clock, Image, Tag, FileText, BarChart3
} from 'lucide-react';

interface ListingAnalysis {
  id: number;
  title: string;
  views: number;
  favorites: number;
  sales: number;
  conversionRate: number;
  daysListed: number;
  diagnosis: string;
  category: 'low_traffic' | 'views_no_favs' | 'favs_no_sales' | 'cannibalized';
  priority: 'high' | 'medium' | 'low';
  factors: { name: string; score: number; impact: string }[];
  fixes: { action: string; expectedImpact: string; effort: 'low' | 'medium' | 'high' }[];
}

const analyses: ListingAnalysis[] = [
  {
    id: 4347536324,
    title: 'Personalized Welsh Corgi Metal Sign (Duplicate #2)',
    views: 198, favorites: 6, sales: 0, conversionRate: 0, daysListed: 120,
    diagnosis: 'CANNIBALIZED — This listing is nearly identical to 7+ other Corgi listings in your shop. Etsy\'s algorithm is splitting your traffic across all of them, making none rank well. Your main Corgi listing gets most clicks; this one gets scraps.',
    category: 'cannibalized',
    priority: 'high',
    factors: [
      { name: 'SEO', score: 60, impact: 'Decent tags but competing with your own listings' },
      { name: 'Uniqueness', score: 10, impact: 'Critical — 90% same as other Corgi listings' },
      { name: 'Images', score: 55, impact: 'Good quality but same style as others' },
      { name: 'Price', score: 70, impact: 'Same price as all others — no differentiation' },
      { name: 'Conversion', score: 5, impact: '0 sales in 120 days — listing is dead weight' },
      { name: 'Reviews', score: 0, impact: 'No reviews — social proof missing' }
    ],
    fixes: [
      { action: 'DELETE this listing or merge it as a size variant on your main Corgi listing', expectedImpact: '+40% traffic to main listing', effort: 'low' },
      { action: 'Do the same for 5-6 other duplicate Corgi listings — keep only 2-3 maximum', expectedImpact: '+60% overall Corgi sales', effort: 'low' },
      { action: 'Use the freed-up listing slots for NEW niches (nurse, teacher, military)', expectedImpact: '+$500-1000/month revenue', effort: 'medium' },
      { action: 'On remaining Corgi listings, differentiate: "Memorial", "Welcome/Leash Holder", "Custom Name Yard Sign"', expectedImpact: 'Each targets different buyer intent', effort: 'low' }
    ]
  },
  {
    id: 4564833513,
    title: 'Taxidermist Metal Sign Custom Deer Hunter Wall Art',
    views: 145, favorites: 7, sales: 0, conversionRate: 0, daysListed: 90,
    diagnosis: 'Very niche market with low search volume. The listing is well-made but not enough buyers are searching for "taxidermist sign". Need to broaden the appeal while keeping the niche focus.',
    category: 'low_traffic',
    priority: 'medium',
    factors: [
      { name: 'SEO', score: 55, impact: 'Too narrow — "taxidermist" has low search volume' },
      { name: 'Images', score: 65, impact: 'Decent but needs lifestyle context' },
      { name: 'Tags', score: 60, impact: 'Missing broader hunting keywords' },
      { name: 'Description', score: 50, impact: 'Could target more buyer personas' },
      { name: 'Price', score: 70, impact: 'Reasonable for the niche' },
      { name: 'Market Size', score: 25, impact: 'Very small audience' }
    ],
    fixes: [
      { action: 'Broaden title: "Custom Deer Hunting Cabin Sign - Hunter Retirement Gift - Wildlife Metal Wall Art - Man Cave Decor"', expectedImpact: '+200% search visibility', effort: 'low' },
      { action: 'Add tags: "hunting cabin decor", "man cave sign", "retirement gift hunter", "deer camp", "wildlife art"', expectedImpact: '+150% discoverability', effort: 'low' },
      { action: 'Create companion listings: elk hunter, moose hunter, duck hunter, fishing cabin', expectedImpact: 'Cover entire hunting market', effort: 'medium' },
      { action: 'Show sign in a cabin/garage setting with hunting gear around it', expectedImpact: '+80% click-through rate', effort: 'medium' }
    ]
  },
  {
    id: 4562938415,
    title: 'Personalized Greenhouse Door Decor, Custom Laser Cut Metal Wall Art',
    views: 167, favorites: 9, sales: 1, conversionRate: 0.6, daysListed: 60,
    diagnosis: 'Getting some traction but title structure is hurting SEO. "Greenhouse door decor" is an unusual search phrase. Buyers search for "garden sign" or "plant lover gift" instead.',
    category: 'views_no_favs',
    priority: 'medium',
    factors: [
      { name: 'SEO', score: 40, impact: 'Title uses uncommon search terms' },
      { name: 'Images', score: 60, impact: 'Needs to show sign on greenhouse door' },
      { name: 'Tags', score: 55, impact: 'Missing "plant mom", "gardening gift"' },
      { name: 'Description', score: 50, impact: 'Could emphasize gift angle more' },
      { name: 'Price', score: 70, impact: 'Good price point' },
      { name: 'Seasonality', score: 75, impact: 'Spring/summer peak coming' }
    ],
    fixes: [
      { action: 'Rewrite title: "Personalized Garden Metal Sign - Custom Greenhouse Door Decor - Plant Lover Gift - Gardening Wall Art"', expectedImpact: '+180% search matches', effort: 'low' },
      { action: 'Add high-intent tags: "plant mom gift", "gardening present", "garden name sign", "compost sign"', expectedImpact: '+120% discoverability', effort: 'low' },
      { action: 'Create companion: "Vegetable Garden Sign", "Herb Garden Marker", "Flower Garden Name Sign"', expectedImpact: 'Cover entire garden niche', effort: 'medium' },
      { action: 'Time a promotion for spring (March-May) when garden shopping peaks', expectedImpact: '+50% seasonal boost', effort: 'low' }
    ]
  }
];

const conversionFunnel = [
  { stage: 'Impressions', count: 48500, fill: '#fed7aa' },
  { stage: 'Views', count: 14820, fill: '#fdba74' },
  { stage: 'Favorites', count: 856, fill: '#fb923c' },
  { stage: 'Add to Cart', count: 285, fill: '#f97316' },
  { stage: 'Purchases', count: 95, fill: '#ea580c' },
];

export default function SalesAnalyzer() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<ListingAnalysis | null>(null);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'cannibalized': return 'Cannibalized';
      case 'low_traffic': return 'Low Traffic';
      case 'views_no_favs': return 'Views but No Interest';
      case 'favs_no_sales': return 'Interest but No Sales';
      default: return 'Unknown';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'cannibalized': return <AlertTriangle className="w-4 h-4" />;
      case 'low_traffic': return <Search className="w-4 h-4" />;
      case 'views_no_favs': return <Eye className="w-4 h-4" />;
      case 'favs_no_sales': return <ShoppingCart className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Sales Analyzer</h2>
        <p className="text-gray-500 text-sm mt-1">Why your metal sign listings aren't selling — and exactly how to fix them</p>
      </div>

      {/* Shop Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-500" />
          StylinsoulMetalArt — Conversion Funnel (Last 30 Days)
        </h3>
        <div className="flex items-end gap-2 h-40 mb-4">
          {conversionFunnel.map((stage, i) => {
            const height = (stage.count / conversionFunnel[0].count) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-700">{stage.count.toLocaleString()}</span>
                <div className="w-full rounded-t-lg transition-all duration-500" style={{ height: `${Math.max(height, 5)}%`, backgroundColor: stage.fill }}></div>
                <span className="text-xs text-gray-500 text-center">{stage.stage}</span>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            <strong>✅ Strength:</strong> Your view-to-favorite rate (5.8%) is strong — buyers LOVE your product photos and designs.
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
            <strong>⚠️ Issue:</strong> Cart-to-purchase rate (33%) needs improvement, and AOV is flat at $35.74 — you're leaving money on the table with no size upsells.
          </div>
        </div>
      </div>

      {/* Problem Listings */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Listings Needing Attention
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyses.map(analysis => (
            <div key={analysis.id} onClick={() => setSelectedAnalysis(analysis)}
              className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${selectedAnalysis?.id === analysis.id ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  analysis.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {getCategoryIcon(analysis.category)}
                  {getCategoryLabel(analysis.category)}
                </span>
                <span className="text-xs text-gray-400">{analysis.daysListed}d</span>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{analysis.title}</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-lg font-bold text-gray-800">{analysis.views}</p><p className="text-xs text-gray-500">Views</p></div>
                <div><p className="text-lg font-bold text-gray-800">{analysis.favorites}</p><p className="text-xs text-gray-500">Favs</p></div>
                <div><p className="text-lg font-bold text-gray-800">{analysis.sales}</p><p className="text-xs text-gray-500">Sales</p></div>
              </div>
              <p className="text-xs text-gray-500 mt-3 line-clamp-2">{analysis.diagnosis}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Analysis */}
      {selectedAnalysis && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Deep Analysis</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedAnalysis.diagnosis}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedAnalysis.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
              {selectedAnalysis.priority === 'high' ? '🔴 High Priority' : '🟡 Medium Priority'}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-orange-500" />Performance Factors</h4>
              <div className="space-y-3">
                {selectedAnalysis.factors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                      <span className={`text-sm font-bold ${factor.score >= 70 ? 'text-green-600' : factor.score >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{factor.score}/100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${factor.score >= 70 ? 'bg-green-500' : factor.score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${factor.score}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{factor.impact}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-500" />Action Plan</h4>
              <div className="space-y-3">
                {selectedAnalysis.fixes.map((fix, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{fix.action}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{fix.expectedImpact}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${fix.effort === 'low' ? 'bg-blue-100 text-blue-700' : fix.effort === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{fix.effort} effort</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metal Sign Specific Issues Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Why Metal Sign Listings Don't Sell — Shop-Specific Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IssueCard icon={<AlertTriangle className="w-5 h-5 text-red-500" />} title="Listing Cannibalization" description="8+ Corgi listings splitting traffic. Etsy shows only 1-2 per shop in search. Consolidate to 2-3 max." stat="Fix this = +40% Corgi sales" />
          <IssueCard icon={<DollarSign className="w-5 h-5 text-green-500" />} title="Flat Pricing Strategy" description="Everything at $35.74 regardless of size. A 48 inch sign should be $90+. Offer size variants with tiered pricing." stat="AOV could increase 50-80%" />
          <IssueCard icon={<Image className="w-5 h-5 text-orange-500" />} title="Missing Lifestyle Photos" description="Signs shown on white background. Buyers need to see scale - show on walls, doors, fences, in rooms." stat="Lifestyle photos = +60% clicks" />
          <IssueCard icon={<Tag className="w-5 h-5 text-blue-500" />} title="35% Off Everything" description="Permanent sale devalues your brand. Buyers see $54.99 to $35.74 and think it is always cheap. Use limited-time sales instead." stat="Creates urgency = +25% conversion" />
          <IssueCard icon={<Clock className="w-5 h-5 text-amber-500" />} title="Outdated Announcement" description="Last updated July 2022! Update with current promotions, new designs, and shipping info." stat="Fresh announcement = trust signal" />
          <IssueCard icon={<FileText className="w-5 h-5 text-purple-500" />} title="Shipping Origin Confusion" description="Ships from Turkey but listed as US. One review mentioned this as a concern. Be transparent!" stat="Transparency = fewer disputes" />
        </div>
      </div>

      {/* Revenue Opportunity Calculator */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white">
        <h3 className="font-bold text-lg mb-3">💰 Revenue Opportunity Calculator</h3>
        <p className="text-green-100 text-sm mb-4">If you implement all recommended fixes, here's the estimated monthly impact:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$400</p>
            <p className="text-xs text-green-100">From consolidating duplicates</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$600</p>
            <p className="text-xs text-green-100">From size variant upsells</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$350</p>
            <p className="text-xs text-green-100">From new niche listings</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold">+$250</p>
            <p className="text-xs text-green-100">From SEO improvements</p>
          </div>
        </div>
        <p className="text-sm text-green-100 mt-4 font-medium">Total estimated monthly increase: <span className="text-white text-lg font-bold">+$1,600</span> (47% revenue growth)</p>
      </div>
    </div>
  );
}

function IssueCard({ icon, title, description, stat }: { icon: React.ReactNode; title: string; description: string; stat: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">{icon}<h4 className="font-semibold text-gray-800 text-sm">{title}</h4></div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-orange-600 font-medium">{stat}</p>
    </div>
  );
}
