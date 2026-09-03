import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, Users, Heart, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { CulturalExperience } from '../../types';
import { SupportedLanguage } from '../../utils/translations';

interface CulturalActivitiesSectionProps {
  culturalExperiences: CulturalExperience[];
  language: SupportedLanguage;
  onSelectExperience?: (exp: CulturalExperience) => void;
}

export const CulturalActivitiesSection: React.FC<CulturalActivitiesSectionProps> = ({
  culturalExperiences,
  language,
  onSelectExperience
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedCulture, setSelectedCulture] = useState<CulturalExperience | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Traditions' },
    { id: 'Community Medicine', label: 'Indigenous Wellness & Healing' },
    { id: 'Seasonal Festival', label: 'Living Village Festivals' },
    { id: 'Folk Heritage', label: 'Folk & Devotional Arts' },
    { id: 'Tribal Customs', label: 'Indigenous Tribal Customs' }
  ];

  const filtered = activeCategory === 'ALL'
    ? culturalExperiences
    : culturalExperiences.filter(c => c.category === activeCategory);

  return (
    <section className="py-16 bg-[#FAF7F2] border-y border-stone-200 relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#D84315] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural Activities & Community Experiences (PS-TUR05)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D4A3E] tracking-tight">
              Living Cultural Traditions & Sacred Rituals
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Beyond mastercraft ateliers, discover India's ancient community practices, indigenous healing lineages, sacred temple palanquin dances, and seasonal tribal celebrations.
            </p>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#D84315] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Culture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with smooth zoom */}
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Category Badge (Orange theme for Culture) */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#D84315] text-white text-[11px] font-bold shadow-md tracking-wide">
                    {item.category}
                  </span>
                </div>
                {/* Significance badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white text-[11px] flex items-center justify-between">
                  <span className="font-semibold truncate">{item.tradition_name}</span>
                  <span className="text-amber-300 font-bold shrink-0 ml-2">★ {item.trust_score || 98}% Heritage Score</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D84315]" />
                    <span>{item.location_name} • {item.district}, {item.state}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 line-clamp-2 group-hover:text-[#2D4A3E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-[11px] text-stone-500">
                    <span className="font-bold text-stone-700 block">{item.community_custodians || 'Traditional Guild'}</span>
                    <span>{item.season || 'Year-round living tradition'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCulture(item)}
                    className="px-3 py-1.5 rounded-full bg-[#2D4A3E] hover:bg-[#1A332A] text-white text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
                  >
                    <span>Inspect Tradition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Detail Modal */}
      {selectedCulture && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative">
            <div className="relative h-72">
              <img
                src={selectedCulture.cover_image}
                alt={selectedCulture.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedCulture(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 to-transparent p-4 rounded-b-3xl text-white">
                <span className="px-2.5 py-1 rounded-full bg-[#D84315] text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                  {selectedCulture.category}
                </span>
                <h3 className="text-2xl font-serif font-bold">{selectedCulture.title}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-200 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{selectedCulture.location_name} • {selectedCulture.district}, {selectedCulture.state}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 uppercase text-xs tracking-wider mb-1 text-[#2D4A3E]">
                  Living Heritage Background
                </h4>
                <p className="leading-relaxed text-stone-600">{selectedCulture.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-500 block">Custodians / Lineage:</span>
                  <span className="font-bold text-stone-800">{selectedCulture.community_custodians}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Observance Season:</span>
                  <span className="font-bold text-[#D84315]">{selectedCulture.season}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-200">
                  <span className="text-stone-500 block">Cultural Significance:</span>
                  <span className="font-medium text-stone-800">{selectedCulture.significance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Living Heritage Custom • PS-TUR05 Documentation</span>
                </div>
                <button
                  onClick={() => setSelectedCulture(null)}
                  className="px-5 py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1A332A] transition-colors"
                >
                  Close & Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
