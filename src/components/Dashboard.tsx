import React from 'react';
import {
  Eye,
  Heart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 12, revenue: 456 },
  { month: 'Feb', sales: 19, revenue: 723 },
  { month: 'Mar', sales: 15, revenue: 580 },
  { month: 'Apr', sales: 25, revenue: 945 },
  { month: 'May', sales: 22, revenue: 834 },
  { month: 'Jun', sales: 30, revenue: 1120 },
];

const viewsData = [
  { day: 'Mon', views: 145 },
  { day: 'Tue', views: 232 },
  { day: 'Wed', views: 198 },
  { day: 'Thu', views: 287 },
  { day: 'Fri', views: 342 },
  { day: 'Sat', views: 421 },
  { day: 'Sun', views: 389 },
];

const categoryData = [
  { name: 'Jewelry', value: 35, color: '#f97316' },
  { name: 'Home Decor', value: 25, color: '#fb923c' },
  { name: 'Clothing', value: 20, color: '#fdba74' },
  { name: 'Crafts', value: 12, color: '#fed7aa' },
  { name: 'Other', value: 8, color: '#ffedd5' },
];

const topListings = [
  { title: 'Handmade Silver Ring', views: 1245, favorites: 89, sales: 12, score: 92 },
  { title: 'Boho Wall Art Print', views: 987, favorites: 67, sales: 8, score: 85 },
  { title: 'Custom Name Necklace', views: 856, favorites: 45, sales: 15, score: 78 },
  { title: 'Macrame Plant Hanger', views: 654, favorites: 34, sales: 6, score: 71 },
  { title: 'Personalized Mug', views: 432, favorites: 23, sales: 4, score: 65 },
];

const issues = [
  { listing: 'Vintage Book Cover', issue: 'Poor SEO tags', severity: 'high' },
  { listing: 'Crochet Pattern Set', issue: 'Low quality images', severity: 'high' },
  { listing: 'Wooden Sign', issue: 'Price too high', severity: 'medium' },
  { listing: 'Candle Holder', issue: 'Missing description', severity: 'medium' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Your shop performance at a glance</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Shop Active
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          label="Total Views"
          value="12,847"
          change="+18%"
          positive={true}
          color="blue"
        />
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          label="Favorites"
          value="1,234"
          change="+12%"
          positive={true}
          color="pink"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Revenue (30d)"
          value="$4,658"
          change="+24%"
          positive={true}
          color="green"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Active Listings"
          value="47"
          change="-2"
          positive={false}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="revenue" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Views Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Daily Views</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Line type="monotone" dataKey="views" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Listings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Top Performing Listings</h3>
          <div className="space-y-3">
            {topListings.map((listing, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{listing.title}</p>
                    <p className="text-xs text-gray-500">{listing.views} views · {listing.favorites} favs · {listing.sales} sales</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ScoreBadge score={listing.score} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues & Category Split */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Category Split</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2">
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
              Quick Issues
            </h3>
            <div className="space-y-2">
              {issues.map((issue, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    issue.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'
                  }`}></span>
                  <span className="text-gray-700 truncate">{issue.listing}</span>
                  <span className="text-gray-400 text-xs ml-auto">{issue.issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, positive, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  color: string;
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
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
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
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${color}`}>
      {score}
    </span>
  );
}
