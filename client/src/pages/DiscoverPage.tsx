import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Star, ShieldCheck, 
  Award, Sparkles, Filter, Grid, Map as MapIcon, Mic, ArrowRight 
} from 'lucide-react';
import { Experience } from '../types';
import { MapLibreView } from '../components/map/MapLibreView';
import { SupportedLanguage, translations } from '../utils/translations';

interface DiscoverPageProps {
  experiences: Experience[];
  onSelectExperience: (exp: Experience) => void;
  language: SupportedLanguage;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  experiences,
  onSelectExperience,
  language
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [womenOnly, setWomenOnly] = useState(false);
  const [elderlyFriendlyOnly, setElderlyFriendlyOnly] = useState(false);
  const [odopOnly, setOdopOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [maxPrice, setMaxPrice] = useState(3000);

  const t = translations[language];

  const categories = ['All', 'Leathercraft', 'Handloom', 'Bamboo-Cane', 'Woodwork', 'Pottery'];
  const states = ['All', 'Maharashtra', 'Madhya Pradesh', 'Assam', 'Jammu and Kashmir', 'West Bengal'];

  const filtered = experiences.filter((exp) => {
    const matchesSearch = !search || 
      exp.title.toLowerCase().includes(search.toLowerCase()) ||
      exp.district.toLowerCase().includes(search.toLowerCase()) ||
      exp.state.toLowerCase().includes(search.toLowerCase()) ||
      exp.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || exp.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesState = stateFilter === 'All' || exp.state.toLowerCase() === stateFilter.toLowerCase();
    const matchesWomen = !womenOnly || exp.women_friendly;
    const matchesElderly = !elderlyFriendlyOnly || exp.elderly_friendly;
    const matchesOdop = !odopOnly || Boolean(exp.odop_tag);
    const matchesPrice = exp.price_inr <= maxPrice;

    return matchesSearch && matchesCategory && matchesState && matchesWomen && matchesElderly && matchesOdop && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
          Catalog & Craft Geographies
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
          {t.exploreExperiences}
        </h1>
        <p className="text-stone-600 text-sm mt-2 max-w-2xl">
          Browse verified hands-on workshops directly curated with certified craft custodians.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Main Search Input */}
          <div className="w-full md:flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by craft, artisan name, city, or state..."
              className="w-full bg-stone-50 border border-stone-200 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#2D4A3E]"
            />
          </div>

          {/* View Mode Toggle (Grid vs Map View) */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-4 py-2 rounded-full font-medium shrink-0 transition-colors ${
                categoryFilter === c
                  ? 'bg-[#D84315] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Advanced Filters: Inclusion & Price */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100">
              <input
                type="checkbox"
                checked={womenOnly}
                onChange={(e) => setWomenOnly(e.target.checked)}
                className="rounded text-[#D84315] focus:ring-[#D84315]"
              />
              <span className="font-medium text-stone-700">👩 Women-Led Only</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100">
              <input
                type="checkbox"
                checked={elderlyFriendlyOnly}
                onChange={(e) => setElderlyFriendlyOnly(e.target.checked)}
                className="rounded text-[#2D4A3E] focus:ring-[#2D4A3E]"
              />
              <span className="font-medium text-stone-700">👴 Senior & Family Friendly</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100">
              <input
                type="checkbox"
                checked={odopOnly}
                onChange={(e) => setOdopOnly(e.target.checked)}
                className="rounded text-[#C9A84C] focus:ring-[#C9A84C]"
              />
              <span className="font-medium text-stone-700">🏛️ ODOP Certified</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Max Price:</span>
            <input
              type="range"
              min="1000"
              max="3000"
              step="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#D84315] cursor-pointer"
            />
            <span className="font-bold text-[#2D4A3E]">₹{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
        <span>Showing {filtered.length} authentic workshops</span>
        <span>Verified by Ministry of Tourism standards</span>
      </div>

      {/* View Display: Grid or Map */}
      {viewMode === 'map' ? (
        <div className="space-y-6">
          <MapLibreView
            experiences={filtered}
            onSelectExperience={onSelectExperience}
            height="550px"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.cover_image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-[#2D4A3E]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {exp.category}
                  </span>
                  {exp.women_friendly && (
                    <span className="bg-[#D84315] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Women-Led
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{exp.district}, {exp.state}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-800 group-hover:text-[#D84315] transition-colors line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">Workshop Fee</span>
                    <span className="text-xl font-serif font-bold text-[#D84315]">
                      ₹{exp.price_inr}
                    </span>
                  </div>
                  <button className="bg-[#2D4A3E] group-hover:bg-[#1A332A] text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
