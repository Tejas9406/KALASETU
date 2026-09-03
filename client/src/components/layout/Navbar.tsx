import React, { useState, useEffect } from 'react';
import { Globe, UserCheck, ChevronDown } from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';
import { DynamicHelpButton } from '../help/DynamicHelpButton';

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
  authenticatedUser
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

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
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-[#D84315] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            क
          </div>
          <div>
            <span className={`text-2xl font-bold tracking-tight font-serif ${isScrolled ? 'text-[#2D4A3E]' : 'text-white'}`}>
              {t.brandName}
            </span>
            <span className={`hidden sm:block text-[10px] tracking-wider uppercase font-medium ${isScrolled ? 'text-[#6D4C41]' : 'text-white/80'}`}>
              {t.brandTagline}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Uniform style across all items) */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => setCurrentTab('home')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'home' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            Home
          </button>
          <button
            id="nav-discover"
            onClick={() => setCurrentTab('discover')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'discover' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            {t.discover}
          </button>
          <button
            onClick={() => setCurrentTab('artisans')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'artisans' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            {t.artisans}
          </button>
          <button
            onClick={() => setCurrentTab('map')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'map' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            {t.mapView}
          </button>
          <button
            onClick={() => setCurrentTab('gallery')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'gallery' 
                ? 'text-[#D84315] font-bold underline underline-offset-8' 
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            {t.gallery}
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
          {/* Govt Intelligence (Identical styling to other nav links) */}
          <button
            onClick={() => setCurrentTab('govt')}
            className={`text-xs font-semibold transition-colors hover:text-[#D84315] ${
              currentTab === 'govt'
                ? 'text-[#D84315] font-bold underline underline-offset-8'
                : isScrolled ? 'text-[#2C2420]' : 'text-white'
            }`}
          >
            {t.govtDashboard}
          </button>
        </nav>

        {/* Right Tools: Dynamic Help Button, Language Selector, Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dynamic Role-Based Help Button */}
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

          {/* Quick Sign In / User Status Badge (Opens AuthModal with 1-Click Demo Switcher) */}
          {onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                authenticatedUser
                  ? 'bg-[#2D4A3E] text-white hover:bg-[#1A332A]'
                  : isScrolled
                  ? 'bg-[#D84315] text-white hover:bg-[#BF360C]'
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-stone-900 border border-white/30'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{authenticatedUser ? (authenticatedUser.name?.split(' ')[0] || 'My Account') : 'Sign In / Register'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
