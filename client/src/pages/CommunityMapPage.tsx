import React, { useState } from 'react';
import { MapLibreView } from '../components/map/MapLibreView';
import { CULTURAL_EXPERIENCES } from '../utils/localizedData';
import { SupportedLanguage } from '../utils/translations';
import { Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface CommunityMapPageProps {
  onSelectExperience: (experience: any) => void;
  onOpenAISuite?: () => void;
  language: SupportedLanguage;
}

export const CommunityMapPage: React.FC<CommunityMapPageProps> = ({
  onSelectExperience,
  onOpenAISuite,
  language
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Seasonal Festival',
    'Sacred Rituals',
    'Tribal Customs',
    'Folk Heritage',
    'Community Medicine'
  ];

  const filtered = CULTURAL_EXPERIENCES.filter((c) => {
    return selectedCategory === 'All' || c.category === selectedCategory;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-widest text-[#D84315]">
              World 2 • Spatial Cartography
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              Community Traditions
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
            Living Heritage Geospatial Map
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Explore authentic seasonal festivals, sacred grove rituals, and tribal gatherings across India and global previews.
          </p>
        </div>

        {onOpenAISuite && (
          <button
            onClick={onOpenAISuite}
            className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm flex items-center gap-2 self-start sm:self-auto transition-transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Knowledge Graph</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#2D4A3E] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
        <MapLibreView
          experiences={filtered.map(c => ({
            id: c.id,
            title: c.title,
            category: c.category,
            description: c.description,
            lat: c.lat,
            lng: c.lng,
            price_inr: 0,
            duration_mins: 120,
            max_participants: 20,
            women_friendly: true,
            elderly_friendly: true,
            district: c.district,
            state: c.state,
            cover_image: c.cover_image,
            artisan_id: 'comm_elder',
            artisan_name: c.community_custodians,
            trust_score: c.trust_score || 98
          }))}
          onSelectExperience={(exp) => {
            const match = CULTURAL_EXPERIENCES.find(c => c.id === exp.id);
            if (match) onSelectExperience(match);
          }}
          height="650px"
        />
      </div>
    </div>
  );
};
