import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingDown,
  Eye,
  Heart,
  ShoppingCart,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  Image,
  Tag,
  FileText,
  Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ListingAnalysis {
  id: number;
  title: string;
  views: number;
  favorites: number;
  sales: number;
  conversionRate: number;
  daysListed: number;
  diagnosis: string;
  category: 'no_views' | 'views_no_favs' | 'favs_no_sales' | 'low_traffic';
  priority: 'high' | 'medium' | 'low';
  factors: {
    name: string;
    score: number;
    impact: string;
  }[];
  fixes: {
    action: string;
    expectedImpact: string;
    effort: 'low' | 'medium' | 'high';
  }[];
}

const analyses: ListingAnalysis[] = [
  {
    id: 1002,
    title: 'Wall Art',
    views: 156,
    favorites: 3,
    sales: 0,
    conversionRate: 0,
    daysListed: 45,
    diagnosis: 'Listing not getting enough visibility. Title and tags are too generic - Etsy search cannot match your listing to buyer searches.',
    category: 'low_traffic',
    priority: 'high',
    factors: [
      { name: 'SEO', score: 15, impact: 'Critical - title has only 2 words' },
      { name: 'Images', score: 20, impact: 'Only 1 image, no lifestyle shots' },
      { name: 'Tags', score: 10, impact: 'Only 3 tags instead of 13' },
      { name: 'Description', score: 25, impact: 'Too brief, missing keywords' },
      { name: 'Price', score: 70, impact: 'Pricing is competitive' },
      { name: 'Shipping', score: 60, impact: 'Free shipping not offered' }
    ],
    fixes: [
      { action: 'Rewrite title to include specific keywords: "Boho Abstract Wall Art, Minimalist Line Art Print, Modern Home Decor, Neutral Tones"', expectedImpact: '+300% views', effort: 'low' },
      { action: 'Add 10 more tags including long-tail keywords like "living room art print", "apartment decor", "scandinavian wall art"', expectedImpact: '+200% discoverability', effort: 'low' },
      { action: 'Add 5+ high quality photos including lifestyle shots showing art in a room setting', expectedImpact: '+150% click-through', effort: 'medium' },
      { action: 'Write 200+ word description with natural keyword integration', expectedImpact: '+80% conversion', effort: 'low' }
    ]
  },
  {
    id: 1005,
    title: 'Mug',
    views: 45,
    favorites: 1,
    sales: 0,
    conversionRate: 0,
    daysListed: 30,
    diagnosis: 'Extremely low visibility. The title "Mug" is far too generic to compete. Buyers search for specific styles, materials, and occasions.',
    category: 'low_traffic',
    priority: 'high',
    factors: [
      { name: 'SEO', score: 5, impact: 'Critical - single word title' },
      { name: 'Images', score: 15, impact: 'Only 1 photo, no detail shots' },
      { name: 'Tags', score: 8, impact: 'Only 3 generic tags' },
      { name: 'Description', score: 10, impact: 'Virtually no description' },
      { name: 'Price', score: 65, impact: 'Price is reasonable' },
      { name: 'Attributes', score: 5, impact: 'No attributes filled in' }
    ],
    fixes: [
      { action: 'Completely rewrite title with specifics: "Handmade Ceramic Coffee Mug, Speckled Stoneware Tea Cup, Minimalist Kitchen Pottery, Housewarming Gift"', expectedImpact: '+500% views', effort: 'low' },
      { action: 'Fill ALL listing attributes (color, material, size, style, occasion)', expectedImpact: '+100% in filtered searches', effort: 'low' },
      { action: 'Photograph mug with coffee/tea inside, on a styled table, with packaging', expectedImpact: '+200% click-through', effort: 'medium' },
      { action: 'Use all 13 tags with specific terms: "ceramic coffee mug", "handmade pottery cup", "stoneware tea mug"', expectedImpact: '+300% discoverability', effort: 'low' }
    ]
  },
  {
    id: 1004,
    title: 'Macrame Plant Hanger Boho Home Decor Handmade Cotton Rope',
    views: 654,
    favorites: 34,
    sales: 6,
    conversionRate: 0.92,
    daysListed: 90,
    diagnosis: 'Getting good traffic but conversion rate is below average (0.92% vs 2-3% benchmark). Buyers like what they see but something is preventing purchase.',
    category: 'favs_no_sales',
    priority: 'medium',
    factors: [
      { name: 'SEO', score: 75, impact: 'Good title and tags' },
      { name: 'Images', score: 60, impact: 'Could add more angles' },
      { name: 'Tags', score: 80, impact: 'Good tag coverage' },
      { name: 'Description', score: 65, impact: 'Missing care instructions, dimensions' },
      { name: 'Price', score: 45, impact: '15% above category average' },
      { name: 'Reviews', score: 50, impact: 'Only 2 reviews, need social proof' }
    ],
    fixes: [
      { action: 'Reduce price from $32 to $28 to match category average and increase conversion', expectedImpact: '+40% conversion rate', effort: 'low' },
      { action: 'Add detailed dimensions, weight capacity, and plant size recommendations to description', expectedImpact: '+25% conversion', effort: 'low' },
      { action: 'Offer free shipping (build into price) - Etsy buyers prefer free shipping', expectedImpact: '+30% purchases', effort: 'low' },
      { action: 'Add video showing the macrame detail and plant in the hanger', expectedImpact: '+50% engagement', effort: 'medium' }
    ]
  }
];

