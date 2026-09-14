import React, { useState } from 'react';
import {
  Search, CheckCircle, XCircle, AlertCircle, Wand2, Tag, FileText, Eye, RefreshCw, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';

interface Listing {
  id: number;
  title: string;
  tags: string[];
  views: number;
  favorites: number;
  sales: number;
  price: string;
  score: number;
  issues: string[];
  suggestions: string[];
  category: string;
}

const listings: Listing[] = [
  {
    id: 4347543891, title: 'Welsh Corgi Metal Wall Art Silhouette Dog Memorial Sign Home Decor',
    tags: ['corgi metal sign', 'corgi wall art', 'dog memorial', 'corgi gift', 'welsh corgi', 'dog silhouette', 'pet memorial', 'corgi decor', 'dog lover gift', 'corgi mom gift', 'corgi dad', 'corgi art', 'pet loss'],
    views: 234, favorites: 8, sales: 1, price: '$35.74', score: 72,
    issues: ['Duplicate — 7+ other Corgi listings competing', 'Title could include "personalized"'],
    suggestions: ['Merge with other Corgi listings as size variants', 'Add "personalized" and "custom name" to title', 'Add photo showing sign on actual wall'],
    category: 'Dog Breed Signs'
  },
  {
    id: 4347536324, title: 'Personalized Welsh Corgi Metal Sign Custom Dog Name Wall Art Outdoor Memorial',
    tags: ['corgi sign', 'personalized corgi', 'corgi metal art', 'dog name sign', 'custom dog sign', 'corgi wall decor', 'welsh corgi gift', 'pet memorial', 'outdoor dog sign', 'corgi mom', 'dog yard art', 'corgi lover', 'pet name sign'],
    views: 198, favorites: 6, sales: 0, price: '$35.74', score: 45,
    issues: ['DUPLICATE — nearly identical to 7+ other Corgi listings', 'Splitting traffic across too many similar listings', 'No sales yet — likely cannibalized'],
    suggestions: ['🚨 MERGE with main Corgi listing — keep only 2-3 Corgi listings total', 'Redirect traffic to your best-performing Corgi listing', 'Use saved effort to create listings in NEW niches'],
    category: 'Dog Breed Signs'
  },
  {
    id: 1282911262, title: 'Personalized 50th Anniversary Metal Sign Custom Golden Wedding Couple Wall Art Parents Gift',
    tags: ['50th anniversary', 'golden anniversary', 'anniversary gift', 'wedding gift', 'parents gift', 'couple sign', 'metal wall art', 'personalized gift', 'custom anniversary', 'golden wedding', 'couple wall art', 'mom dad gift', 'anniversary decor'],
    views: 2845, favorites: 189, sales: 45, price: '$35.74', score: 88,
    issues: ['Price same as all other items — no size differentiation visible'],
    suggestions: ['Add size options (12"-48") with price tiers', 'This is your TOP seller — create variations for 25th, 10th, 5th anniversary', 'Add video showing the sign being made'],
    category: 'Anniversary Gifts'
  },
  {
    id: 1541489678, title: 'Personalized Gym Metal Sign - Custom Barbell Plate Wall Art, Home Gym Decor, Fitness Gift for Him',
    tags: ['gym sign', 'home gym decor', 'fitness gift', 'barbell plate', 'workout room', 'man cave gym', 'weight room sign', 'gym name sign', 'personalized gym', 'gym wall art', 'metal gym sign', 'workout decor', 'gym gift him'],
    views: 2234, favorites: 156, sales: 38, price: '$35.74', score: 85,
    issues: ['Could offer larger sizes at premium price', 'Missing "crossfit" and "powerlifting" keywords'],
    suggestions: ['Add 36" and 48" options at $65-90', 'Add crossfit/powerlifting tags', 'This niche is growing — add yoga studio, pilates, boxing variants'],
    category: 'Hobby Signs'
  },
  {
    id: 4350686512, title: 'Custom Biker Couple Metal Sign, Personalized Motorcycle Wall Art Garage Gift',
    tags: ['biker sign', 'motorcycle art', 'biker couple', 'garage gift', 'biker gift', 'motorcycle wall art', 'biker decor', 'harley sign', 'biker anniversary', 'rider gift', 'chopper sign', 'biker wall decor', 'motorcycle couple'],
    views: 456, favorites: 28, sales: 5, price: '$35.74', score: 76,
    issues: ['Good performer but could rank higher with more specific tags'],
    suggestions: ['Add "Harley Davidson style" (without trademark), "chopper garage"', 'Create variations: solo rider, group riders, specific motorcycle types', 'Target "biker retirement gift" keyword'],
    category: 'Hobby Signs'
  },
  {
    id: 4562224993, title: 'Custom Metal Barber Sign, Hair Stylist Wall Art, Grand Opening Gift, Salon Decor',
    tags: ['barber sign', 'barber shop', 'salon decor', 'hair stylist', 'grand opening', 'barber gift', 'salon sign', 'barbershop art', 'hair salon', 'barber wall art', 'shop opening', 'business sign', 'barber metal'],
    views: 189, favorites: 12, sales: 2, price: '$35.74', score: 68,
    issues: ['Low views — needs better first photo', 'Missing "business logo" and "custom name" keywords'],
    suggestions: ['Add "custom business name" to title', 'Show sign with a real shop name as example', 'Create variants: tattoo shop, nail salon, spa, coffee shop'],
    category: 'Business Signs'
  },
  {
    id: 4562938415, title: 'Personalized greenhouse door decor, Custom Laser Cut Metal Wall Art, Powder Coated Steel Sign',
    tags: ['greenhouse sign', 'garden decor', 'door decor', 'laser cut metal', 'powder coated', 'garden art', 'greenhouse door', 'plant lover', 'garden sign', 'custom garden', 'steel sign', 'outdoor garden', 'garden gift'],
    views: 167, favorites: 9, sales: 1, price: '$35.74', score: 62,
    issues: ['Title is awkwardly structured', 'Missing high-value keywords like "personalized"'],
    suggestions: ['Rewrite title: "Personalized Greenhouse Metal Sign - Custom Garden Door Decor - Plant Lover Gift - Laser Cut Steel Art"', 'Add "gardening gift", "plant mom", "garden name" tags', 'Show sign on actual greenhouse door in photo'],
    category: 'Garden Signs'
  },
  {
    id: 4564833513, title: 'Taxidermist Metal Sign Custom Deer Hunter Wall Art Taxidermy Business Decor',
    tags: ['taxidermy sign', 'deer hunter', 'taxidermist gift', 'hunting decor', 'deer art', 'taxidermy business', 'hunter wall art', 'mounting shop', 'deer sign', 'hunting sign', 'wildlife art', 'taxidermy shop', 'custom hunting'],
    views: 145, favorites: 7, sales: 0, price: '$35.74', score: 58,
    issues: ['Very niche — low search volume', 'No sales yet — needs time or better positioning'],
    suggestions: ['Broaden to "hunting cabin sign" and "deer camp decor"', 'Add elk, moose, bear variants for other game', 'Target "retirement gift hunter" — high purchase intent'],
    category: 'Business Signs'
  },
];

export default function ListingOptimizer() {
  const [expandedListing, setExpandedListing] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'poor' | 'good' | 'excellent'>('all');

  const filteredListings = listings
    .filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(l => {
      if (filterBy === 'poor') return l.score < 50;
      if (filterBy === 'good') return l.score >= 50 && l.score < 80;
      if (filterBy === 'excellent') return l.score >= 80;
      return true;
    });

  const avgScore = Math.round(listings.reduce((a, l) => a + l.score, 0) / listings.length);
  const poorListings = listings.filter(l => l.score < 50).length;
  const totalIssues = listings.reduce((a, l) => a + l.issues.length, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Listing Optimizer</h2>
          <p className="text-gray-500 text-sm mt-1">Optimize your 111 metal sign listings for maximum visibility</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Sync Listings
        </button>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-800">🚨 Critical Issue: Listing Cannibalization</h4>
            <p className="text-sm text-red-700 mt-1">
              You have <strong>8+ nearly identical Corgi listings</strong> competing against each other in Etsy search. 
              This splits your traffic and confuses the algorithm. <strong>Recommendation:</strong> Keep only 2-3 Corgi listings 
              (e.g., "Memorial", "Welcome/Leash Holder", "Personalized Name") and redirect the rest.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-orange-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">111</p><p className="text-xs text-gray-500">Total Listings</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Eye className="w-5 h-5 text-blue-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">{avgScore}</p><p className="text-xs text-gray-500">Avg SEO Score</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><AlertCircle className="w-5 h-5 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">{poorListings}</p><p className="text-xs text-gray-500">Need Improvement</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><Tag className="w-5 h-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">{totalIssues}</p><p className="text-xs text-gray-500">Issues Found</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search your listings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" />
          </div>
          <div className="flex gap-2">
            {(['all', 'poor', 'good', 'excellent'] as const).map(f => (
              <button key={f} onClick={() => setFilterBy(f)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterBy === f ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {f === 'all' ? 'All' : f === 'poor' ? '< 50' : f === 'good' ? '50-79' : '80+'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {filteredListings.map(listing => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedListing(expandedListing === listing.id ? null : listing.id)}>
              <div className="flex items-center gap-4">
                <ScoreCircle score={listing.score} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{listing.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{listing.views} views</span>
                    <span>{listing.favorites} favs</span>
                    <span>{listing.sales} sales</span>
                    <span>{listing.price}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{listing.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {listing.issues.length > 0 && <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">{listing.issues.length} issues</span>}
                  {listing.issues.length === 0 && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Optimized ✓</span>}
                  {expandedListing === listing.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </div>
            </div>
            {expandedListing === listing.id && (
              <div className="border-t border-gray-100 p-5 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" />Issues ({listing.issues.length})</h5>
                    <div className="space-y-2">
                      {listing.issues.map((issue, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-red-100">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Wand2 className="w-4 h-4 text-purple-500" />Suggestions ({listing.suggestions.length})</h5>
                    <div className="space-y-2">
                      {listing.suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-purple-100">
                          <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Tags */}
                <div className="mt-4">
                  <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><Tag className="w-4 h-4 text-blue-500" />Tags ({listing.tags.length}/13)</h5>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <a href={`https://etsy.com/listing/${listing.id}`} target="_blank" rel="noopener noreferrer"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> View on Etsy
                  </a>
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                    <Wand2 className="w-4 h-4" /> Auto-Optimize
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-600 bg-green-50 border-green-200' : score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-red-600 bg-red-50 border-red-200';
  return <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${color}`}><span className="text-lg font-bold">{score}</span></div>;
}
