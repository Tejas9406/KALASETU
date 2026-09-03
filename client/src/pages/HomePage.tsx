import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Sparkles, ShieldCheck, 
  ArrowRight, Award, Heart, ChevronRight,
  ChevronLeft, Play, Pause
} from 'lucide-react';
import { Experience, Artisan } from '../types';
import { MapLibreView } from '../components/map/MapLibreView';
import { CulturalActivitiesSection } from '../components/culture/CulturalActivitiesSection';
import { SupportedLanguage, translations } from '../utils/translations';
import { LOCALIZED_HERO_SLIDES, LOCALIZED_HOMEPAGE_UI, CULTURAL_EXPERIENCES } from '../utils/localizedData';

interface HomePageProps {
  experiences: Experience[];
  artisans: Artisan[];
  onSelectExperience: (exp: Experience) => void;
  onSelectArtisan: (artisan: Artisan) => void;
  onNavigateToDiscover: () => void;
  language: SupportedLanguage;
}

export const HomePage: React.FC<HomePageProps> = ({
  experiences,
  artisans,
  onSelectExperience,
  onSelectArtisan,
  onNavigateToDiscover,
  language
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const t = translations[language] || translations.en;
  const ui = LOCALIZED_HOMEPAGE_UI[language] || LOCALIZED_HOMEPAGE_UI.en;
  const slides = LOCALIZED_HERO_SLIDES[language] || LOCALIZED_HERO_SLIDES.en;

  // Auto-advance video slideshow: exactly 4 seconds per video
  useEffect(() => {
    if (!isPlaying || !slides.length) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, slides.length]);

  const categories = [
    { id: 'All', label: t.filterAll || ui.allCraftsCategory, icon: '✨' },
    { id: 'Leathercraft', label: t.leathercraft || 'Kolhapuri Leather', icon: '👞' },
    { id: 'Handloom', label: t.handloom || 'Royal Handloom', icon: '🧵' },
    { id: 'Bamboo-Cane', label: t.bambooCane || 'Assam Bamboo', icon: '🎋' },
    { id: 'Woodwork', label: t.woodwork || 'Kashmir Walnut', icon: '🪵' },
    { id: 'Pottery', label: t.pottery || 'Living Terracotta', icon: '🏺' }
  ];

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCat = selectedCategory === 'All' || exp.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = !searchQuery || 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 1. Dynamic Hero Slideshow — 10 Indexed Pure-Video Slides */}
      <section className="relative w-full overflow-hidden bg-stone-900" style={{ height: '92vh', minHeight: '560px' }}>
        {/* All 10 video slides stacked, active crossfades seamlessly */}
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlide;
          // Preload active and next slide for 0ms lag transitions
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
              {/* Cinematic legibility gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>
          );
        })}

        {/* Hero Content Overlay — always on top */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white pt-24 pb-16 pointer-events-auto">
            {/* Active Craft Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase mb-5 text-amber-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{activeSlide.badge} • SIH 2026</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.1] mb-4 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] break-words">
              {ui.discoverHeading} <br />
              <span className="italic font-normal text-amber-200">
                {activeSlide.craftName}
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-stone-200 max-w-2xl mx-auto mb-8 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {activeSlide.tagline}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-full p-2 pl-6 shadow-2xl flex items-center gap-3 border border-stone-200 mb-6">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="flex-1 bg-transparent text-stone-800 text-sm sm:text-base focus:outline-none placeholder:text-stone-400 min-w-0"
              />
              <button
                onClick={onNavigateToDiscover}
                className="bg-[#D84315] hover:bg-[#BF360C] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-105 shrink-0"
              >
                {t.discover}
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-300">
              <span className="flex items-center gap-1.5 drop-shadow">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                {ui.verifiedArtisansBadge}
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1.5 drop-shadow">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                {ui.giTagBadge}
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1.5 drop-shadow">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                {ui.directIncomeBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Slideshow Controls */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 md:px-12 max-w-7xl mx-auto pointer-events-auto">
          {/* Active Location Info */}
          <div className="hidden sm:flex items-center gap-2 text-white/90 text-xs font-medium drop-shadow bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{activeSlide.location}</span>
          </div>

          {/* Dots Indicator for 14 slides */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 max-w-[280px] sm:max-w-none overflow-x-auto no-scrollbar mx-auto sm:mx-0">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full shrink-0 ${
                  currentSlide === i 
                    ? 'w-5 h-2 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-2 text-white/70 hover:text-white transition-colors shrink-0"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>


      {/* 2. Craft Categories Ribbon */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A3E]">
              {t.exploreCategories}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Filter masterclasses by regional material, ancestral technique, and geographic lineage.
            </p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2D4A3E] text-white shadow-md scale-105'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Experiences Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A3E]">
              {t.featuredExperiences}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Immersive, interactive sessions with raw materials provided.
            </p>
          </div>
          <button
            onClick={onNavigateToDiscover}
            className="text-xs sm:text-sm font-bold text-[#D84315] hover:text-[#BF360C] flex items-center gap-1 group"
          >
            <span>View All ({experiences.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.slice(0, 6).map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-[0_4px_20px_rgba(45,74,62,0.06)] hover:shadow-[0_12px_32px_rgba(45,74,62,0.12)] transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={exp.cover_image}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="bg-[#2D4A3E]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {exp.category}
                  </span>
                  {exp.odop_tag && (
                    <span className="bg-[#C9A84C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Award className="w-3 h-3" />
                      ODOP Verified
                    </span>
                  )}
                </div>

                {/* Location overlay bottom */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium drop-shadow">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{exp.district}, {exp.state}</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ★ 4.9 • Trust {exp.trust_score || 96}%
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#2D4A3E] group-hover:text-[#D84315] transition-colors leading-snug line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">{exp.artisan_name || 'Master Artisan'}</span>
                    <span className="text-xl font-serif font-bold text-[#D84315]">
                      ₹{exp.price_inr}
                    </span>
                    <span className="text-[11px] text-stone-500"> / seat</span>
                  </div>

                  <button className="bg-[#2D4A3E] hover:bg-[#1A332A] text-white font-bold text-xs px-4 py-2.5 rounded-full transition-colors flex items-center gap-1 shadow-sm">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Cultural Activities & Community Experiences (PS-TUR05) */}
      <CulturalActivitiesSection
        culturalExperiences={CULTURAL_EXPERIENCES}
        language={language}
      />



      {/* 5. Master Artisans Profile Spotlight */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#2D4A3E]">
            {t.meetMasterArtisans}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Every artisan on Kala Setu has passed multi-point evidence verification: Govt Pehchan ID, craft lineage, and community endorsement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.slice(0, 6).map((artisan) => (
            <div
              key={artisan.id}
              onClick={() => onSelectArtisan(artisan)}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-serif text-xl font-bold overflow-hidden shrink-0 border-2 border-[#D84315]">
                    {artisan.photo_url ? (
                      <img
                        src={artisan.photo_url}
                        alt={artisan.artisan_name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      artisan.artisan_name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-800 group-hover:text-[#D84315] transition-colors line-clamp-1">
                      {artisan.artisan_name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium line-clamp-1">
                      {artisan.craft_type}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        Trust {artisan.trust_score}%
                      </span>
                      {artisan.gi_certified && (
                        <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                          GI Tag
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {artisan.bio || artisan.story}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-500">
                  {artisan.district}, {artisan.state}
                </span>
                <span className="font-bold text-[#D84315] hover:underline flex items-center gap-1">
                  View Atelier →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Direct Impact & Livelihood Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#2D4A3E] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 block">
              Direct Social & Economic Empowerment
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold mb-4">
              96% of Experience Fees Settle Directly to the Artisan.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-6">
              Commercial travel agencies and aggregators traditionally extract up to 60% margins. Kala Setu ensures direct bank and UPI settlement without deductions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onNavigateToDiscover}
                className="bg-[#D84315] hover:bg-[#BF360C] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-transform hover:scale-105 shadow-md"
              >
                Browse All Workshops Now
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 font-serif text-[180px] font-extrabold leading-none pointer-events-none select-none">
            कला
          </div>
        </div>
      </section>
    </div>
  );
};
