import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

export default function ListingOptimizer() {
  const [listings, setListings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'poor' | 'good' | 'excellent'>('all');
  const [expandedListing, setExpandedListing] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('etsy_listings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setListings(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load listings');
    }
  }, []);

  if (listings.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Listings Data</h2>
          <p className="text-gray-600 mb-6">Connect your Etsy API and sync listings to analyze them here.</p>
        </div>
      </div>
    );
  }

  const analyzedListings = listings.map(listing => {
    const score = calculateListingScore(listing);
    const issues = identifyIssues(listing);
    const suggestions = generateSuggestions(listing, score);

    return {
      ...listing,
      score,
      issues,
      suggestions,
    };
  });

  const filteredListings = analyzedListings
    .filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(l => {
      if (filterBy === 'poor') return l.score < 50;
      if (filterBy === 'good') return l.score >= 50 && l.score < 80;
      if (filterBy === 'excellent') return l.score >= 80;
      return true;
    });

  const avgScore = Math.round(analyzedListings.reduce((sum, l) => sum + l.score, 0) / analyzedListings.length);
  const poorListings = analyzedListings.filter(l => l.score < 50).length;
  const totalIssues = analyzedListings.reduce((sum, l) => sum + l.issues.length, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Listing Optimizer</h1>
        <p className="text-gray-600 text-sm mt-1">Analyze and optimize your {listings.length} listings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Listings</p>
          <p className="text-2xl font-bold text-gray-800">{listings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Avg SEO Score</p>
          <p className="text-2xl font-bold text-gray-800">{avgScore}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Need Improvement</p>
          <p className="text-2xl font-bold text-red-600">{poorListings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Issues</p>
          <p className="text-2xl font-bold text-orange-600">{totalIssues}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'poor', 'good', 'excellent'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setFilterBy(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

      <div className="space-y-4">
        {filteredListings.map(listing => (
          <div key={listing.listing_id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedListing(expandedListing === listing.listing_id ? null : listing.listing_id)}
            >
              <div className="flex items-center gap-4">
                <ScoreCircle score={listing.score} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{listing.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>{listing.views} views</span>
                    <span>{listing.num_favorers} favorites</span>
                    <span>${((listing.price?.amount || 0) / (listing.price?.divisor || 100)).toFixed(2)}</span>
                    <span>{listing.tags?.length || 0}/13 tags</span>
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
                </div>
              </div>
            </div>

            {expandedListing === listing.listing_id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Issues ({listing.issues.length})
                    </h4>
                    {listing.issues.length === 0 ? (
                      <p className="text-sm text-green-600">No issues found! Great listing.</p>
                    ) : (
                      <ul className="space-y-2">
                        {listing.issues.map((issue: string, i: number) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Suggestions ({listing.suggestions.length})
                    </h4>
                    <ul className="space-y-2">
                      {listing.suggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {listing.tags && listing.tags.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Tags ({listing.tags.length}/13)</h4>
                    <div className="flex flex-wrap gap-2">
                      {listing.tags.map((tag: string, i: number) => (
                        <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  {listing.url && (
                    <a
                      href={listing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Etsy
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateListingScore(listing: any): number {
  let score = 0;

  const titleLength = listing.title?.length || 0;
  if (titleLength >= 80 && titleLength <= 140) score += 20;
  else if (titleLength >= 40) score += 10;
  else if (titleLength > 0) score += 5;

  const descLength = listing.description?.length || 0;
  if (descLength >= 300) score += 20;
  else if (descLength >= 150) score += 10;
  else if (descLength > 0) score += 5;

  const tagCount = listing.tags?.length || 0;
  if (tagCount >= 13) score += 25;
  else if (tagCount >= 8) score += 15;
  else if (tagCount >= 1) score += 5;

  if (listing.price && listing.price.amount > 0) score += 10;

  const imageCount = listing.images?.length || 0;
  if (imageCount >= 5) score += 15;
  else if (imageCount >= 3) score += 10;
  else if (imageCount >= 1) score += 5;

  if ((listing.views || 0) > 100) score += 5;
  if ((listing.num_favorers || 0) > 10) score += 5;

  return Math.min(score, 100);
}

function identifyIssues(listing: any): string[] {
  const issues: string[] = [];

  if (!listing.title || listing.title.length < 40) {
    issues.push('Title is too short (should be 80-140 characters)');
  }

  if (!listing.description || listing.description.length < 150) {
    issues.push('Description is too brief (should be 300+ characters)');
  }

  const tagCount = listing.tags?.length || 0;
  if (tagCount < 13) {
    issues.push(`Only using ${tagCount}/13 tags - add more relevant keywords`);
  }

  const imageCount = listing.images?.length || 0;
  if (imageCount < 5) {
    issues.push(`Only ${imageCount} images - add more photos (aim for 5+)`);
  }

  if ((listing.views || 0) < 50) {
    issues.push('Low visibility - improve SEO and tags');
  }

  if ((listing.num_favorers || 0) < 5 && (listing.views || 0) > 100) {
    issues.push('Low conversion - improve photos and description');
  }

  return issues;
}

function generateSuggestions(listing: any, score: number): string[] {
  const suggestions: string[] = [];

  if (listing.title && listing.title.length < 80) {
    suggestions.push('Expand title with more keywords and details');
  }

  if (!listing.description || listing.description.length < 300) {
    suggestions.push('Write a detailed description with keywords, materials, sizes, and use cases');
  }

  const tagCount = listing.tags?.length || 0;
  if (tagCount < 13) {
    suggestions.push(`Add ${13 - tagCount} more tags using multi-word phrases buyers search for`);
  }

  const imageCount = listing.images?.length || 0;
  if (imageCount < 5) {
    suggestions.push('Add lifestyle photos showing the product in use');
  }

  if (score < 50) {
    suggestions.push('Focus on SEO: optimize title, description, and tags');
  }

  if ((listing.views || 0) > 100 && (listing.num_favorers || 0) < 10) {
    suggestions.push('Improve first photo to increase click-through rate');
  }

  return suggestions;
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
