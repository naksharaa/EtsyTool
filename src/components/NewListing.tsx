import React, { useState } from 'react';
import { Wand2, FileText, DollarSign, Package, CheckCircle, AlertCircle, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';

type ListingFormDataType = {
  title: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
}

const metalSignTags = [
  'personalized metal sign', 'custom metal wall art', 'laser cut metal sign', 'powder coated sign',
  'custom name sign', 'family name metal sign', 'housewarming gift', 'anniversary gift metal',
  'outdoor metal decor', 'indoor wall art', 'rustic metal sign', 'farmhouse decor',
  'man cave sign', 'garage wall art', 'custom gift for him', 'custom gift for her',
  'retirement gift', 'wedding gift metal', 'business logo sign', 'custom shop sign',
  'pet memorial sign', 'dog lover gift', 'hunting cabin decor', 'lake house sign',
  'garden metal art', 'greenhouse decor', 'nurse gift sign', 'teacher gift metal'
];

const categories = [
  'Anniversary & Wedding', 'Pet Memorial & Dog Breed', 'Business & Shop Signs',
  'Garden & Outdoor', 'Man Cave & Garage', 'Hobbies & Sports',
  'Kitchen & Home', 'Military & First Responder', 'Farm & Ranch',
  'Lake House & Cabin', 'Nurse & Healthcare', 'Seasonal (Halloween/Christmas)'
];

const sizes = ['8"', '12"', '14"', '18"', '24"', '30"', '36"', '40"', '44"', '48"'];
const colors = ['Black', 'Red', 'White', 'Silver', 'Blue', 'Gold', 'Copper', 'Green', 'Pink', 'Anthracite', 'Cream', 'Chrome', 'Yellow'];

export default function NewListing() {
  const [formData, setFormData] = useState<ListingFormDataType>({
    title: '', description: '', price: '', category: '', tags: [], sizes: ['24"'], colors: ['Black']
  });
  const [aiPrompt, setAiPrompt] = useState('');
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(1);
  const [showAI, setShowAI] = useState(false);

  const generateAISuggestions = () => {
    const product = aiPrompt.toLowerCase();
    let suggestions = { title: '', description: '', tags: [] as string[], price: '' };

    if (product.includes('nurse') || product.includes('nursing') || product.includes('rn')) {
      suggestions.title = 'Personalized Nurse Metal Sign - Custom RN Name Wall Art - Nursing Graduation Gift - Healthcare Worker Decor - Hospital Room Sign';
      suggestions.description = `✨ CELEBRATE YOUR NURSE WITH A CUSTOM METAL SIGN ✨\n\nA unique and lasting way to honor the incredible nurse in your life! This personalized metal sign features their name and a beautiful nursing design, laser-cut from premium steel and finished with durable powder coating.\n\n📏 AVAILABLE SIZES:\n• 12" - Perfect for desks & small spaces\n• 18" - Great for home offices\n• 24" - Ideal for living rooms\n• 30" & 36" - Statement pieces\n\n🎨 COLOR OPTIONS:\nBlack, Red, White, Silver, Blue, Gold, Copper, Green, Pink & more!\n\n🎁 PERFECT FOR:\n• Nursing graduation gifts\n• Nurse appreciation week (May)\n• Retirement from nursing\n• New nurse congratulations\n• Hospital room decor\n• Christmas & birthday gifts\n\n📦 DETAILS:\n• Material: 16-gauge steel\n• Finish: Durable powder coating\n• Indoor/outdoor use\n• Weather resistant\n• Ships in 5-8 business days\n\n💝 HOW TO ORDER:\n1. Select your size & color\n2. Add the NAME you want personalized\n3. We'll send a proof within 24 hours!\n\n⭐ WHAT CUSTOMERS SAY:\n"My nurse mom loved it! Beautiful quality!" - Recent buyer\n\nFree shipping on all orders! 🧡`;
      suggestions.tags = ['nurse gift', 'nursing graduation', 'rn metal sign', 'nurse appreciation', 'healthcare gift', 'nurse wall art', 'hospital decor', 'nurse name sign', 'nursing gift custom', 'registered nurse', 'nurse retirement', 'nurse mom gift', 'medical gift'];
      suggestions.price = '44.99';
    } else if (product.includes('teacher') || product.includes('school') || product.includes('principal')) {
      suggestions.title = 'Personalized Teacher Metal Sign - Custom Teacher Name Wall Art - End of Year Gift - School Classroom Decor - Appreciation Gift';
      suggestions.description = `✨ HONOR YOUR FAVORITE TEACHER ✨\n\nShow your appreciation with a personalized metal sign that will last a lifetime! Perfect for Teacher Appreciation Week, end of year gifts, or retirement.\n\n📏 SIZES: 12", 18", 24", 30", 36"\n🎨 COLORS: 13 vibrant options available\n\n🎁 PERFECT OCCASIONS:\n• Teacher Appreciation Week (May)\n• End of school year\n• Teacher retirement\n• Back to school\n• Christmas/holiday gifts\n\n📦 PREMIUM QUALITY:\n• 16-gauge laser-cut steel\n• Weather-resistant powder coating\n• Indoor/outdoor use\n• Free shipping included\n\n💝 PERSONALIZATION:\nAdd teacher's name, school name, years of service, or any custom text!\n\nShips in 5-8 business days. 🧡`;
      suggestions.tags = ['teacher gift', 'teacher appreciation', 'end of year teacher', 'school sign', 'classroom decor', 'teacher name sign', 'principal gift', 'nursing teacher', 'teacher retirement', 'school metal art', 'teacher wall decor', 'education gift', 'thank you teacher'];
      suggestions.price = '39.99';
    } else if (product.includes('house') || product.includes('address') || product.includes('number')) {
      suggestions.title = 'Custom House Number Metal Sign - Personalized Address Plaque - Modern Home Decor - Outdoor Housewarming Gift - Family Name Door Sign';
      suggestions.description = `✨ MAKE A GRAND FIRST IMPRESSION ✨\n\nA stunning personalized house number sign that combines style with function. Laser-cut from premium steel with a weather-resistant powder coat finish.\n\n📏 SIZES: 12" to 48" (perfect for any home)\n🎨 COLORS: 13 options to match your home\n\n✅ FEATURES:\n• Crystal clear house numbers\n• Your family name or monogram\n• Weatherproof for any climate\n• Mounts easily with screws (not included)\n• Makes a perfect housewarming gift\n\n🎁 GREAT FOR:\n• New homeowners\n• Housewarming gifts\n• Address visibility\n• Curb appeal upgrade\n• Modern farmhouse style\n\n📦 Ships in 5-8 business days with tracking!\n\n💝 Just provide: house numbers + family name + preferred size/color`;
      suggestions.tags = ['house number sign', 'address plaque', 'housewarming gift', 'home decor metal', 'custom house sign', 'door number', 'family name sign', 'modern address', 'outdoor house sign', 'new home gift', 'curb appeal', 'house numbers metal', 'front door decor'];
      suggestions.price = '54.99';
    } else if (product.includes('military') || product.includes('army') || product.includes('navy') || product.includes('veteran')) {
      suggestions.title = 'Personalized Military Metal Sign - Custom Veteran Wall Art - Army Retirement Gift - Service Branch Decor - Patriotic Home Decor';
      suggestions.description = `✨ HONOR THEIR SERVICE ✨\n\nA powerful tribute to military service members and veterans. This personalized metal sign features their branch, name, rank, or years of service.\n\n🎖️ AVAILABLE BRANCHES:\n• Army • Navy • Marines • Air Force • Coast Guard • Space Force\n\n📏 SIZES: 12" to 48"\n🎨 COLORS: Black, Silver, Gold, Red, Blue & more\n\n🎁 PERFECT FOR:\n• Military retirement\n• Veteran gifts\n• Memorial tributes\n• Man cave decor\n• Garage display\n• Patriotic holidays\n\n📦 PREMIUM QUALITY:\n• 16-gauge steel construction\n• Durable powder coating\n• Indoor/outdoor rated\n• Free shipping\n\n💝 PERSONALIZE WITH:\nName, rank, branch, years of service, unit, or custom message\n\nShips in 5-8 business days. 🇺🇸`;
      suggestions.tags = ['military gift', 'veteran sign', 'army retirement', 'navy gift', 'military wall art', 'veteran gift', 'patriotic decor', 'service member', 'military retirement', 'armed forces', 'veteran home decor', 'military man cave', 'troop gift'];
      suggestions.price = '44.99';
    } else {
      suggestions.title = 'Personalized Custom Metal Sign - [Your Theme] Wall Art - [Occasion] Gift - Laser Cut Steel Decor - [Style] Home Decoration';
      suggestions.description = `✨ CUSTOM METAL SIGN - MADE JUST FOR YOU ✨\n\nA beautiful personalized metal sign, laser-cut from premium 16-gauge steel and finished with durable powder coating. Perfect for indoor or outdoor display.\n\n📏 AVAILABLE SIZES:\n8", 12", 14", 18", 24", 30", 36", 40", 44", 48"\n\n🎨 COLOR OPTIONS:\nBlack, Red, White, Silver, Blue, Gold, Copper, Green, Pink, Anthracite, Cream, Chrome, Yellow\n\n🎁 PERFECT FOR:\n• Housewarming gifts\n• Anniversary & wedding\n• Birthday presents\n• Business signage\n• Home decoration\n\n📦 PREMIUM QUALITY:\n• 16-gauge stainless steel\n• Weather-resistant powder coating\n• Indoor/outdoor use\n• Free shipping included\n• Ships in 5-8 business days\n\n💝 HOW TO ORDER:\n1. Choose size & color\n2. Add personalization text\n3. We'll send a proof within 24 hours!\n\nCustom orders welcome! Message us with your ideas. 🧡`;
      suggestions.tags = ['personalized metal sign', 'custom wall art', 'laser cut sign', 'powder coated', 'custom gift', 'housewarming gift', 'metal wall decor', 'personalized gift', 'custom name sign', 'home decor metal', 'outdoor sign', 'indoor wall art', 'unique gift'];
      suggestions.price = '39.99';
    }

    return suggestions;
  };

  const calculateScore = () => {
    let s = 0;
    if (formData.title.length >= 80 && formData.title.length <= 140) s += 20;
    else if (formData.title.length >= 40) s += 10;
    if (formData.description.length >= 300) s += 20;
    else if (formData.description.length >= 150) s += 10;
    if (formData.tags.length >= 13) s += 25;
    else if (formData.tags.length >= 8) s += 15;
    else if (formData.tags.length >= 1) s += 5;
    if (formData.price && parseFloat(formData.price) > 0) s += 10;
    if (formData.category) s += 10;
    if (formData.sizes.length > 1) s += 10;
    if (formData.colors.length > 1) s += 5;
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Create New Metal Sign Listing</h2>
          <p className="text-gray-500 text-sm mt-1">Build optimized listings with AI-powered suggestions for your shop</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Listing Score</p>
            <p className={`text-2xl font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-gray-400'}`}>{score}/100</p>
          </div>
          <button onClick={calculateScore} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">Check Score</button>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl border border-purple-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Metal Sign AI Assistant</h3>
            <p className="text-xs text-gray-500">Describe the sign you want to create — get optimized title, description, tags & pricing</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="e.g., 'nurse appreciation metal sign' or 'custom house number sign' or 'military veteran gift'"
            value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm" />
          <button onClick={() => {
            const s = generateAISuggestions();
            setFormData({ ...formData, title: s.title, description: s.description, tags: s.tags, price: s.price });
            setShowAI(true);
          }} className="bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
            <Wand2 className="w-4 h-4" /> Generate
          </button>
        </div>
        {showAI && (
          <div className="mt-3 bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 text-purple-700 text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> AI suggestions applied! Review and customize below.
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {['Nurse Gift', 'Teacher Sign', 'House Number', 'Military Veteran', 'Pet Memorial', 'Business Logo'].map(s => (
            <button key={s} onClick={() => { setAiPrompt(s); }} className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs hover:bg-orange-50 hover:border-orange-200 transition-colors">
              Try: {s}
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <button onClick={() => setStep(s)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</button>
            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-orange-600' : 'bg-gray-200'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2"><FileText className="w-5 h-5 text-orange-500" />Basic Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title ({formData.title.length}/140)</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Write a descriptive, keyword-rich title..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" maxLength={140} />
            <div className="flex items-center gap-2 mt-1">
              {formData.title.length < 40 && <span className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Aim for 80+ characters with keywords</span>}
              {formData.title.length >= 80 && <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Great title length!</span>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description ({formData.description.length} chars)</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write a detailed description with sizes, colors, materials, personalization info..." rows={8}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="39.99" className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <p className="text-xs text-gray-400 mt-1">💡 Your avg is $35.74. Consider $39-55 for new niches.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Select category...</option>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => setStep(2)} className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
              Next: Sizes & Tags <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Package className="w-5 h-5 text-orange-500" />Sizes, Colors & Tags</h3>
          
          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button key={size} onClick={() => {
                  const newSizes = formData.sizes.includes(size) ? formData.sizes.filter(s => s !== size) : [...formData.sizes, size];
                  setFormData({ ...formData, sizes: newSizes });
                }} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${formData.sizes.includes(size) ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">💡 Offering multiple sizes = higher AOV. 36" and 48" can sell for $65-90+</p>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button key={color} onClick={() => {
                  const newColors = formData.colors.includes(color) ? formData.colors.filter(c => c !== color) : [...formData.colors, color];
                  setFormData({ ...formData, colors: newColors });
                }} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${formData.colors.includes(color) ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags ({formData.tags.length}/13)</label>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-xs text-blue-800 mb-2">
              <Lightbulb className="w-3 h-3 inline mr-1" /> Use all 13 tags! Multi-word phrases that buyers actually search for.
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, i) => (
                <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                  {tag} <button onClick={() => removeTag(tag)} className="ml-1 hover:text-orange-900">×</button>
                </span>
              ))}
              {Array.from({ length: 13 - formData.tags.length }).map((_, i) => (
                <span key={`e-${i}`} className="bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full text-sm border border-dashed border-gray-300">+ empty</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {metalSignTags.filter(t => !formData.tags.includes(t)).slice(0, 12).map((tag, i) => (
                <button key={i} onClick={() => addTag(tag)} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs hover:bg-orange-100 hover:text-orange-700 transition-colors">+ {tag}</button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">← Back</button>
            <button onClick={() => setStep(3)} className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
              Next: Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Package className="w-5 h-5 text-orange-500" />Review Your Listing</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div><p className="text-xs text-gray-500 font-medium">TITLE</p><p className="text-sm text-gray-800 font-medium">{formData.title || '—'}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">DESCRIPTION</p><p className="text-sm text-gray-700 whitespace-pre-line line-clamp-4">{formData.description || '—'}</p></div>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-xs text-gray-500 font-medium">PRICE</p><p className="text-sm text-gray-800 font-medium">${formData.price || '—'}</p></div>
              <div><p className="text-xs text-gray-500 font-medium">CATEGORY</p><p className="text-sm text-gray-800 font-medium">{formData.category || '—'}</p></div>
              <div><p className="text-xs text-gray-500 font-medium">SIZES</p><p className="text-sm text-gray-800 font-medium">{formData.sizes.join(', ')}</p></div>
            </div>
            <div><p className="text-xs text-gray-500 font-medium">COLORS</p><p className="text-sm text-gray-800">{formData.colors.join(', ')}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">TAGS ({formData.tags.length}/13)</p>
              <div className="flex flex-wrap gap-1 mt-1">{formData.tags.map((tag, i) => <span key={i} className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs">{tag}</span>)}</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
            <div className="flex items-center justify-between">
              <div><p className="font-semibold text-gray-800">Optimization Score</p><p className="text-sm text-gray-500">Based on Etsy metal sign best practices</p></div>
              <div className={`text-3xl font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{score}/100</div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <div className={`h-full rounded-full ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${score}%` }}></div>
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">← Back</button>
            <div className="flex gap-3">
              <button className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">Save Draft</button>
              <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Publish to Etsy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


