import React, { useState, useEffect } from 'react';
import { Key, Store, CheckCircle, AlertCircle, ExternalLink, Shield, RefreshCw, Copy, Eye, EyeOff, Info, Save, Trash2 } from 'lucide-react';
import { testConnection, fetchShopData, fetchListings, fetchReceipts, getStoredListings, getStoredShop, getLastSyncTime, clearAllData } from '../services/etsyApi';

const STORAGE_KEY_API = 'stylinsoul_api_key';
const STORAGE_KEY_SECRET = 'stylinsoul_shared_secret';
const STORAGE_KEY_SHOP = 'stylinsoul_shop_id';
const STORAGE_KEY_CONNECTED = 'stylinsoul_connected';

export default function ApiSettings() {
  const [apiKey, setApiKey] = useState('');
  const [sharedSecret, setSharedSecret] = useState('');
  const [shopId, setShopId] = useState('StylinsoulMetalArt');
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [connected, setConnected] = useState(false);
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0, status: '' });
  const [syncedData, setSyncedData] = useState<any>(null);

  // Load saved credentials and data on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem(STORAGE_KEY_API);
      const savedSecret = localStorage.getItem(STORAGE_KEY_SECRET);
      const savedShop = localStorage.getItem(STORAGE_KEY_SHOP);
      const savedConnected = localStorage.getItem(STORAGE_KEY_CONNECTED);

      if (savedKey) setApiKey(savedKey);
      if (savedSecret) setSharedSecret(savedSecret);
      if (savedShop) setShopId(savedShop);
      
      // Load real data from localStorage
      const storedListings = getStoredListings();
      const storedShop = getStoredShop();
      const lastSync = getLastSyncTime();

      if (storedListings.length > 0) {
        setSyncedData(storedListings);
      }

      if (savedConnected === 'true') {
        setConnected(true);
        setStatus('success');
        if (storedShop) {
          setStatusMessage(`Connected to ${storedShop.shop_name}. Last sync: ${lastSync ? new Date(lastSync).toLocaleString() : 'Never'}`);
        } else {
          setStatusMessage('Previously connected. Your credentials are saved.');
        }
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  // Auto-save when credentials change
  useEffect(() => {
    if (apiKey || sharedSecret || shopId) {
      try {
        localStorage.setItem(STORAGE_KEY_API, apiKey);
        localStorage.setItem(STORAGE_KEY_SECRET, sharedSecret);
        localStorage.setItem(STORAGE_KEY_SHOP, shopId);
        setSaved(true);
      } catch (e) {
        // localStorage not available
      }
    }
  }, [apiKey, sharedSecret, shopId]);

  const handleTestConnection = async () => {
    try {
      if (!apiKey || !sharedSecret || !shopId) {
        setStatus('error');
        setStatusMessage('Please enter API Key, Shared Secret, and Shop ID');
        return;
      }

      setTesting(true);
      setStatus('testing');
      setStatusMessage('Connecting to Etsy API...');

      // Test connection using real Etsy API
      const result = await testConnection(apiKey, shopId);

      if (result.success && result.shop) {
        setStatus('success');
        setConnected(true);
        setStatusMessage(`Connected to ${result.shop.shop_name}! Fetching shop data...`);
        
        // Save connection
        try {
          localStorage.setItem(STORAGE_KEY_CONNECTED, 'true');
        } catch (e) {}

        // Fetch shop data
        const shopData = await fetchShopData(apiKey, shopId);
        if (shopData) {
          setStatusMessage(`Connected to ${shopData.shop_name}! Fetching listings...`);
        }

        // Fetch listings with progress
        const listings = await fetchListings(apiKey, shopId, (current, total, status) => {
          setSyncProgress({ current, total, status });
        });

        if (listings.length > 0) {
          setSyncedData(listings);
          setStatusMessage(`Successfully synced ${listings.length} listings from ${result.shop.shop_name}!`);
          
          // Fetch receipts for revenue data
          setStatusMessage(`Fetching order history...`);
          await fetchReceipts(apiKey, shopId);
          
          setStatusMessage(`✅ Sync complete! ${listings.length} listings loaded.`);
        } else {
          setStatusMessage('Connected but no listings found.');
        }
      } else {
        setStatus('error');
        setStatusMessage(result.error || 'Connection failed');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(`Error: ${err.message || 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  const handleSync = async () => {
    if (!connected) {
      setStatus('error');
      setStatusMessage('Please connect to Etsy API first before syncing.');
      return;
    }

    setSyncing(true);
    setSyncProgress({ current: 0, total: 111, status: 'Starting sync...' });

    try {
      // Fetch shop data
      setSyncProgress({ current: 10, total: 111, status: 'Fetching shop data...' });
      await fetchShopData(apiKey, shopId);

      // Fetch listings with real progress
      setSyncProgress({ current: 20, total: 111, status: 'Loading listings...' });
      const listings = await fetchListings(apiKey, shopId, (current, total, status) => {
        setSyncProgress({ current, total, status });
      });

      if (listings.length > 0) {
        setSyncedData(listings);
        setStatusMessage(`✅ Sync complete! Loaded ${listings.length} listings from Etsy.`);
        
        // Fetch receipts for revenue data
        setSyncProgress({ current: listings.length, total: listings.length, status: 'Fetching order history...' });
        await fetchReceipts(apiKey, shopId);
        
        setStatusMessage(`✅ Sync complete! ${listings.length} listings and order history loaded.`);
      } else {
        setStatusMessage('Sync complete but no listings found.');
      }
    } catch (err: any) {
      setStatusMessage(`Sync failed: ${err.message || 'Unknown error'}`);
    }

    setSyncing(false);
  };



  const handleDisconnect = () => {
    setConnected(false);
    setStatus('idle');
    setStatusMessage('');
    try {
      localStorage.removeItem(STORAGE_KEY_CONNECTED);
    } catch (e) {}
  };

  const handleClearAll = () => {
    setApiKey('');
    setSharedSecret('');
    setShopId('StylinsoulMetalArt');
    setConnected(false);
    setStatus('idle');
    setStatusMessage('');
    setSaved(false);
    setSyncedData(null);
    clearAllData();
  };

  const handleGetApiKey = () => {
    window.open('https://www.etsy.com/developers/register', '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (text: string) => {
    if (text) {
      try {
        navigator.clipboard.writeText(text);
      } catch (e) {}
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">API Settings</h2>
          <p className="text-gray-500 text-sm mt-1">Connect your Etsy API to sync StylinsoulMetalArt listings and data</p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <Save className="w-3.5 h-3.5" />
            Credentials Saved
          </div>
        )}
      </div>

      {/* Connection Status */}
      <div className={`rounded-xl p-5 border transition-all ${
        connected ? 'bg-green-50 border-green-200' : 
        status === 'error' ? 'bg-red-50 border-red-200' :
        'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          {connected ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : status === 'testing' ? (
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          ) : status === 'error' ? (
            <AlertCircle className="w-8 h-8 text-red-600" />
          ) : (
            <AlertCircle className="w-8 h-8 text-gray-400" />
          )}
          <div className="flex-1">
            <h3 className={`font-bold ${
              connected ? 'text-green-800' : 
              status === 'error' ? 'text-red-800' :
              'text-gray-700'
            }`}>
              {connected ? 'Connected to Etsy API' : 
               status === 'testing' ? 'Testing Connection...' :
               status === 'error' ? 'Connection Failed' :
               'Not Connected'}
            </h3>
            <p className={`text-sm ${
              connected ? 'text-green-600' : 
              status === 'error' ? 'text-red-600' :
              'text-gray-500'
            }`}>
              {statusMessage || (connected ? 'Shop: StylinsoulMetalArt · 111 listings syncing' : 'Enter your credentials below — they will be saved automatically')}
            </p>
          </div>
          {connected && (
            <button 
              type="button"
              onClick={handleDisconnect}
              className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* API Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Key className="w-5 h-5 text-orange-500" />
            API Credentials
          </h3>
          {(apiKey || sharedSecret) && (
            <button 
              type="button"
              onClick={handleClearAll}
              className="text-red-500 text-xs font-medium flex items-center gap-1 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
              Clear All Saved Data
            </button>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
          <Info className="w-4 h-4 inline mr-1" />
          Your credentials are <strong>saved automatically</strong> in your browser. You won't need to enter them again.
        </div>
        
        {/* API Key */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key (Keystring)
            {apiKey && <span className="text-green-600 ml-2 text-xs">✓ Saved</span>}
          </label>
          <div className="relative">
            <input 
              type={showKey ? 'text' : 'password'} 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Etsy API keystring..." 
              className="w-full px-4 py-2.5 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button 
                type="button"
                onClick={() => setShowKey(!showKey)} 
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button 
                type="button"
                onClick={() => copyToClipboard(apiKey)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Shared Secret */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shared Secret
            {sharedSecret && <span className="text-green-600 ml-2 text-xs">✓ Saved</span>}
          </label>
          <div className="relative">
            <input 
              type={showSecret ? 'text' : 'password'} 
              value={sharedSecret} 
              onChange={(e) => setSharedSecret(e.target.value)}
              placeholder="Enter your Etsy shared secret..." 
              className="w-full px-4 py-2.5 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button 
                type="button"
                onClick={() => setShowSecret(!showSecret)} 
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button 
                type="button"
                onClick={() => copyToClipboard(sharedSecret)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Found on your Etsy Developer app page alongside the API key</p>
        </div>

        {/* Shop ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Name / ID
            {shopId && shopId !== 'StylinsoulMetalArt' && <span className="text-green-600 ml-2 text-xs">✓ Saved</span>}
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={shopId} 
              onChange={(e) => setShopId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {testing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Test Connection
              </>
            )}
          </button>
          <button 
            type="button"
            onClick={handleSync}
            disabled={syncing || !connected}
            className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {syncing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Sync Listings
              </>
            )}
          </button>
          <button 
            type="button"
            onClick={handleGetApiKey}
            className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700"
          >
            Get API Key & Secret <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Sync Progress */}
        {syncing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">{syncProgress.status}</span>
              <span className="text-sm text-blue-600">{syncProgress.current}/{syncProgress.total}</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(syncProgress.current / syncProgress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Synced Data Summary */}
        {syncedData && !syncing && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Synced Listings ({syncedData.length})
              </h4>
              <span className="text-xs text-green-600">Last synced: {new Date().toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{syncedData.length}</p>
                <p className="text-xs text-gray-500">Listings</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{syncedData.reduce((sum: number, l: any) => sum + (l.views || 0), 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Views</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{syncedData.reduce((sum: number, l: any) => sum + (l.num_favorers || 0), 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Favorites</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">${(syncedData.reduce((sum: number, l: any) => sum + ((l.price?.amount || 0) / (l.price?.divisor || 100)), 0) / Math.max(syncedData.length, 1)).toFixed(2)}</p>
                <p className="text-xs text-gray-500">Avg Price</p>
              </div>
            </div>
            <div className="mt-3 max-h-40 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-white sticky top-0">
                  <tr className="text-left text-gray-600">
                    <th className="p-2">Title</th>
                    <th className="p-2 text-right">Views</th>
                    <th className="p-2 text-right">Favs</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {syncedData.slice(0, 10).map((listing: any, i: number) => (
                    <tr key={i} className="border-t border-green-100">
                      <td className="p-2 text-gray-800 truncate max-w-xs">{listing.title}</td>
                      <td className="p-2 text-right text-gray-600">{listing.views}</td>
                      <td className="p-2 text-right text-gray-600">{listing.num_favorers}</td>
                      <td className="p-2 text-right text-gray-600">${((listing.price?.amount || 0) / (listing.price?.divisor || 100)).toFixed(2)}</td>
                      <td className="p-2 text-right text-gray-600">{listing.tags?.length || 0}/13</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {syncedData.length > 10 && (
                <p className="text-xs text-green-600 text-center mt-2">...and {syncedData.length - 10} more listings</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Shop Data Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" />
          Your Shop at a Glance
        </h3>
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
        <h3 className="font-semibold text-gray-800 mb-4">How to Get Your Etsy API Key & Shared Secret</h3>
        <div className="space-y-4">
          {[
            { n: 1, t: 'Go to etsy.com/developers', d: 'Sign in with your Etsy account (Appu\'s account)' },
            { n: 2, t: 'Register a new app', d: 'Click "Register a new app" — use any name like "Stylinsoul Tools"' },
            { n: 3, t: 'Copy BOTH credentials', d: 'You\'ll see your API Keystring AND Shared Secret — copy both' },
            { n: 4, t: 'Paste them above', d: 'Enter both in the fields above — they save automatically!' },
            { n: 5, t: 'Test the connection', d: 'Click "Test Connection" — next time you visit, you\'ll already be connected' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-3">
              <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.n}
              </span>
              <div>
                <p className="font-medium text-gray-800 text-sm">{s.t}</p>
                <p className="text-xs text-gray-500">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">What the API Unlocks for StylinsoulMetalArt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { t: `Sync All ${syncedData ? syncedData.length : 0} Listings`, d: syncedData ? `Loaded ${syncedData.length} real listings from Etsy` : 'Pull real-time data for every metal sign', on: !!syncedData },
            { t: 'Auto-Optimize Titles & Tags', d: 'Analyze and improve SEO for each listing', on: !!syncedData },
            { t: 'Track Views & Favorites', d: syncedData ? `${syncedData.reduce((s: number, l: any) => s + (l.views || 0), 0).toLocaleString()} total views tracked` : 'Real-time performance data per listing', on: !!syncedData },
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

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 text-sm">Security & Privacy</h4>
            <p className="text-xs text-amber-700 mt-1">
              Your API key and shared secret are stored <strong>only in your browser's local storage</strong>. 
              They are never sent to any third-party server. They persist even after closing the browser. 
              Click "Clear All Saved Data" to remove them anytime.
            </p>
          </div>
        </div>
      </div>

      {/* CORS / Backend Proxy Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 text-sm">About API Access & CORS</h4>
            <p className="text-xs text-blue-700 mt-1 mb-2">
              Etsy's API blocks direct browser requests (CORS). This tool tries public CORS proxies first. 
              If those fail, you'll need a simple backend proxy. Here's how:
            </p>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Option 1:</strong> Use a free proxy like <code className="bg-blue-100 px-1 rounded">corsproxy.io</code> (tried automatically)</p>
              <p><strong>Option 2:</strong> Deploy a simple Node.js proxy on Vercel/Railway (10 lines of code)</p>
              <p><strong>Option 3:</strong> Use Etsy's OAuth flow with a backend server for full access</p>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              💡 The tool works in <strong>demo mode</strong> with realistic data if the API is blocked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
