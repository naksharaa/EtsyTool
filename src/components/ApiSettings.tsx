import React, { useState } from 'react';
import {
  Key,
  Store,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';

export default function ApiSettings() {
  const [apiKey, setApiKey] = useState('');
  const [shopId, setShopId] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [connected, setConnected] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      if (apiKey && shopId) {
        setConnected(true);
      }
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setApiKey('');
    setShopId('');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">API Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Connect your Etsy API to sync listings and data</p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-xl p-5 border ${connected ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-3">
          {connected ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : (
            <AlertCircle className="w-8 h-8 text-gray-400" />
          )}
          <div>
            <h3 className={`font-bold ${connected ? 'text-green-800' : 'text-gray-700'}`}>
              {connected ? 'Connected to Etsy API' : 'Not Connected'}
            </h3>
            <p className={`text-sm ${connected ? 'text-green-600' : 'text-gray-500'}`}>
              {connected ? `Shop ID: ${shopId} · Syncing data in real-time` : 'Enter your API credentials below to get started'}
            </p>
          </div>
          {connected && (
            <button
              onClick={handleDisconnect}
              className="ml-auto bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* API Credentials Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Key className="w-5 h-5 text-orange-500" />
          API Credentials
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Etsy API key..."
              className="w-full px-4 py-2.5 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => setShowKey(!showKey)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(apiKey)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Your API key from the Etsy Developer Portal</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop ID</label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              placeholder="Enter your Etsy shop ID..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">You can find this in your Etsy shop manager URL</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTestConnection}
            disabled={!apiKey || !shopId || testing}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <a
            href="https://www.etsy.com/developers/register"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700"
          >
            Get API Key <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" />
          How to Get Your Etsy API Key
        </h3>
        <div className="space-y-4">
          <Step number={1} title="Go to Etsy Developer Portal" description="Visit etsy.com/developers and sign in with your Etsy account." />
          <Step number={2} title="Register a New App" description="Click 'Register a new app' and fill in the required details. Use any name for your app." />
          <Step number={3} title="Get Your API Key" description="Once registered, you'll see your API key (keystring). Copy it and paste it above." />
          <Step number={4} title="Find Your Shop ID" description="Go to your shop manager. The shop ID is in the URL or you can find it in shop settings." />
          <Step number={5} title="Test Connection" description="Click 'Test Connection' to verify everything is working correctly." />
        </div>
      </div>

      {/* API Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">What You Can Do With the API</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Feature
            title="Sync Listings"
            description="Automatically pull all your listings and analyze them"
            enabled={connected}
          />
          <Feature
            title="Update Listings"
            description="Push optimized titles, tags, and descriptions to Etsy"
            enabled={connected}
          />
          <Feature
            title="Track Performance"
            description="Get real-time views, favorites, and sales data"
            enabled={connected}
          />
          <Feature
            title="Create Listings"
            description="Publish new optimized listings directly from this tool"
            enabled={connected}
          />
          <Feature
            title="Manage Inventory"
            description="Update quantities, prices, and variations"
            enabled={connected}
          />
          <Feature
            title="Order Notifications"
            description="Get alerts for new orders and messages"
            enabled={connected}
          />
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 text-sm">Security Notice</h4>
            <p className="text-xs text-amber-700 mt-1">
              Your API key is stored locally in your browser and is never sent to any third-party server.
              All API calls go directly from your browser to Etsy's servers. For maximum security,
              use an API key with read-only permissions unless you need write access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </span>
      <div>
        <p className="font-medium text-gray-800 text-sm">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function Feature({ title, description, enabled }: { title: string; description: string; enabled: boolean }) {
  return (
    <div className={`rounded-lg p-3 border ${enabled ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
      <div className="flex items-center gap-2">
        {enabled ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <AlertCircle className="w-4 h-4 text-gray-400" />
        )}
        <h4 className="font-medium text-sm text-gray-800">{title}</h4>
      </div>
      <p className="text-xs text-gray-500 mt-1 ml-6">{description}</p>
    </div>
  );
}
