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
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-orange-600 to-orange-800 min-h-screen flex flex-col transition-all duration-300 relative`}>
      <div className="p-4 flex items-center gap-3 border-b border-orange-500/30">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-6 h-6 text-orange-600" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Etsy Pro</h1>
            <p className="text-orange-200 text-xs">Seller Tools</p>
          </div>
        )}
      </div>

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
                  ? 'bg-white/20 text-white border-r-4 border-white'
                  : 'text-orange-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-orange-700 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );
}
