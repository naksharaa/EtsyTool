import React, { useState } from 'react';
import {
  Search, TrendingUp, TrendingDown, Minus, Target, Sparkles, ArrowRight, Info
} from 'lucide-react';

interface NicheData {
  name: string;
  demand: number;
  competition: number;
  opportunity: number;
  trend: 'up' | 'down' | 'stable';
  avgPrice: string;
  monthlySearches: number;
  topKeywords: string[];
  youHave: boolean;
  recommendation: string;
}

const nicheData: NicheData[] = [
  {
    name: 'Pet Memorial Metal Signs',
    demand: 94, competition: 32, opportunity: 92, trend: 'up',
    avgPrice: '$40-75', monthlySearches: 28500,
    topKeywords: ['pet memorial sign', 'dog remembrance gift', 'cat memorial metal', 'rainbow bridge sign', 'pet loss gift'],
    youHave: true, recommendation: '✅ You have 1 listing. EXPAND — add cat, bird, horse specific memorials. This niche is BOOMING.'
  },
  {
    name: 'Man Cave / Garage Metal Signs',
    demand: 88, competition: 45, opportunity: 85, trend: 'up',
    avgPrice: '$35-90', monthlySearches: 35200,
    topKeywords: ['man cave sign', 'garage metal sign', 'dad cave decor', 'husband gift', 'shop sign custom'],
    youHave: true, recommendation: '✅ You have 1 listing. Add: "Dad\'s Garage", "Man Cave Rules", tool-themed, beer/gaming themes.'
  },
  {
    name: 'Nurse & Healthcare Worker Gifts',
    demand: 91, competition: 38, opportunity: 87, trend: 'up',
    avgPrice: '$35-65', monthlySearches: 42100,
    topKeywords: ['nurse gift', 'nursing graduation', 'rn metal sign', 'doctor gift custom', 'healthcare worker gift'],
    youHave: true, recommendation: '✅ You have 1 listing. EXPAND to: doctor, dentist, vet tech, pharmacist, EMT, teacher themes.'
  },
  {
    name: 'Lake House / Cabin Decor',
    demand: 85, competition: 40, opportunity: 83, trend: 'up',
    avgPrice: '$40-85', monthlySearches: 22800,
    topKeywords: ['lake house sign', 'cabin decor metal', 'lake life sign', 'waterfront decor', 'camp name sign'],
    youHave: true, recommendation: '✅ You have fishing/camping. Add: lake family name, dock sign, pontoon boat, lighthouse themes.'
  },
  {
    name: 'Wedding & Engagement Metal Signs',
    demand: 90, competition: 55, opportunity: 78, trend: 'stable',
    avgPrice: '$45-120', monthlySearches: 51000,
    topKeywords: ['wedding sign metal', 'engagement gift', 'bride to be sign', 'mr mrs sign', 'wedding date sign'],
    youHave: false, recommendation: '🔥 NEW OPPORTUNITY — You have anniversary but NO wedding/engagement signs. Huge market!'
  },
  {
    name: 'Farm & Ranch Metal Signs',
    demand: 82, competition: 42, opportunity: 80, trend: 'up',
    avgPrice: '$40-95', monthlySearches: 19400,
    topKeywords: ['farm sign custom', 'ranch name sign', 'farmhouse metal decor', 'barn sign', 'agricultural sign'],
    youHave: true, recommendation: '✅ You have horse signs. Add: cow, chicken, tractor, crop-specific, farm family name signs.'
  },
  {
    name: 'House Number & Address Signs',
    demand: 92, competition: 60, opportunity: 72, trend: 'stable',
    avgPrice: '$50-150', monthlySearches: 38700,
    topKeywords: ['house number sign', 'address plaque metal', 'custom house numbers', 'modern address sign', 'door number metal'],
    youHave: false, recommendation: '🔥 HIGH DEMAND — You don\'t have this! Personalized address signs sell $50-150. Great margin.'
  },
  {
    name: 'Teacher & School Gifts',
    demand: 86, competition: 35, opportunity: 84, trend: 'up',
    avgPrice: '$30-55', monthlySearches: 31200,
    topKeywords: ['teacher gift metal', 'end of year teacher', 'principal gift', 'school sign custom', 'classroom decor'],
    youHave: false, recommendation: '🔥 SEASONAL GOLD — Teacher appreciation week (May) + end of year = massive sales spike.'
  },
  {
    name: 'Military & Veteran Gifts',
    demand: 84, competition: 40, opportunity: 81, trend: 'stable',
    avgPrice: '$40-80', monthlySearches: 26500,
    topKeywords: ['military gift', 'veteran sign', 'army retirement', 'navy metal sign', 'veteran wall art'],
    youHave: true, recommendation: '✅ You have firefighter. Add: Army, Navy, Marines, Air Force, Coast Guard branch-specific signs.'
  },
  {
    name: 'Restaurant & Business Logo Signs',
    demand: 87, competition: 48, opportunity: 79, trend: 'up',
    avgPrice: '$60-200', monthlySearches: 24300,
    topKeywords: ['business logo sign', 'restaurant metal sign', 'custom shop sign', 'business name metal', 'commercial sign'],
    youHave: true, recommendation: '✅ You have barber/bakery/groomer. Add: coffee shop, brewery, tattoo parlor, auto shop, salon.'
  },
  {
    name: 'Sports Fan Cave Signs',
    demand: 79, competition: 44, opportunity: 73, trend: 'stable',
    avgPrice: '$35-75', monthlySearches: 18900,
    topKeywords: ['football sign', 'basketball man cave', 'baseball decor', 'sports fan gift', 'game room sign'],
    youHave: false, recommendation: '🔥 GROWING NICHE — Generic sports themes (no licensed logos) = safe & profitable.'
  },
  {
    name: 'Family Name & Welcome Signs',
    demand: 93, competition: 70, opportunity: 62, trend: 'stable',
    avgPrice: '$35-70', monthlySearches: 55200,
    topKeywords: ['family name sign', 'welcome sign metal', 'est year sign', 'our family sign', 'last name decor'],
    youHave: true, recommendation: '⚠️ HIGHLY COMPETITIVE — You have some but it\'s crowded. Differentiate with unique designs.'
  },
];

