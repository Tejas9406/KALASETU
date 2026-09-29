import React from 'react';
import { Home, Compass, MapPin, BookmarkCheck, Sparkles, Network, BookOpen, Layers } from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: SupportedLanguage;
  activeDomain: 'gateway' | 'artisan' | 'community' | 'genesis' | 'world';
  onChangeDomain: (domain: 'gateway' | 'artisan' | 'community') => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  setCurrentTab,
  language,
  activeDomain,
  onChangeDomain
}) => {
  const t = translations[language];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-stone-200 py-1.5 px-2 flex items-center justify-around shadow-xl">
      {/* 1. Main Gateway */}
      <button
        onClick={() => setCurrentTab('gateway')}
        className={`flex flex-col items-center gap-0.5 p-1 ${
          currentTab === 'gateway' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <span className="text-base leading-none">🏛️</span>
        <span className="text-[9px]">Gateway</span>
      </button>

      {/* 2. World 1: Artisans */}
      <button
        onClick={() => {
          onChangeDomain('artisan');
          setCurrentTab('home');
        }}
        className={`flex flex-col items-center gap-0.5 p-1 ${
          activeDomain === 'artisan' && (currentTab === 'home' || currentTab === 'discover' || currentTab === 'artisans')
            ? 'text-amber-600 font-bold'
            : 'text-stone-500'
        }`}
      >
        <span className="text-base leading-none">🧑‍🎨</span>
        <span className="text-[9px]">Artisans</span>
      </button>

      {/* 3. World 2: Community */}
      <button
        onClick={() => {
          onChangeDomain('community');
          setCurrentTab('community');
        }}
        className={`flex flex-col items-center gap-0.5 p-1 ${
          activeDomain === 'community' && (currentTab === 'community' || currentTab === 'community-discover')
            ? 'text-emerald-700 font-bold'
            : 'text-stone-500'
        }`}
      >
        <span className="text-base leading-none">🌏</span>
        <span className="text-[9px]">Community</span>
      </button>

      {/* 4. Active Domain Map */}
      <button
        onClick={() => {
          if (activeDomain === 'community') {
            setCurrentTab('community-map');
          } else {
            setCurrentTab('map');
          }
        }}
        className={`flex flex-col items-center gap-0.5 p-1 ${
          currentTab === 'map' || currentTab === 'community-map' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <MapPin className="w-4 h-4" />
        <span className="text-[9px]">Map</span>
      </button>

      {/* 5. Bookings */}
      <button
        onClick={() => setCurrentTab('bookings')}
        className={`flex flex-col items-center gap-0.5 p-1 ${
          currentTab === 'bookings' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <BookmarkCheck className="w-4 h-4" />
        <span className="text-[9px]">Bookings</span>
      </button>

      {/* 6. Genesis */}
      <button
        onClick={() => setCurrentTab('genesis')}
        className={`flex flex-col items-center gap-0.5 p-1 ${
          currentTab === 'genesis' ? 'text-amber-500 font-bold' : 'text-stone-500'
        }`}
      >
        <span className="text-base leading-none">📜</span>
        <span className="text-[9px]">Genesis</span>
      </button>
    </nav>
  );
};
