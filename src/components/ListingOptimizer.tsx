import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wand2,
  Tag,
  FileText,
  Image,
  DollarSign,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EtsyListing } from '../types';

const mockListings: EtsyListing[] = [
  {
    listing_id: 1001,
    title: 'Handmade Silver Ring with Moonstone - Boho Jewelry Gift for Her',
    description: 'Beautiful handmade silver ring...',
    price: '45.00',
    tags: ['silver ring', 'moonstone ring', 'boho jewelry', 'gift for her', 'handmade ring'],
    category: 'Jewelry > Rings',
    views: 1245,
    favorites: 89,
    sales: 12,
    created: '2024-01-15',
    images: ['ring1.jpg', 'ring2.jpg', 'ring3.jpg'],
    score: 92,
    issues: [],
    suggestions: ['Add video listing', 'Try seasonal tags']
  },
  {
    listing_id: 1002,
    title: 'Wall Art',
    description: 'Nice print',
    price: '25.00',
    tags: ['art', 'print', 'wall'],
    category: 'Art & Prints',
    views: 156,
    favorites: 3,
    sales: 0,
    created: '2024-03-22',
    images: ['art1.jpg'],
    score: 28,
    issues: ['Title too short', 'Description too brief', 'Only 3 tags (need 13)', 'Only 1 image'],
    suggestions: ['Add more descriptive title with keywords', 'Write detailed description 200+ words', 'Use all 13 tags', 'Add 5+ high quality photos']
  },
  {
    listing_id: 1003,
    title: 'Custom Name Necklace Personalized Gold Necklace for Women Birthday Gift',
    description: 'Create a unique personalized name necklace...',
    price: '38.00',
    tags: ['name necklace', 'personalized necklace', 'gold necklace', 'custom jewelry', 'gift for women', 'birthday gift', 'mom gift'],
    category: 'Jewelry > Necklaces',
    views: 856,
    favorites: 45,
    sales: 15,
    created: '2024-02-10',
    images: ['necklace1.jpg', 'necklace2.jpg', 'necklace3.jpg', 'necklace4.jpg', 'necklace5.jpg'],
    score: 78,
    issues: ['Missing size variations'],
    suggestions: ['Add chain length options', 'Include gift wrapping option']
  },
  {
    listing_id: 1004,
    title: 'Macrame Plant Hanger Boho Home Decor Handmade Cotton Rope',
    description: 'Beautiful macrame plant hanger made with premium cotton rope. Perfect for indoor plants...',
    price: '32.00',
    tags: ['macrame plant hanger', 'boho decor', 'plant hanger', 'handmade', 'cotton rope', 'bohemian', 'home decor', 'plant lover gift', 'indoor plants', 'macrame'],
    category: 'Home Decor',
    views: 654,
    favorites: 34,
    sales: 6,
    created: '2024-01-28',
    images: ['macrame1.jpg', 'macrame2.jpg', 'macrame3.jpg'],
    score: 71,
    issues: ['Price slightly high for category'],
    suggestions: ['Add more photos showing plants in hangers', 'Consider competitive pricing at $28']
  },
  {
    listing_id: 1005,
    title: 'Mug',
    description: 'A nice mug',
    price: '18.00',
    tags: ['mug', 'coffee', 'cup'],
    category: 'Home & Living > Kitchen',
    views: 45,
    favorites: 1,
    sales: 0,
    created: '2024-04-01',
    images: ['mug1.jpg'],
    score: 15,
    issues: ['Title too generic', 'Description too brief', 'Only 3 tags', 'Only 1 image', 'No specific keywords', 'Missing attributes'],
    suggestions: ['Rewrite title with specific details (color, material, style)', 'Write 200+ word description with keywords', 'Use all 13 relevant tags', 'Add lifestyle photos', 'Fill all listing attributes']
  }
];

export default function ListingOptimizer() {
  const [listings, setListings] = useState(mockListings);
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

  const avgScore = Math.round(listings.reduce((acc, l) => acc + l.score, 0) / listings.length);
  const poorListings = listings.filter(l => l.score < 50).length;
  const totalIssues = listings.reduce((acc, l) => acc + l.issues.length, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Listing Optimizer</h2>
          <p className="text-gray-500 text-sm mt-1">Analyze and improve your listings for better visibility and sales</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Sync with Etsy
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{listings.length}</p>
              <p className="text-xs text-gray-500">Total Listings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{avgScore}</p>
              <p className="text-xs text-gray-500">Avg. SEO Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{poorListings}</p>
              <p className="text-xs text-gray-500">Need Improvement</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalIssues}</p>
              <p className="text-xs text-gray-500">Total Issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'poor', 'good', 'excellent'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setFilterBy(filter)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterBy === filter
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'poor' ? '< 50' : filter === 'good' ? '50-79' : '80+'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {filteredListings.map(listing => (
          <div
            key={listing.listing_id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div
              className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedListing(expandedListing === listing.listing_id ? null : listing.listing_id)}
            >
              <div className="flex items-center gap-4">
                <ScoreCircle score={listing.score} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{listing.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{listing.views} views</span>
                    <span>{listing.favorites} favorites</span>
                    <span>{listing.sales} sales</span>
                    <span>${listing.price}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {listing.issues.length > 0 && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      {listing.issues.length} issues
                    </span>
                  )}
                  {listing.issues.length === 0 && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Optimized ✓
                    </span>
                  )}
                  {expandedListing === listing.listing_id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedListing === listing.listing_id && (
              <div className="border-t border-gray-100 p-5 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Issues */}
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Issues Found ({listing.issues.length})
                    </h5>
                    {listing.issues.length === 0 ? (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        No issues found! Great listing.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {listing.issues.map((issue, i) => (
                          <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-red-100">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{issue}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-purple-500" />
                      Suggestions ({listing.suggestions.length})
                    </h5>
                    <div className="space-y-2">
                      {listing.suggestions.map((suggestion, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-purple-100">
                          <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags Analysis */}
                <div className="mt-4">
                  <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-500" />
                    Current Tags ({listing.tags.length}/13)
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                    {Array.from({ length: 13 - listing.tags.length }).map((_, i) => (
                      <span key={`empty-${i}`} className="bg-gray-100 text-gray-400 px-2 py-1 rounded-full text-xs border border-dashed border-gray-300">
                        + add tag
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Auto-Optimize
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    View on Etsy
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
  const color = score >= 80 ? 'text-green-600 bg-green-50 border-green-200' :
                score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200' :
                'text-red-600 bg-red-50 border-red-200';

  return (
    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${color}`}>
      <span className="text-lg font-bold">{score}</span>
    </div>
  );
}
