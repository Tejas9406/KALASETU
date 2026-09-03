import React from 'react';
import { Home, Compass, MapPin, BookmarkCheck, Image as ImageIcon, Shield } from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  setCurrentTab,
  language
}) => {
  const t = translations[language];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-stone-200 py-2 px-3 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setCurrentTab('home')}
        className={`flex flex-col items-center gap-1 p-1 ${
          currentTab === 'home' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => setCurrentTab('discover')}
        className={`flex flex-col items-center gap-1 p-1 ${
          currentTab === 'discover' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px]">{t.discover}</span>
      </button>

      <button
        onClick={() => setCurrentTab('map')}
        className={`flex flex-col items-center gap-1 p-1 ${
          currentTab === 'map' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span className="text-[10px]">{t.mapView}</span>
      </button>

      <button
        onClick={() => setCurrentTab('gallery')}
        className={`flex flex-col items-center gap-1 p-1 ${
          currentTab === 'gallery' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <ImageIcon className="w-5 h-5" />
        <span className="text-[10px]">Gallery</span>
      </button>

      <button
        onClick={() => setCurrentTab('bookings')}
        className={`flex flex-col items-center gap-1 p-1 ${
          currentTab === 'bookings' ? 'text-[#D84315] font-bold' : 'text-stone-500'
        }`}
      >
        <BookmarkCheck className="w-5 h-5" />
        <span className="text-[10px]">Bookings</span>
      </button>

      <button
        onClick={() => setCurrentTab('govt')}
        className={`flex flex-col items-center gap-1 p-1 ${
          currentTab === 'govt' ? 'text-[#2D4A3E] font-bold' : 'text-stone-500'
        }`}
      >
        <Shield className="w-5 h-5" />
        <span className="text-[10px]">Govt</span>
      </button>
    </nav>
  );
};
