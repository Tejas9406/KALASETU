import React, { useState, useEffect } from 'react';
import { Globe, UserCheck, ChevronDown, Sparkles, Network, Compass, BookOpen } from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';
import { DynamicHelpButton } from '../help/DynamicHelpButton';
import { GlobalLocationSelector } from '../world/GlobalLocationSelector';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentRole: 'tourist' | 'artisan' | 'govt';
  setCurrentRole: (role: 'tourist' | 'artisan' | 'govt') => void;
  onOpenRegisterModal: () => void;
  onOpenAuthModal?: () => void;
  authenticatedUser?: any;
  activeDomain: 'gateway' | 'artisan' | 'community' | 'genesis' | 'world';
  onChangeDomain: (domain: 'gateway' | 'artisan' | 'community') => void;
  currentCountry: string;
  onChangeCountry: (countryCode: string) => void;
  onOpenArtisanAISuite?: () => void;
  onOpenCommunityAISuite?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  currentRole,
  setCurrentRole,
  onOpenRegisterModal,
  onOpenAuthModal,
  authenticatedUser,
  activeDomain,
  onChangeDomain,
  currentCountry,
  onChangeCountry,
  onOpenArtisanAISuite,
  onOpenCommunityAISuite
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languagesList: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(45,74,62,0.08)] py-2.5 border-b border-[#2D4A3E]/10'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Brand Logo & World Switcher Bar */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => setCurrentTab('gateway')}
            className="flex items-center gap-2.5 cursor-pointer group"
            title="Kala Setu 2.0 Main Gateway"
          >
            <div className="w-9 h-9 rounded-2xl bg-[#D84315] flex items-center justify-center text-white font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              क
            </div>
            <div>
              <span className={`text-xl font-bold tracking-tight font-serif ${isScrolled ? 'text-[#2D4A3E]' : 'text-white'}`}>
                KALA SETU
              </span>
              <span className={`hidden sm:block text-[9px] tracking-wider uppercase font-semibold ${isScrolled ? 'text-[#D84315]' : 'text-amber-300'}`}>
                2.0 Cultural Intelligence
              </span>
            </div>
          </div>

          {/* Domain World Switcher Pill (Section 1.1 & 2) */}
          <div className="hidden md:flex items-center p-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-xs">
            <button
              onClick={() => {
                onChangeDomain('artisan');
                setCurrentTab('home');
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
                activeDomain === 'artisan'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : isScrolled ? 'text-stone-700 hover:text-stone-900' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>🧑‍🎨</span>
              <span>Artisans</span>
            </button>
            <button
              onClick={() => {
                onChangeDomain('community');
                setCurrentTab('community');
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
                activeDomain === 'community'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : isScrolled ? 'text-stone-700 hover:text-stone-900' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>🌏</span>
              <span>Community</span>
            </button>
          </div>

          {/* Global Location Selector (Universal Hierarchy ISO 3166) */}
          <div className="hidden lg:block">
            <GlobalLocationSelector
              currentCountry={currentCountry}
              onSelectCountry={onChangeCountry}
              onNavigateToWorld={() => setCurrentTab('world')}
              isScrolled={isScrolled}
            />
          </div>
        </div>

        {/* Dynamic Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5">
          {activeDomain === 'community' ? (
            <>
              <button
                onClick={() => setCurrentTab('community')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'community' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Community Home
              </button>
              <button
                onClick={() => setCurrentTab('community-discover')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'community-discover' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Living Traditions
              </button>
              <button
                onClick={() => setCurrentTab('community-map')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'community-map' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Culture Map
              </button>
              {onOpenCommunityAISuite && (
                <button
                  onClick={onOpenCommunityAISuite}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50"
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Heritage AI</span>
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentTab('home')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'home' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Artisans Home
              </button>
              <button
                onClick={() => setCurrentTab('discover')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'discover' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Craft Workshops
              </button>
              <button
                onClick={() => setCurrentTab('artisans')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'artisans' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Master Artisans
              </button>
              <button
                onClick={() => setCurrentTab('map')}
                className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
                  currentTab === 'map' 
                    ? 'text-[#D84315] font-bold underline underline-offset-8' 
                    : isScrolled ? 'text-[#2C2420]' : 'text-white'
                }`}
              >
                Artisan Map
              </button>
              {onOpenArtisanAISuite && (
                <button
                  onClick={onOpenArtisanAISuite}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-700/50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisan AI</span>
                </button>
              )}
            </>
          )}

          {/* Shared Links */}
          <button
            onClick={() => setCurrentTab('genesis')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'genesis' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            Genesis
          </button>
          <button
            onClick={() => setCurrentTab('world')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'world' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            Global World
          </button>
          <button
            onClick={() => setCurrentTab('bookings')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'bookings' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            {t.myBookings}
          </button>
          <button
            onClick={() => setCurrentTab('govt')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'govt'
                ? 'text-[#D84315] font-bold underline underline-offset-8'
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            Govt
          </button>
        </nav>

        {/* Right Tools: Dynamic Help, Language, Account */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <DynamicHelpButton
            currentRole={currentRole}
            language={language}
          />

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isScrolled
                  ? 'border-stone-300 text-stone-800 bg-stone-50 hover:bg-stone-100'
                  : 'border-white/30 text-white bg-black/20 hover:bg-black/40'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{languagesList.find(l => l.code === language)?.native}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 text-stone-800 animate-in fade-in">
                {languagesList.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-[#F5F0E6] ${
                      language === item.code ? 'font-bold text-[#D84315] bg-[#F5F0E6]' : ''
                    }`}
                  >
                    <span>{item.native}</span>
                    <span className="text-[10px] text-stone-400">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign In / User Status Badge */}
          {onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                authenticatedUser
                  ? 'bg-[#2D4A3E] text-white hover:bg-[#1A332A]'
                  : isScrolled
                  ? 'bg-[#D84315] text-white hover:bg-[#BF360C]'
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-stone-900 border border-white/30'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{authenticatedUser ? (authenticatedUser.name?.split(' ')[0] || 'My Account') : 'Sign In'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
