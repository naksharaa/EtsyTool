import React, { useState } from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Flame,
  Sparkles,
  ArrowRight,
  Filter,
  Info
} from 'lucide-react';
import { NicheData } from '../types';

const nicheData: NicheData[] = [
  {
    name: 'Personalized Pet Portraits',
    demand: 92,
    competition: 45,
    opportunity: 88,
    trend: 'up',
    avgPrice: '$35-65',
    monthlySearches: 24500,
    topKeywords: ['pet portrait', 'custom dog art', 'cat painting', 'personalized pet gift']
  },
  {
    name: 'Minimalist Gold Jewelry',
    demand: 87,
    competition: 72,
    opportunity: 65,
    trend: 'up',
    avgPrice: '$25-80',
    monthlySearches: 45200,
    topKeywords: ['minimalist necklace', 'gold layered', 'dainty jewelry', 'simple gold ring']
  },
  {
    name: 'Eco-Friendly Home Decor',
    demand: 78,
    competition: 38,
    opportunity: 82,
    trend: 'up',
    avgPrice: '$20-55',
    monthlySearches: 18700,
    topKeywords: ['sustainable home', 'eco decor', 'natural materials', 'recycled art']
  },
  {
    name: 'Digital Planners & Templates',
    demand: 95,
    competition: 68,
    opportunity: 72,
    trend: 'up',
    avgPrice: '$8-25',
    monthlySearches: 67800,
    topKeywords: ['digital planner', 'goodnotes template', 'iPad planner', 'printable organizer']
  },
  {
    name: 'Macrame Wall Hangings',
    demand: 65,
    competition: 55,
    opportunity: 58,
    trend: 'stable',
    avgPrice: '$30-90',
    monthlySearches: 15400,
    topKeywords: ['macrame wall art', 'boho hanging', 'cotton macrame', 'large wall piece']
  },
  {
    name: 'Custom Wedding Signage',
    demand: 82,
    competition: 48,
    opportunity: 76,
    trend: 'up',
    avgPrice: '$45-150',
    monthlySearches: 32100,
    topKeywords: ['wedding sign', 'acrylic welcome', 'custom wedding decor', 'engagement party']
  },
  {
    name: 'Handmade Ceramic Mugs',
    demand: 74,
    competition: 82,
    opportunity: 42,
    trend: 'stable',
    avgPrice: '$22-45',
    monthlySearches: 28900,
    topKeywords: ['ceramic mug', 'handmade pottery', 'stoneware cup', 'artisan coffee mug']
  },
  {
    name: 'Nursery Wall Art',
    demand: 88,
    competition: 52,
    opportunity: 79,
    trend: 'up',
    avgPrice: '$15-40',
    monthlySearches: 41200,
    topKeywords: ['nursery print', 'baby room decor', 'kids wall art', 'animal print nursery']
  },
  {
    name: 'Resin Art & Coasters',
    demand: 71,
    competition: 42,
    opportunity: 74,
    trend: 'up',
    avgPrice: '$18-55',
    monthlySearches: 19800,
    topKeywords: ['resin coaster', 'ocean art', 'resin tray', 'dried flower resin']
  },
  {
    name: 'Vintage Style Clothing',
    demand: 68,
    competition: 75,
    opportunity: 38,
    trend: 'down',
    avgPrice: '$35-120',
    monthlySearches: 22400,
    topKeywords: ['vintage dress', 'retro blouse', '70s style', 'cottagecore outfit']
  }
];

export default function NicheFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'opportunity' | 'demand' | 'competition'>('opportunity');
  const [trendFilter, setTrendFilter] = useState<'all' | 'up' | 'stable' | 'down'>('all');
  const [selectedNiche, setSelectedNiche] = useState<NicheData | null>(null);

  const filteredNiches = nicheData
    .filter(niche => niche.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(niche => trendFilter === 'all' || niche.trend === trendFilter)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Niche Finder</h2>
        <p className="text-gray-500 text-sm mt-1">Discover profitable niches with high demand and low competition</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search niches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-3">
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
          </div>
        </div>
      </div>

      {/* Opportunity Score Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h3 className="font-bold text-lg">Top Opportunity Alert</h3>
        </div>
        <p className="text-orange-100 text-sm">
          <strong>Personalized Pet Portraits</strong> has the highest opportunity score (88/100) with 24,500 monthly searches and only moderate competition. Average selling price: $35-65.
        </p>
      </div>

      {/* Niche Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNiches.map((niche, i) => (
          <div
            key={i}
            onClick={() => setSelectedNiche(niche)}
            className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
              selectedNiche?.name === niche.name ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{niche.name}</h4>
                  <TrendIcon trend={niche.trend} />
                </div>
                <p className="text-xs text-gray-500">{niche.monthlySearches.toLocaleString()} monthly searches</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{niche.opportunity}</div>
                <div className="text-xs text-gray-500">Opportunity</div>
              </div>
            </div>

            {/* Metrics */}
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

      {/* Selected Niche Detail Panel */}
      {selectedNiche && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">{selectedNiche.name} - Deep Analysis</h3>
            <button
              onClick={() => setSelectedNiche(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
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
                    <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{kw}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Recommendations
              </h4>
              <div className="space-y-3">
                <Recommendation
                  type="success"
                  text={`High demand (${selectedNiche.demand}/100) - many buyers searching for this`}
                />
                <Recommendation
                  type={selectedNiche.competition > 60 ? 'warning' : 'success'}
                  text={selectedNiche.competition > 60
                    ? `High competition (${selectedNiche.competition}/100) - differentiate with unique designs`
                    : `Low competition (${selectedNiche.competition}/100) - great time to enter!`
                  }
                />
                <Recommendation
                  type="info"
                  text={`Price range ${selectedNiche.avgPrice} - position yourself in the middle for best conversion`}
                />
                <Recommendation
                  type={selectedNiche.trend === 'up' ? 'success' : 'warning'}
                  text={selectedNiche.trend === 'up'
                    ? 'Trending upward - get in early before market saturates'
                    : 'Stable/declining - focus on unique differentiation'
                  }
                />
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
  const colorClasses: Record<string, string> = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function Recommendation({ type, text }: { type: 'success' | 'warning' | 'info'; text: string }) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`border rounded-lg px-3 py-2 text-sm ${styles[type]}`}>
      {text}
    </div>
  );
}
