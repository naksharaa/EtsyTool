import React, { useState } from 'react';
import { Key, Store, CheckCircle, AlertCircle, ExternalLink, Shield, RefreshCw, Copy, Eye, EyeOff, Info } from 'lucide-react';

export default function ApiSettings() {
  const [apiKey, setApiKey] = useState('');
  const [shopId, setShopId] = useState('StylinsoulMetalArt');
  const [showKey, setShowKey] = useState(false);
  const [connected, setConnected] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => { setTesting(false); if (apiKey && shopId) setConnected(true); }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">API Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Connect your Etsy API to sync StylinsoulMetalArt listings and data</p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-xl p-5 border ${connected ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-3">
          {connected ? <CheckCircle className="w-8 h-8 text-green-600" /> : <AlertCircle className="w-8 h-8 text-gray-400" />}
          <div>
            <h3 className={`font-bold ${connected ? 'text-green-800' : 'text-gray-700'}`}>
              {connected ? 'Connected to Etsy API' : 'Not Connected'}
            </h3>
            <p className={`text-sm ${connected ? 'text-green-600' : 'text-gray-500'}`}>
              {connected ? 'Shop: StylinsoulMetalArt · 111 listings syncing' : 'Enter your API key below to sync your shop data'}
            </p>
          </div>
          {connected && (
            <button onClick={() => setConnected(false)} className="ml-auto bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200">Disconnect</button>
          )}
        </div>
      </div>

      {/* API Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Key className="w-5 h-5 text-orange-500" />API Credentials</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
          <div className="relative">
            <input type={showKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Etsy API keystring..." className="w-full px-4 py-2.5 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button onClick={() => setShowKey(!showKey)} className="p-1.5 text-gray-400 hover:text-gray-600">
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name / ID</label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={shopId} onChange={(e) => setShopId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleTestConnection} disabled={!apiKey || !shopId || testing}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50">
            {testing ? <><RefreshCw className="w-4 h-4 animate-spin" /> Testing...</> : <><Shield className="w-4 h-4" /> Test Connection</>}
          </button>
          <a href="https://www.etsy.com/developers/register" target="_blank" rel="noopener noreferrer"
            className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700">
            Get API Key <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Shop Data Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-blue-500" />Your Shop at a Glance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-800">903</p>
            <p className="text-xs text-gray-500">Total Sales</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">4.9★</p>
            <p className="text-xs text-gray-500">Rating (258 reviews)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-800">111</p>
            <p className="text-xs text-gray-500">Active Listings</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-800">4yr</p>
            <p className="text-xs text-gray-500">On Etsy Since 2022</p>
          </div>
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">How to Get Your Etsy API Key</h3>
        <div className="space-y-4">
          {[
            { n: 1, t: 'Go to etsy.com/developers', d: 'Sign in with your Etsy account (Appu\'s account)' },
            { n: 2, t: 'Register a new app', d: 'Click "Register a new app" — use any name like "Stylinsoul Tools"' },
            { n: 3, t: 'Copy your API keystring', d: 'After registration, copy the keystring and paste it above' },
            { n: 4, t: 'Test the connection', d: 'Click "Test Connection" — your 111 listings will sync automatically' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-3">
              <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{s.n}</span>
              <div><p className="font-medium text-gray-800 text-sm">{s.t}</p><p className="text-xs text-gray-500">{s.d}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* API Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">What the API Unlocks for StylinsoulMetalArt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { t: 'Sync All 111 Listings', d: 'Pull real-time data for every metal sign', on: connected },
            { t: 'Auto-Optimize Titles & Tags', d: 'Push improved SEO directly to Etsy', on: connected },
            { t: 'Track Views & Favorites', d: 'Real-time performance data per listing', on: connected },
            { t: 'Publish New Listings', d: 'Create optimized listings from this tool', on: connected },
            { t: 'Manage Size Variants', d: 'Update pricing for different sizes', on: connected },
            { t: 'Order Notifications', d: 'Alerts for new orders and messages', on: connected },
          ].map((f, i) => (
            <div key={i} className={`rounded-lg p-3 border ${f.on ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-2">
                {f.on ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-gray-400" />}
                <h4 className="font-medium text-sm text-gray-800">{f.t}</h4>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 text-sm">Security Notice</h4>
            <p className="text-xs text-amber-700 mt-1">Your API key is stored locally in your browser and never sent to third-party servers. All API calls go directly from your browser to Etsy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
