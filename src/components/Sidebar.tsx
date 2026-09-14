import React, { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  List,
  TrendingDown,
  PlusCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'niche-finder', label: 'Niche Finder', icon: Search },
  { id: 'listing-optimizer', label: 'Listing Optimizer', icon: List },
  { id: 'sales-analyzer', label: 'Sales Analyzer', icon: TrendingDown },
  { id: 'new-listing', label: 'Create Listing', icon: PlusCircle },
  { id: 'settings', label: 'API Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col transition-all duration-300 relative`}>
      <div className="p-4 flex items-center gap-3 border-b border-gray-700/50">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">Stylinsoul</h1>
            <p className="text-orange-400 text-xs font-medium">Metal Art Tools</p>
          </div>
        )}
      </div>

      {/* Shop Stats Mini */}
      {!collapsed && (
        <div className="mx-3 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Sales</span>
            <span className="text-white font-bold">903</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-400">Rating</span>
            <span className="text-yellow-400 font-bold">★ 4.9</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-400">Listings</span>
            <span className="text-white font-bold">111</span>
          </div>
        </div>
      )}

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? 'bg-orange-600/20 text-orange-400 border-r-4 border-orange-500'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-orange-400' : ''}`} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-3 mx-3 mb-3 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg border border-orange-500/20">
          <p className="text-xs text-orange-300 font-medium">💡 Pro Tip</p>
          <p className="text-xs text-gray-400 mt-1">You have 8+ Corgi listings competing with each other. Consider consolidating!</p>
        </div>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );
}