const conversionFunnel = [
  { stage: 'Impressions', count: 28500, fill: '#fed7aa' },
  { stage: 'Views', count: 4200, fill: '#fdba74' },
  { stage: 'Favorites', count: 380, fill: '#fb923c' },
  { stage: 'Add to Cart', count: 95, fill: '#f97316' },
  { stage: 'Purchases', count: 42, fill: '#ea580c' },
];

export default function SalesAnalyzer() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<ListingAnalysis | null>(null);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'low_traffic': return 'Low Traffic';
      case 'no_views': return 'No Visibility';
      case 'views_no_favs': return 'Views but No Interest';
      case 'favs_no_sales': return 'Interest but No Sales';
      default: return 'Unknown';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'low_traffic': return <Search className="w-4 h-4" />;
      case 'no_views': return <Eye className="w-4 h-4" />;
      case 'views_no_favs': return <Heart className="w-4 h-4" />;
      case 'favs_no_sales': return <ShoppingCart className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Sales Analyzer</h2>
        <p className="text-gray-500 text-sm mt-1">Diagnose why your listings aren't selling and get actionable fixes</p>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-500" />
          Your Shop's Conversion Funnel (Last 30 Days)
        </h3>
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
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          <strong>Insight:</strong> Your view-to-favorite rate (9%) is good, but favorite-to-purchase rate (11%) is below the 15-20% benchmark. This suggests pricing or trust issues are blocking final purchases.
        </div>
      </div>

      {/* Problem Listings */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Listings Needing Attention ({analyses.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyses.map(analysis => (
            <div
              key={analysis.id}
              onClick={() => setSelectedAnalysis(analysis)}
              className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
                selectedAnalysis?.id === analysis.id ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  analysis.priority === 'high' ? 'bg-red-100 text-red-700' :
                  analysis.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {getCategoryIcon(analysis.category)}
                  {getCategoryLabel(analysis.category)}
                </span>
                <span className="text-xs text-gray-400">{analysis.daysListed} days</span>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2 truncate">{analysis.title}</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-800">{analysis.views}</p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{analysis.favorites}</p>
                  <p className="text-xs text-gray-500">Favs</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{analysis.sales}</p>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
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
              <h3 className="text-lg font-bold text-gray-800">Deep Analysis: {selectedAnalysis.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedAnalysis.diagnosis}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedAnalysis.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {selectedAnalysis.priority === 'high' ? '🔴 High Priority' : '🟡 Medium Priority'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Factor Scores */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                Performance Factors
              </h4>
              <div className="space-y-3">
                {selectedAnalysis.factors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                      <span className={`text-sm font-bold ${
                        factor.score >= 70 ? 'text-green-600' :
                        factor.score >= 40 ? 'text-amber-600' : 'text-red-600'
                      }`}>{factor.score}/100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          factor.score >= 70 ? 'bg-green-500' :
                          factor.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{factor.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Action Plan (Fix in Order)
              </h4>
              <div className="space-y-3">
                {selectedAnalysis.fixes.map((fix, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{fix.action}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {fix.expectedImpact}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            fix.effort === 'low' ? 'bg-blue-100 text-blue-700' :
                            fix.effort === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {fix.effort} effort
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">Estimated Result</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Implementing all fixes could increase this listing's sales by 200-400% within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common Issues Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Why Listings Don't Sell - Quick Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IssueCard
            icon={<Search className="w-5 h-5 text-blue-500" />}
            title="Nobody Can Find It"
            description="Poor SEO means your listing never appears in search results. Fix: Use all 13 tags, write keyword-rich titles."
            stat="70% of Etsy sales come from search"
          />
          <IssueCard
            icon={<Eye className="w-5 h-5 text-purple-500" />}
            title="People See It But Don't Click"
            description="Your listing appears in search but the thumbnail doesn't stand out. Fix: Better first photo, competitive pricing."
            stat="First image determines 80% of clicks"
          />
          <IssueCard
            icon={<Heart className="w-5 h-5 text-pink-500" />}
            title="They Click But Don't Buy"
            description="Buyers view your listing but leave without purchasing. Fix: Better description, more photos, trust signals."
            stat="5+ photos increase sales by 40%"
          />
          <IssueCard
            icon={<DollarSign className="w-5 h-5 text-green-500" />}
            title="Price Is Wrong"
            description="Too high = no sales. Too low = perceived as cheap. Fix: Research competitors, find the sweet spot."
            stat="Optimal pricing increases revenue 25%"
          />
          <IssueCard
            icon={<Clock className="w-5 h-5 text-amber-500" />}
            title="Listing Is Stale"
            description="Old listings get less visibility over time. Fix: Renew listings, update photos, refresh tags seasonally."
            stat="Renewed listings get 2x more views"
          />
          <IssueCard
            icon={<Image className="w-5 h-5 text-orange-500" />}
            title="Poor Quality Photos"
            description="Dark, blurry, or unstyled photos make products look cheap. Fix: Natural lighting, lifestyle shots, clean backgrounds."
            stat="Professional photos boost sales 60%"
          />
        </div>
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
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
      </div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-orange-600 font-medium">{stat}</p>
    </div>
  );
}
