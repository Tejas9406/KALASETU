import React, { useState } from 'react';
import { MapPin, Globe, ChevronDown, Check, Sparkles, AlertCircle } from 'lucide-react';
import { UniversalLocation } from '../../types';

interface GlobalLocationSelectorProps {
  currentCountry: string; // e.g. 'IN'
  currentRegion?: string;
  onSelectCountry: (countryCode: string) => void;
  onNavigateToWorld: () => void;
  isScrolled?: boolean;
}

const GLOBAL_COUNTRIES_LIST = [
  {
    code: 'IN',
    name: 'India',
    localName: 'भारत',
    flag: '🇮🇳',
    status: 'AVAILABLE' as const,
    badgeText: 'Available',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
    description: '17+ verified craft ateliers & 12 living community traditions active'
  },
  {
    code: 'JP',
    name: 'Japan',
    localName: '日本',
    flag: '🇯🇵',
    status: 'PREVIEW' as const,
    badgeText: 'Preview',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
    description: 'Kyoto Kiyomizu-yaki pottery, Nishijin silk & Gion Matsuri'
  },
  {
    code: 'IT',
    name: 'Italy',
    localName: 'Italia',
    flag: '🇮🇹',
    status: 'PREVIEW' as const,
    badgeText: 'Preview',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
    description: 'Florence Santa Croce leather guild & Carnevale di Venezia'
  },
  {
    code: 'BR',
    name: 'Brazil',
    localName: 'Brasil',
    flag: '🇧🇷',
    status: 'COMING_SOON' as const,
    badgeText: 'Coming Soon',
    badgeColor: 'bg-stone-100 text-stone-600 border-stone-300',
    dotColor: 'bg-stone-400',
    description: 'Afro-Brazilian drumming & Capoeira living heritage'
  },
  {
    code: 'MX',
    name: 'Mexico',
    localName: 'México',
    flag: '🇲🇽',
    status: 'COMING_SOON' as const,
    badgeText: 'Coming Soon',
    badgeColor: 'bg-stone-100 text-stone-600 border-stone-300',
    dotColor: 'bg-stone-400',
    description: 'Oaxaca copal-wood carving & indigenous altar traditions'
  }
];

export const GlobalLocationSelector: React.FC<GlobalLocationSelectorProps> = ({
  currentCountry,
  currentRegion,
  onSelectCountry,
  onNavigateToWorld,
  isScrolled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selected = GLOBAL_COUNTRIES_LIST.find(c => c.code === currentCountry) || GLOBAL_COUNTRIES_LIST[0];

  return (
    <div className="relative">
      {/* Trigger Button in Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          isScrolled
            ? 'border-stone-200 text-stone-800 bg-white/90 hover:bg-stone-50 shadow-sm'
            : 'border-white/30 text-white bg-black/30 hover:bg-black/45 backdrop-blur-sm'
        }`}
        title="Universal Location Hierarchy — Global Expansion"
      >
        <span className="text-sm">{selected.flag}</span>
        <span className="font-semibold">{selected.name}</span>
        {currentRegion && (
          <span className="hidden md:inline text-stone-400 font-normal">/ {currentRegion}</span>
        )}
        <span className={`w-2 h-2 rounded-full ${selected.dotColor} shrink-0 animate-pulse`} />
        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </button>

      {/* Global Dropdown Modal */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 py-3 z-50 text-stone-800 animate-in fade-in zoom-in-95">
          <div className="px-4 pb-2 mb-2 border-b border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#D84315] block">
                Universal Location Hierarchy
              </span>
              <span className="text-xs font-serif font-bold text-stone-900">
                Global Living Heritage Network
              </span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateToWorld();
              }}
              className="text-[10px] text-[#D84315] hover:underline font-bold"
            >
              Explore All →
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto px-2 space-y-1">
            {GLOBAL_COUNTRIES_LIST.map((country) => {
              const isCurrent = country.code === currentCountry;
              return (
                <div
                  key={country.code}
                  onClick={() => {
                    onSelectCountry(country.code);
                    setIsOpen(false);
                  }}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer flex flex-col gap-1 border ${
                    isCurrent 
                      ? 'bg-[#FDFBF7] border-amber-400/80 shadow-xs' 
                      : 'hover:bg-stone-50 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{country.flag}</span>
                      <span className="font-bold text-xs text-stone-800">
                        {country.name} <span className="text-stone-400 font-normal text-[11px]">({country.localName})</span>
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${country.badgeColor} flex items-center gap-1`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${country.dotColor}`} />
                      {country.badgeText}
                    </span>
                  </div>

                  <p className="text-[10px] text-stone-500 line-clamp-1 pl-6">
                    {country.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-2 pt-2 px-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-stone-400" /> ISO 3166 Universal Standard
            </span>
            <span>Country → Region → Locality</span>
          </div>
        </div>
      )}
    </div>
  );
};
