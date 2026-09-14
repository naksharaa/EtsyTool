import React, { useState, useEffect } from 'react';
import { Key, Store, CheckCircle, AlertCircle, ExternalLink, Shield, RefreshCw, Copy, Eye, EyeOff, Info, Save, Trash2 } from 'lucide-react';

export default function ApiSettings() {
  const [apiKey, setApiKey] = useState('');
  const [sharedSecret, setSharedSecret] = useState('');
  const [shopId, setShopId] = useState('stylinsoulmetalart');
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [connected, setConnected] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [syncedCount, setSyncedCount] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);

  // Load saved data on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('etsy_api_key') || '';
    const savedSecret = localStorage.getItem('etsy_shared_secret') || '';
    const savedShop = localStorage.getItem('etsy_shop_id') || 'stylinsoulmetalart';
    const savedConnected = localStorage.getItem('etsy_connected') === 'true';
    const savedListings = localStorage.getItem('etsy_listings');

    setApiKey(savedKey);
    setSharedSecret(savedSecret);
    setShopId(savedShop);
    setConnected(savedConnected);

    if (savedConnected) {
      setStatus('success');
      setStatusMessage('Previously connected. Your credentials are saved.');
    }

    if (savedListings) {
      try {
        const listings = JSON.parse(savedListings);
        if (Array.isArray(listings)) {
          setSyncedCount(listings.length);
          setTotalViews(listings.reduce((sum: number, l: any) => sum + (l.views || 0), 0));
          setTotalFavorites(listings.reduce((sum: number, l: any) => sum + (l.num_favorers || 0), 0));
        }
      } catch (e) {
        console.error('Failed to parse listings');
      }
    }
  }, []);

  const handleTestConnection = () => {
    if (!apiKey || !sharedSecret || !shopId) {
      setStatus('error');
      setStatusMessage('Please enter API Key, Shared Secret, and Shop ID');
      return;
    }

    setTesting(true);
    setStatus('testing');
    setStatusMessage('Connecting to Etsy API...');

    const testUrl = `https://openapi.etsy.com/v3/application/shops/${shopId}`;
    
    fetch(testUrl, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid API key');
      } else if (response.status === 404) {
        throw new Error('Shop not found');
      }
      throw new Error(`Status ${response.status}`);
    })
    .then(data => {
      setStatus('success');
      setConnected(true);
      setStatusMessage(`Connected to ${data.shop_name || shopId}!`);
      localStorage.setItem('etsy_connected', 'true');
      localStorage.setItem('etsy_shop_data', JSON.stringify(data));
      setTesting(false);
    })
    .catch(() => {
      // Try CORS proxy
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(testUrl)}`;
      
      fetch(proxyUrl, {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Proxy failed');
      })
      .then(data => {
        setStatus('success');
        setConnected(true);
        setStatusMessage(`Connected to ${data.shop_name || shopId}! (via proxy)`);
        localStorage.setItem('etsy_connected', 'true');
        localStorage.setItem('etsy_shop_data', JSON.stringify(data));
      })
      .catch(() => {
        setStatus('error');
        setStatusMessage('Connection failed. Etsy API requires a backend proxy for browser access.');
      })
      .finally(() => {
        setTesting(false);
      });
    });
  };

  const handleSync = () => {
    if (!connected) {
      setStatus('error');
      setStatusMessage('Please connect first');
      return;
    }

    setSyncing(true);
    setStatusMessage('Syncing listings...');

    const listingsUrl = `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=250`;
    
    fetch(listingsUrl, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Failed to fetch');
    })
    .then(data => {
      const listings = data.results || [];
      localStorage.setItem('etsy_listings', JSON.stringify(listings));
      localStorage.setItem('etsy_last_sync', new Date().toISOString());
      
      setSyncedCount(listings.length);
      setTotalViews(listings.reduce((sum: number, l: any) => sum + (l.views || 0), 0));
      setTotalFavorites(listings.reduce((sum: number, l: any) => sum + (l.num_favorers || 0), 0));
      
      setStatusMessage(`Synced ${listings.length} listings!`);
      setSyncing(false);
    })
    .catch(() => {
      // Try proxy
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(listingsUrl)}`;
      
      fetch(proxyUrl, {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Proxy failed');
      })
      .then(data => {
        const listings = data.results || [];
        localStorage.setItem('etsy_listings', JSON.stringify(listings));
        localStorage.setItem('etsy_last_sync', new Date().toISOString());
        
        setSyncedCount(listings.length);
        setTotalViews(listings.reduce((sum: number, l: any) => sum + (l.views || 0), 0));
        setTotalFavorites(listings.reduce((sum: number, l: any) => sum + (l.num_favorers || 0), 0));
        
        setStatusMessage(`Synced ${listings.length} listings! (via proxy)`);
      })
      .catch(() => {
        setStatusMessage('Sync failed. Try using a backend proxy.');
      })
      .finally(() => {
        setSyncing(false);
      });
    });
  };

  const handleClearAll = () => {
    setApiKey('');
    setSharedSecret('');
    setShopId('stylinsoulmetalart');
    setConnected(false);
    setStatus('idle');
    setStatusMessage('');
    setSyncedCount(0);
    setTotalViews(0);
    setTotalFavorites(0);
    
    localStorage.removeItem('etsy_api_key');
    localStorage.removeItem('etsy_shared_secret');
    localStorage.removeItem('etsy_shop_id');
    localStorage.removeItem('etsy_connected');
    localStorage.removeItem('etsy_listings');
    localStorage.removeItem('etsy_shop_data');
    localStorage.removeItem('etsy_last_sync');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">API Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Connect your Etsy API to sync shop data</p>
      </div>

      {/* Status Banner */}
      <div className={`rounded-xl p-5 border ${
        status === 'success' ? 'bg-green-50 border-green-200' :
        status === 'error' ? 'bg-red-50 border-red-200' :
        'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          {status === 'success' && <CheckCircle className="w-8 h-8 text-green-600" />}
          {status === 'testing' && <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />}
          {status === 'error' && <AlertCircle className="w-8 h-8 text-red-600" />}
          {status === 'idle' && <AlertCircle className="w-8 h-8 text-gray-400" />}
          <div className="flex-1">
            <h3 className={`font-bold ${
              status === 'success' ? 'text-green-800' :
              status === 'error' ? 'text-red-800' :
              'text-gray-700'
            }`}>
              {status === 'success' ? 'Connected' :
               status === 'testing' ? 'Testing...' :
               status === 'error' ? 'Failed' :
               'Not Connected'}
            </h3>
            <p className={`text-sm ${
              status === 'success' ? 'text-green-600' :
              status === 'error' ? 'text-red-600' :
              'text-gray-500'
            }`}>
              {statusMessage || 'Enter credentials below'}
            </p>
          </div>
        </div>
      </div>

      {/* Credentials Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Key className="w-5 h-5 text-orange-500" />
          API Credentials
        </h3>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
          <Info className="w-4 h-4 inline mr-1" />
          Credentials are saved automatically in your browser.
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
                onClick={() => apiKey && navigator.clipboard.writeText(apiKey).catch(() => {})}
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
                onClick={() => sharedSecret && navigator.clipboard.writeText(sharedSecret).catch(() => {})}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Shop ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name / ID</label>
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

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50"
          >
            {testing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Testing...
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
            className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
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
            onClick={() => window.open('https://www.etsy.com/developers/register', '_blank', 'noopener,noreferrer')}
            className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700"
          >
            Get API Key <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Clear Button */}
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

        {/* Synced Data Summary */}
        {syncedCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5" />
              Synced: {syncedCount} listings
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{syncedCount}</p>
                <p className="text-xs text-gray-500">Listings</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{totalViews.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Views</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{totalFavorites.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Favorites</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 text-sm">About CORS</h4>
            <p className="text-xs text-blue-700 mt-1">
              Etsy's API blocks direct browser requests. This tool tries CORS proxies automatically.
              If that fails, you need a backend proxy server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