export default function NicheFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'opportunity' | 'demand' | 'competition'>('opportunity');
  const [trendFilter, setTrendFilter] = useState<'all' | 'up' | 'stable' | 'down'>('all');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState<NicheData | null>(null);

  const filteredNiches = nicheData
    .filter(niche => niche.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(niche => trendFilter === 'all' || niche.trend === trendFilter)
    .filter(niche => !showOnlyNew || !niche.youHave)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const newOpportunities = nicheData.filter(n => !n.youHave);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Niche Finder for Metal Signs</h2>
        <p className="text-gray-500 text-sm mt-1">Discover profitable metal sign niches tailored for StylinsoulMetalArt</p>
      </div>

      {/* New Opportunities Alert */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h3 className="font-bold text-lg">{newOpportunities.length} Niches You're NOT Selling In Yet!</h3>
        </div>
        <p className="text-orange-100 text-sm mb-3">
          These high-demand niches have low competition and you don't have any listings yet. Each could add $500-2000/month.
        </p>
        <div className="flex flex-wrap gap-2">
          {newOpportunities.map((n, i) => (
            <button
              key={i}
              onClick={() => { setSelectedNiche(n); }}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition-colors"
            >
              {n.name} ({n.opportunity}/100)
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search metal sign niches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="opportunity">Sort: Opportunity</option>
              <option value="demand">Sort: Demand</option>
              <option value="competition">Sort: Competition</option>
            </select>
            <select
              value={trendFilter}
              onChange={(e) => setTrendFilter(e.target.value as any)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="all">All Trends</option>
              <option value="up">🔥 Trending Up</option>
              <option value="stable">→ Stable</option>
              <option value="down">↓ Declining</option>
            </select>
            <button
              onClick={() => setShowOnlyNew(!showOnlyNew)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${showOnlyNew ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {showOnlyNew ? '🔴 New Only' : 'Show All'}
            </button>
          </div>
        </div>
      </div>

      {/* Niche Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNiches.map((niche, i) => (
          <div
            key={i}
            onClick={() => setSelectedNiche(niche)}
            className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
              selectedNiche?.name === niche.name ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'
            } ${!niche.youHave ? 'border-l-4 border-l-red-400' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{niche.name}</h4>
                  <TrendIcon trend={niche.trend} />
                  {niche.youHave ? (
                    <span className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded">Have it</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded font-medium">New!</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{niche.monthlySearches.toLocaleString()} monthly searches</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{niche.opportunity}</div>
                <div className="text-xs text-gray-500">Opportunity</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <MetricBar label="Demand" value={niche.demand} color="green" />
              <MetricBar label="Competition" value={niche.competition} color="red" />
              <MetricBar label="Opportunity" value={niche.opportunity} color="orange" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg: {niche.avgPrice}</span>
              <button className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700">
                Details <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Niche Detail */}
      {selectedNiche && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">{selectedNiche.name} — Strategy for Your Shop</h3>
            <button onClick={() => setSelectedNiche(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                Top Keywords to Target
              </h4>
              <div className="space-y-2">
                {selectedNiche.topKeywords.map((kw, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="text-sm text-gray-700">{kw}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Your Action Plan
              </h4>
              <div className="space-y-3">
                <div className={`border rounded-lg px-3 py-2 text-sm ${selectedNiche.youHave ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  {selectedNiche.recommendation}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-800">
                  💰 Price range {selectedNiche.avgPrice} — your current $35.74 fits the lower end. Consider offering premium sizes at $60-90.
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 text-sm text-purple-800">
                  🏷️ Use all 13 tags with these keywords + "personalized metal sign", "custom wall art", "laser cut decor"
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm text-amber-800">
                  📸 Show the sign in a REAL room setting — your photos should show scale and lifestyle context
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = { green: 'bg-green-500', red: 'bg-red-500', orange: 'bg-orange-500' };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClasses[color]} transition-all duration-500`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
