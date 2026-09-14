import React, { useState } from 'react';
import {
  PlusCircle,
  Wand2,
  Tag,
  FileText,
  Image,
  DollarSign,
  Package,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ListingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  shippingProfile: string;
  quantity: string;
}

const suggestedTags = [
  'handmade', 'gift for her', 'personalized', 'boho decor', 'minimalist',
  'custom order', 'eco friendly', 'sustainable', 'unique gift', 'wedding',
  'birthday gift', 'home decor', 'wall art', 'jewelry', 'accessories'
];

const categorySuggestions = [
  'Jewelry > Rings',
  'Jewelry > Necklaces',
  'Jewelry > Bracelets',
  'Art & Prints > Digital Prints',
  'Art & Prints > Wall Art',
  'Home & Living > Home Decor',
  'Home & Living > Kitchen & Dining',
  'Clothing > Women\'s Clothing',
  'Craft Supplies & Tools',
  'Weddings > Decorations',
  'Paper & Party Supplies > Cards',
  'Bags & Purses > Totes'
];

export default function NewListing() {
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    tags: [],
    shippingProfile: 'standard',
    quantity: '1'
  });

  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(1);

  const calculateScore = () => {
    let s = 0;
    if (formData.title.length >= 20 && formData.title.length <= 140) s += 20;
    else if (formData.title.length >= 10) s += 10;
    if (formData.description.length >= 200) s += 20;
    else if (formData.description.length >= 100) s += 10;
    if (formData.tags.length >= 10) s += 25;
    else if (formData.tags.length >= 5) s += 15;
    else if (formData.tags.length >= 1) s += 5;
    if (formData.price && parseFloat(formData.price) > 0) s += 15;
    if (formData.category) s += 10;
    if (formData.quantity) s += 10;
    setScore(s);
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 13) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const generateAISuggestions = () => {
    // Simulated AI suggestions based on prompt
    const product = aiPrompt.toLowerCase();
    let suggestions = {
      title: '',
      description: '',
      tags: [] as string[]
    };

    if (product.includes('ring') || product.includes('jewelry')) {
      suggestions.title = 'Handmade Sterling Silver Ring with Natural Stone - Minimalist Boho Jewelry Gift for Her - Stackable Dainty Band';
      suggestions.description = `✨ HANDCRAFTED WITH LOVE ✨\n\nThis beautiful handmade sterling silver ring features a natural stone setting that catches the light beautifully. Perfect for everyday wear or as a thoughtful gift.\n\n📏 DETAILS:\n• Material: 925 Sterling Silver\n• Stone: Natural (varies by selection)\n• Band Width: 2mm\n• Available Sizes: 5-10\n\n🎁 PERFECT FOR:\n• Birthday gifts\n• Anniversary surprises\n• Bridesmaid gifts\n• Self-care treats\n\n📦 SHIPPING:\n• Carefully packaged in a beautiful gift box\n• Ships within 1-3 business days\n• Tracking included on all orders\n\n💝 CUSTOMIZATION:\nWant a different stone or size? Message me for custom orders!\n\n⭐ WHAT CUSTOMERS SAY:\n"Absolutely gorgeous! Even better in person!" - Recent buyer\n\n#handmade #sterlingsilver #bohojewelry #gifther #minimalist`;
      suggestions.tags = ['sterling silver ring', 'handmade ring', 'boho jewelry', 'gift for her', 'minimalist ring', 'stackable ring', 'natural stone', 'dainty jewelry', 'birthday gift', 'anniversary gift', 'custom ring', 'silver band', 'everyday jewelry'];
    } else if (product.includes('art') || product.includes('print') || product.includes('poster')) {
      suggestions.title = 'Boho Abstract Wall Art - Modern Minimalist Line Art Print - Neutral Home Decor - Digital Download or Printed';
      suggestions.description = `🎨 MODERN BOHO WALL ART\n\nAdd a touch of contemporary elegance to your space with this beautifully designed abstract art print. Perfect for living rooms, bedrooms, or offices.\n\n📐 AVAILABLE SIZES:\n• 8x10 inches\n• 11x14 inches\n• 16x20 inches\n• 18x24 inches\n• 24x36 inches\n\n🖨️ PRINTING OPTIONS:\n• Digital Download (instant)\n• Printed on premium matte paper\n• Canvas option available\n\n🏠 STYLING TIPS:\n• Pair with neutral tones for a calm aesthetic\n• Mix with other prints for a gallery wall\n• Frame in natural wood for boho vibes\n\n📦 SHIPPING (for prints):\n• Shipped in rigid mailer to prevent damage\n• Ships within 2-3 business days\n• Free shipping on orders $35+\n\n💡 NOTE: Colors may vary slightly due to monitor settings.`;
      suggestions.tags = ['wall art', 'boho print', 'abstract art', 'minimalist decor', 'home decor', 'digital download', 'line art', 'neutral art', 'living room art', 'bedroom decor', 'modern art print', 'gallery wall', 'apartment decor'];
    } else {
      suggestions.title = 'Handmade [Product Name] - Unique [Style] [Category] - Perfect Gift for [Occasion] - [Material] [Detail]';
      suggestions.description = `✨ HANDMADE WITH CARE ✨\n\n[Describe your product in 2-3 sentences highlighting what makes it special]\n\n📏 DETAILS:\n• Material: [Primary material]\n• Size: [Dimensions]\n• Color: [Available colors]\n• Weight: [If applicable]\n\n🎁 PERFECT FOR:\n• [Occasion 1]\n• [Occasion 2]\n• [Occasion 3]\n\n📦 SHIPPING:\n• Carefully packaged\n• Ships within 1-3 business days\n• Tracking included\n\n💝 CUSTOMIZATION:\nMessage me for custom orders!\n\nThank you for supporting handmade! 🧡`;
      suggestions.tags = ['handmade', 'unique gift', 'custom order', 'personalized', 'gift for her', 'gift for him', 'eco friendly', 'sustainable', 'shop small', 'artisan made', 'one of a kind', 'special occasion', 'quality handmade'];
    }

    return suggestions;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Create New Listing</h2>
          <p className="text-gray-500 text-sm mt-1">Build optimized listings with AI-powered suggestions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Listing Score</p>
            <p className={`text-2xl font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-gray-400'}`}>
              {score}/100
            </p>
          </div>
          <button
            onClick={calculateScore}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            Check Score
          </button>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl border border-purple-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">AI Listing Assistant</h3>
            <p className="text-xs text-gray-500">Describe your product and get optimized title, description & tags</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g., 'handmade silver ring with moonstone' or 'boho wall art print'"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
          />
          <button
            onClick={() => {
              const suggestions = generateAISuggestions();
              setFormData({
                ...formData,
                title: suggestions.title,
                description: suggestions.description,
                tags: suggestions.tags
              });
              setShowAI(true);
            }}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Generate
          </button>
        </div>
        {showAI && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-center gap-2 text-purple-700 text-sm font-medium mb-2">
              <CheckCircle className="w-4 h-4" />
              AI suggestions applied! Review and customize below.
            </div>
            <p className="text-xs text-gray-500">You can edit any field. The listing score will update as you make changes.</p>
          </div>
        )}
      </div>

      {/* Form Steps */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <button
              onClick={() => setStep(s)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </button>
            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-orange-600' : 'bg-gray-200'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-gray-400">({formData.title.length}/140 characters)</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Write a descriptive, keyword-rich title..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              maxLength={140}
            />
            <div className="flex items-center gap-2 mt-1">
              {formData.title.length < 20 && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Title too short - aim for 80+ characters
                </span>
              )}
              {formData.title.length >= 80 && formData.title.length <= 140 && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Good title length!
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400">({formData.description.length} characters)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write a detailed, keyword-rich description..."
              rows={8}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
            />
            <div className="flex items-center gap-2 mt-1">
              {formData.description.length < 200 && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Aim for 200+ characters for better SEO
                </span>
              )}
              {formData.description.length >= 200 && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Great description length!
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="">Select a category...</option>
              {categorySuggestions.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
            >
              Next: Tags <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Tags */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Tag className="w-5 h-5 text-orange-500" />
            Tags ({formData.tags.length}/13)
          </h3>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
            <Lightbulb className="w-4 h-4 inline mr-1" />
            <strong>Pro Tip:</strong> Use all 13 tags! Each tag can be up to 20 characters. Use multi-word phrases that buyers actually search for.
          </div>

          {/* Current Tags */}
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, i) => (
              <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-orange-900">×</button>
              </span>
            ))}
            {Array.from({ length: 13 - formData.tags.length }).map((_, i) => (
              <span key={`empty-${i}`} className="bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full text-sm border border-dashed border-gray-300">
                + empty slot
              </span>
            ))}
          </div>

          {/* Add Custom Tag */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a custom tag..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  addTag(input.value);
                  input.value = '';
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Suggested Tags */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Suggested Tags (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags
                .filter(t => !formData.tags.includes(t))
                .map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => addTag(tag)}
                    className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
            >
              Next: Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Publish */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Review Your Listing
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">TITLE</p>
              <p className="text-sm text-gray-800 font-medium">{formData.title || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">DESCRIPTION</p>
              <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-4">{formData.description || '—'}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-medium">PRICE</p>
                <p className="text-sm text-gray-800 font-medium">${formData.price || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">CATEGORY</p>
                <p className="text-sm text-gray-800 font-medium">{formData.category || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">QUANTITY</p>
                <p className="text-sm text-gray-800 font-medium">{formData.quantity}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">TAGS ({formData.tags.length}/13)</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Score Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Listing Optimization Score</p>
                <p className="text-sm text-gray-500">Based on Etsy best practices</p>
              </div>
              <div className={`text-3xl font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {score}/100
              </div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              ← Back
            </button>
            <div className="flex gap-3">
              <button className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Save Draft
              </button>
              <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Publish to Etsy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
