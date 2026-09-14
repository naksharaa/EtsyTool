import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NicheFinder from './components/NicheFinder';
import ListingOptimizer from './components/ListingOptimizer';
import SalesAnalyzer from './components/SalesAnalyzer';
import NewListing from './components/NewListing';
import ApiSettings from './components/ApiSettings';
import { Bell, User } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'niche-finder':
        return <NicheFinder />;
      case 'listing-optimizer':
        return <ListingOptimizer />;
      case 'sales-analyzer':
        return <SalesAnalyzer />;
      case 'new-listing':
        return <NewListing />;
      case 'settings':
        return <ApiSettings />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'niche-finder': return 'Niche Finder';
      case 'listing-optimizer': return 'Listing Optimizer';
      case 'sales-analyzer': return 'Sales Analyzer';
      case 'new-listing': return 'Create Listing';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{getPageTitle()}</h1>
            <p className="text-xs text-gray-400">Etsy Pro Tools · Seller Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">My Shop</p>
                <p className="text-xs text-gray-400">Seller</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
