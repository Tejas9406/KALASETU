import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Users, 
  ShieldCheck, ArrowRight, Heart, Sparkles, AlertCircle
} from 'lucide-react';
import { CulturalExperience } from '../types';
import { SupportedLanguage, translations } from '../utils/translations';
import { CULTURAL_EXPERIENCES } from '../utils/localizedData';

interface CommunityDiscoverPageProps {
  onSelectExperience: (experience: any) => void;
  onOpenAISuite?: () => void;
  language: SupportedLanguage;
}

export const CommunityDiscoverPage: React.FC<CommunityDiscoverPageProps> = ({
  onSelectExperience,
  onOpenAISuite,
  language
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [familyFriendlyOnly, setFamilyFriendlyOnly] = useState(false);

  const t = translations[language] || translations.en;

  const categories = [
    'All',
    'Seasonal Festival',
    'Sacred Rituals',
    'Tribal Customs',
    'Folk Heritage',
    'Community Medicine'
  ];

  const seasons = ['All', 'Spring', 'Autumn', 'Winter', 'Year-round'];

  const filtered = CULTURAL_EXPERIENCES.filter((exp) => {
    const matchesCat = selectedCategory === 'All' || exp.category === selectedCategory;
    const matchesSeason = selectedSeason === 'All' || (exp.season && exp.season.toLowerCase().includes(selectedSeason.toLowerCase()));
    const matchesSearch = !searchQuery ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tradition_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSeason && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D84315]">
                World 2 • Community Experiences
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                Living Heritage
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
              Discover Living Traditions &amp; Festivals
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Authentic community festivals, seasonal rituals, and oral traditions approved by local village elders and guild custodians.
            </p>
          </div>

          {onOpenAISuite && (
            <button
              onClick={onOpenAISuite}
              className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm flex items-center gap-2 self-start sm:self-auto transition-transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural Knowledge Graph AI</span>
            </button>
          )}
        </div>

        {/* Respect & Conduct Banner (UNESCO Standard) */}
        <div className="p-4 bg-emerald-950/10 rounded-2xl border border-emerald-900/20 text-xs text-stone-700 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#2D4A3E] font-bold block mb-0.5">
              Community Sovereignty &amp; Respectful Participation
            </strong>
            All experiences are self-determined and community-approved under UNESCO Intangible Cultural Heritage ethical principles. Guests are asked to observe local photography protocols, wear humble attire at sacred groves, and honor community traditions.
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-stone-50 rounded-full px-4 py-2 flex items-center gap-2 border border-stone-200">
              <Search className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search festivals, rituals, folk dance, village, state..."
                className="bg-transparent flex-1 text-xs sm:text-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-stone-400 shrink-0">Season:</span>
              {seasons.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeason(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedSeason === s
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-400 shrink-0">Category:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === c
                    ? 'bg-[#2D4A3E] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
          <span>Found {filtered.length} Living Heritage Traditions</span>
          <span>Zero Middleman Deductions</span>
        </div>

        {/* Grid of Community Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                <img
                  src={exp.cover_image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {exp.category}
                  </span>
                  {exp.season && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-900/80 backdrop-blur-md text-emerald-200 border border-emerald-700/50 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.season.split('(')[0]}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location_name} • {exp.state}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#D84315] transition-colors line-clamp-1 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Custodians</span>
                    <span className="font-bold text-stone-800 text-[11px] line-clamp-1">
                      {exp.community_custodians}
                    </span>
                  </div>

                  <span className="font-bold text-[#D84315] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Explore →</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
