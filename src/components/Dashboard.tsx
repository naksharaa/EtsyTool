import React from 'react';
import {
  Eye, Heart, DollarSign, Package, ArrowUpRight, ArrowDownRight,
  AlertTriangle, Star, TrendingUp, Flame, Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const revenueData = [
  { month: 'Jul', sales: 52, revenue: 1859 },
  { month: 'Aug', sales: 68, revenue: 2434 },
  { month: 'Sep', sales: 95, revenue: 3399 },
  { month: 'Oct', sales: 120, revenue: 4290 },
  { month: 'Nov', sales: 145, revenue: 5192 },
  { month: 'Dec', sales: 168, revenue: 6016 },
];

const viewsData = [
  { day: 'Mon', views: 320 },
  { day: 'Tue', views: 412 },
  { day: 'Wed', views: 389 },
  { day: 'Thu', views: 467 },
  { day: 'Fri', views: 523 },
  { day: 'Sat', views: 612 },
  { day: 'Sun', views: 578 },
];

const categoryData = [
  { name: 'Anniversary Gifts', value: 34, color: '#f97316' },
  { name: 'Garden Metal Art', value: 15, color: '#22c55e' },
  { name: 'Halloween Signs', value: 10, color: '#8b5cf6' },
  { name: 'Dog Breed Signs', value: 18, color: '#3b82f6' },
  { name: 'Business Signs', value: 12, color: '#ef4444' },
  { name: 'Other (Hobby/Outdoors)', value: 22, color: '#eab308' },
];

const topListings = [
  { title: 'Personalized 50th Anniversary Metal Sign', views: 2845, favorites: 189, sales: 45, score: 88 },
  { title: 'Personalized Gym Metal Sign - Barbell Plate', views: 2234, favorites: 156, sales: 38, score: 85 },
  { title: 'Personalized Horse Metal Sign', views: 1876, favorites: 134, sales: 28, score: 82 },
  { title: 'Custom Metal Fishing Sign - Cabin Name', views: 1654, favorites: 98, sales: 22, score: 79 },
  { title: 'Personalized Metal Camping Sign', views: 1432, favorites: 87, sales: 18, score: 76 },
];

const criticalIssues = [
  { listing: '8+ Corgi listings', issue: 'Cannibalizing each other in search', severity: 'high' as const },
  { listing: 'All items at 35% off', issue: 'Devalues brand, no urgency', severity: 'high' as const },
  { listing: 'Ships from Turkey', issue: 'Customer confusion, listed as US', severity: 'medium' as const },
  { listing: 'Announcement outdated', issue: 'Last updated Jul 2022', severity: 'medium' as const },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, Appu! 👋</h2>
          <p className="text-gray-500 text-sm mt-1">StylinsoulMetalArt · 903 total sales · 4.9★ rating</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Shop Active
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Eye className="w-5 h-5" />} label="Views (30d)" value="21,450" change="+32%" positive={true} color="blue" />
        <StatCard icon={<Heart className="w-5 h-5" />} label="Favorites" value="1,847" change="+18%" positive={true} color="pink" />
        <StatCard icon={<DollarSign className="w-5 h-5" />} label="Revenue (30d)" value="$6,016" change="+42%" positive={true} color="green" />
        <StatCard icon={<Package className="w-5 h-5" />} label="Active Listings" value="111" change="+12" positive={true} color="purple" />
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Conversion Rate</p>
              <p className="text-xl font-bold text-gray-800">1.8%</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Good</span>
            </div>
          </div>
          <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Etsy avg: 1.5-3%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg Order Value</p>
              <p className="text-xl font-bold text-gray-800">$35.74</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Same price all items</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">💡 Offer size variants to increase AOV to $50+</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Review Rate</p>
              <p className="text-xl font-bold text-gray-800">28.6%</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Excellent</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">258 reviews from 903 sales · 4.9★ avg</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-1">Revenue Trend</h3>
          <p className="text-xs text-gray-400 mb-4">Last 6 months · Growing steadily 📈</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="#fed7aa" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-1">Daily Views</h3>
          <p className="text-xs text-gray-400 mb-4">This week · Peak on weekends</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="views" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Listings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">🏆 Top Performing Listings</h3>
          <div className="space-y-3">
            {topListings.map((listing, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{listing.title}</p>
                    <p className="text-xs text-gray-500">{listing.views} views · {listing.favorites} favs · {listing.sales} sales</p>
                  </div>
                </div>
                <ScoreBadge score={listing.score} />
              </div>
            ))}
          </div>
        </div>

        {/* Category + Issues */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Category Split</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {categoryData.map((cat, i) => (
                <span key={i} className="flex items-center gap-1 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  {cat.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Critical Issues
            </h3>
            <div className="space-y-2">
              {criticalIssues.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${issue.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                  <div>
                    <p className="text-gray-700 font-medium text-xs">{issue.listing}</p>
                    <p className="text-gray-400 text-xs">{issue.issue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="w-6 h-6" />
          <h3 className="font-bold text-lg">Quick Wins for This Week</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="font-medium text-sm">🎯 Consolidate Corgi Listings</p>
            <p className="text-xs text-orange-100 mt-1">Merge 8+ Corgi listings into 2-3 with size/color variants</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="font-medium text-sm">📅 Update Shop Announcement</p>
            <p className="text-xs text-orange-100 mt-1">Last updated Jul 2022 — add holiday promos & new designs</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="font-medium text-sm">💰 Test Higher Price Points</p>
            <p className="text-xs text-orange-100 mt-1">Not everything needs to be $35.74 — larger signs can sell for $80+</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, positive, color }: {
  icon: React.ReactNode; label: string; value: string; change: string; positive: boolean; color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>{icon}</div>
        <span className={`flex items-center gap-1 text-xs font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
  return <span className={`px-2 py-1 rounded-full text-xs font-bold ${color}`}>{score}</span>;
}
