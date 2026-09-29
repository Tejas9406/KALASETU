import React, { useState, useEffect } from 'react';
import { 
  Sparkles, MapPin, Calendar, Users, ArrowRight, 
  ShieldCheck, Heart, Play, Pause, ChevronRight, ChevronLeft, Network
} from 'lucide-react';
import { CulturalExperience } from '../types';
import { SupportedLanguage, translations } from '../utils/translations';
import { LOCALIZED_COMMUNITY_SLIDES, CULTURAL_EXPERIENCES } from '../utils/localizedData';
import { MapLibreView } from '../components/map/MapLibreView';

interface CommunityLandingPageProps {
  onSelectExperience: (experience: any) => void;
  onNavigateToDiscover: () => void;
  onOpenAISuite: () => void;
  language: SupportedLanguage;
}

export const CommunityLandingPage: React.FC<CommunityLandingPageProps> = ({
  onSelectExperience,
  onNavigateToDiscover,
  onOpenAISuite,
  language
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const t = translations[language] || translations.en;
  const slides = LOCALIZED_COMMUNITY_SLIDES[language] || LOCALIZED_COMMUNITY_SLIDES.en;

  // Auto-advance video slideshow: 4.5 seconds per video
  useEffect(() => {
    if (!isPlaying || !slides.length) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, slides.length]);

  const categories = [
    { id: 'All', label: 'All Traditions', icon: '✨' },
    { id: 'Seasonal Festival', label: 'Seasonal Festivals', icon: '🎉' },
    { id: 'Sacred Rituals', label: 'Sacred Rituals', icon: '🪔' },
    { id: 'Tribal Customs', label: 'Tribal Customs', icon: '🏹' },
    { id: 'Folk Heritage', label: 'Oral & Folk Epics', icon: '🪕' },
    { id: 'Community Medicine', label: 'Indigenous Medicine', icon: '🌿' }
  ];

  const filteredExperiences = CULTURAL_EXPERIENCES.filter((exp) => {
    return selectedCategory === 'All' || exp.category === selectedCategory;
  });

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 1. Full-Bleed Community Hero (Pure Living Heritage Videos: Festivals, Dances, Food, Rituals) */}
      <section className="relative w-full overflow-hidden bg-stone-900" style={{ height: '92vh', minHeight: '560px' }}>
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlide;
          const isNext = index === (currentSlide + 1) % slides.length;
          const shouldLoad = isCurrent || isNext || Math.abs(index - currentSlide) <= 1;

          return (
            <div
              key={`${slide.id}-${index}`}
              className="absolute inset-0 w-full h-full overflow-hidden bg-stone-950"
              style={{
                opacity: isCurrent ? 1 : 0,
                transition: 'opacity 800ms ease-in-out',
                zIndex: isCurrent ? 2 : 1,
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
            >
              {shouldLoad && (
                <video
                  ref={(el) => {
                    if (el) {
                      if (isCurrent && isPlaying) {
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                  src={slide.src}
                  muted
                  loop
                  playsInline
                  autoPlay={isCurrent}
                  preload={isCurrent ? "auto" : isNext ? "auto" : "metadata"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/35 pointer-events-none" />
            </div>
          );
        })}

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white pt-24 pb-16 pointer-events-auto">
            {/* World Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>World 2 • Community Experiences</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-lg">
              {activeSlide.craftName}
            </h1>

            <p className="text-sm sm:text-lg text-stone-200 font-light max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
              {activeSlide.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={onNavigateToDiscover}
                className="bg-[#2D4A3E] hover:bg-[#1A332A] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Explore Living Traditions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAISuite}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2"
              >
                <Network className="w-4 h-4 text-emerald-400" />
                <span>Open Heritage AI Studio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls & Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-6 max-w-7xl mx-auto pointer-events-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <span className="text-xs text-stone-300 font-mono">
              {currentSlide + 1} / {slides.length} • {activeSlide.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Cultural Category Filter Pills */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200/80">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block">
              Living Heritage Taxonomy
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#2D4A3E]">
              Explore by Cultural Domain
            </h2>
          </div>

          <button
            onClick={onNavigateToDiscover}
            className="text-xs font-bold text-[#D84315] hover:underline flex items-center gap-1"
          >
            <span>View All ({CULTURAL_EXPERIENCES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#2D4A3E] text-white border-[#2D4A3E] shadow-sm'
                    : 'bg-white text-stone-700 border-stone-300/80 hover:bg-stone-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Community Experiences Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
              Community-Guaranteed Immersion
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#2D4A3E]">
              Living Heritage Experiences
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl">
              Authentic festive celebrations, indigenous sacred traditions, and seasonal village customs approved by local community custodians.
            </p>
          </div>

          <button
            onClick={onOpenAISuite}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Community Knowledge Graph</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                <img
                  src={exp.cover_image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

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

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#D84315] transition-colors line-clamp-1 mb-1">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
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
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Community Map Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
              Living Heritage Cartography
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D4A3E]">
              Community Traditions & Festivals Map
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Geolocated sacred groves, temple sanctums, harvest festival grounds, and indigenous community hubs.
            </p>
          </div>

          <button
            onClick={onNavigateToDiscover}
            className="text-xs font-bold text-white bg-[#2D4A3E] px-4 py-2 rounded-full hover:bg-[#1A332A] transition-colors self-start sm:self-auto"
          >
            Open Full Screen Cartography →
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
          <MapLibreView
            experiences={CULTURAL_EXPERIENCES.map(c => ({
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
            height="500px"
          />
        </div>
      </section>
    </div>
  );
};
