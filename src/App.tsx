import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NicheFinder from './components/NicheFinder';
import ListingOptimizer from './components/ListingOptimizer';
import SalesAnalyzer from './components/SalesAnalyzer';
import NewListing from './components/NewListing';
import ApiSettings from './components/ApiSettings';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Bell, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <ErrorBoundary><Dashboard /></ErrorBoundary>;
      case 'niche-finder': return <ErrorBoundary><NicheFinder /></ErrorBoundary>;
      case 'listing-optimizer': return <ErrorBoundary><ListingOptimizer /></ErrorBoundary>;
      case 'sales-analyzer': return <ErrorBoundary><SalesAnalyzer /></ErrorBoundary>;
      case 'new-listing': return <ErrorBoundary><NewListing /></ErrorBoundary>;
      case 'settings': return <ErrorBoundary><ApiSettings /></ErrorBoundary>;
      default: return <ErrorBoundary><Dashboard /></ErrorBoundary>;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'niche-finder': return 'Niche Finder';
      case 'listing-optimizer': return 'Listing Optimizer';
      case 'sales-analyzer': return 'Sales Analyzer';
      case 'new-listing': return 'Create Listing';
      case 'settings': return 'API Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{getPageTitle()}</h1>
            <p className="text-xs text-gray-400">StylinsoulMetalArt · Custom Metal Signs</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://stylinsoulmetalart.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-orange-600 text-sm font-medium hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Shop
            </a>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">Appu</p>
                <p className="text-xs text-gray-400">903 Sales · 4.9★</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
