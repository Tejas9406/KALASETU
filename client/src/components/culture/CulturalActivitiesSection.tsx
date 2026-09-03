import React, { useState } from 'react';
import { Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { CulturalExperience } from '../../types';
import { SupportedLanguage } from '../../utils/translations';

interface CulturalActivitiesSectionProps {
  culturalExperiences: CulturalExperience[];
  language: SupportedLanguage;
  onSelectExperience?: (exp: CulturalExperience) => void;
}

const CULTURE_UI: Record<SupportedLanguage, {
  badge: string; heading: string; subheading: string;
  catAll: string; catWellness: string; catFestival: string; catFolk: string; catTribal: string;
  inspect: string; close: string; background: string; custodians: string; season: string; significance: string;
}> = {
  en: {
    badge: 'Cultural Activities & Community Experiences (PS-TUR05)',
    heading: 'Living Cultural Traditions & Sacred Rituals',
    subheading: "Beyond mastercraft ateliers, discover India's ancient community practices, indigenous healing lineages, sacred temple palanquin dances, and seasonal tribal celebrations.",
    catAll: 'All Traditions', catWellness: 'Indigenous Wellness & Healing',
    catFestival: 'Living Village Festivals', catFolk: 'Folk & Devotional Arts', catTribal: 'Indigenous Tribal Customs',
    inspect: 'Explore Tradition', close: 'Close & Explore More',
    background: 'Living Heritage Background', custodians: 'Custodians / Lineage:',
    season: 'Observance Season:', significance: 'Cultural Significance:'
  },
  hi: {
    badge: 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¤¾à¤ à¤”à¤° à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤…à¤¨à¥à¤­à¤µ (PS-TUR05)',
    heading: 'à¤œà¥€à¤µà¤‚à¤¤ à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤ªà¤°à¤‚à¤ªà¤°à¤¾à¤à¤‚ à¤”à¤° à¤ªà¤µà¤¿à¤¤à¥à¤° à¤…à¤¨à¥à¤·à¥à¤ à¤¾à¤¨',
    subheading: 'à¤¶à¤¿à¤²à¥à¤ªà¤•à¤²à¤¾ à¤•à¥‡ à¤…à¤²à¤¾à¤µà¤¾, à¤­à¤¾à¤°à¤¤ à¤•à¥€ à¤ªà¥à¤°à¤¾à¤šà¥€à¤¨ à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤ªà¤°à¤‚à¤ªà¤°à¤¾à¤“à¤‚, à¤†à¤¦à¤¿à¤µà¤¾à¤¸à¥€ à¤‰à¤¤à¥à¤¸à¤µà¥‹à¤‚ à¤”à¤° à¤ªà¤µà¤¿à¤¤à¥à¤° à¤²à¥‹à¤• à¤¨à¥ƒà¤¤à¥à¤¯à¥‹à¤‚ à¤•à¤¾ à¤…à¤¨à¥à¤­à¤µ à¤•à¤°à¥‡à¤‚à¥¤',
    catAll: 'à¤¸à¤­à¥€ à¤ªà¤°à¤‚à¤ªà¤°à¤¾à¤à¤‚', catWellness: 'à¤¸à¥à¤µà¤¦à¥‡à¤¶à¥€ à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯ à¤”à¤° à¤‰à¤ªà¤šà¤¾à¤°',
    catFestival: 'à¤—à¥à¤°à¤¾à¤®à¥€à¤£ à¤œà¥€à¤µà¤‚à¤¤ à¤‰à¤¤à¥à¤¸à¤µ', catFolk: 'à¤²à¥‹à¤• à¤”à¤° à¤­à¤•à¥à¤¤à¤¿ à¤•à¤²à¤¾à¤à¤‚', catTribal: 'à¤†à¤¦à¤¿à¤µà¤¾à¤¸à¥€ à¤°à¥€à¤¤à¤¿-à¤°à¤¿à¤µà¤¾à¤œ',
    inspect: 'à¤ªà¤°à¤‚à¤ªà¤°à¤¾ à¤œà¤¾à¤¨à¥‡à¤‚', close: 'à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚',
    background: 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤ªà¥ƒà¤·à¥à¤ à¤­à¥‚à¤®à¤¿', custodians: 'à¤¸à¤‚à¤°à¤•à¥à¤·à¤• / à¤µà¤‚à¤¶à¤¾à¤µà¤²à¥€:',
    season: 'à¤†à¤¯à¥‹à¤œà¤¨ à¤®à¥Œà¤¸à¤®:', significance: 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤®à¤¹à¤¤à¥à¤µ:'
  },
  mr: {
    badge: 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤‰à¤ªà¤•à¥à¤°à¤® à¤†à¤£à¤¿ à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤…à¤¨à¥à¤­à¤µ (PS-TUR05)',
    heading: 'à¤œà¤¿à¤µà¤‚à¤¤ à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤ªà¤°à¤‚à¤ªà¤°à¤¾ à¤†à¤£à¤¿ à¤ªà¤µà¤¿à¤¤à¥à¤° à¤µà¤¿à¤§à¥€',
    subheading: 'à¤¹à¤¸à¥à¤¤à¤•à¤²à¥‡à¤šà¥à¤¯à¤¾ à¤ªà¤²à¥€à¤•à¤¡à¥‡, à¤­à¤¾à¤°à¤¤à¤¾à¤šà¥à¤¯à¤¾ à¤ªà¥à¤°à¤¾à¤šà¥€à¤¨ à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤ªà¤°à¤‚à¤ªà¤°à¤¾, à¤²à¥‹à¤•à¤¨à¥ƒà¤¤à¥à¤¯ à¤†à¤£à¤¿ à¤†à¤¦à¤¿à¤µà¤¾à¤¸à¥€ à¤‰à¤¤à¥à¤¸à¤µ à¤…à¤¨à¥à¤­à¤µà¤¾à¥¤',
    catAll: 'à¤¸à¤°à¥à¤µ à¤ªà¤°à¤‚à¤ªà¤°à¤¾', catWellness: 'à¤¸à¥à¤¥à¤¾à¤¨à¤¿à¤• à¤†à¤°à¥‹à¤—à¥à¤¯ à¤µ à¤‰à¤ªà¤šà¤¾à¤°',
    catFestival: 'à¤—à¥à¤°à¤¾à¤®à¥€à¤£ à¤œà¤¿à¤µà¤‚à¤¤ à¤‰à¤¤à¥à¤¸à¤µ', catFolk: 'à¤²à¥‹à¤• à¤µ à¤­à¤•à¥à¤¤à¥€ à¤•à¤²à¤¾', catTribal: 'à¤†à¤¦à¤¿à¤µà¤¾à¤¸à¥€ à¤°à¥€à¤¤à¤¿à¤°à¤¿à¤µà¤¾à¤œ',
    inspect: 'à¤ªà¤°à¤‚à¤ªà¤°à¤¾ à¤ªà¤¾à¤¹à¤¾', close: 'à¤¬à¤‚à¤¦ à¤•à¤°à¤¾',
    background: 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤ªà¤¾à¤°à¥à¤¶à¥à¤µà¤­à¥‚à¤®à¥€', custodians: 'à¤¸à¤‚à¤°à¤•à¥à¤·à¤• / à¤µà¤‚à¤¶à¤¾à¤µà¤³:',
    season: 'à¤†à¤¯à¥‹à¤œà¤¨ à¤•à¤¾à¤³:', significance: 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤®à¤¹à¤¤à¥à¤¤à¥à¤µ:'
  },
  ta: {
    badge: 'à®•à®²à®¾à®šà¯à®šà®¾à®° à®¨à®Ÿà®µà®Ÿà®¿à®•à¯à®•à¯ˆà®•à®³à¯ & à®šà®®à¯‚à®• à®…à®©à¯à®ªà®µà®™à¯à®•à®³à¯ (PS-TUR05)',
    heading: 'à®‰à®¯à®¿à®°à¯‹à®Ÿà¯à®Ÿà®®à®¾à®© à®•à®²à®¾à®šà¯à®šà®¾à®° à®®à®°à®ªà¯à®•à®³à¯',
    subheading: 'à®‡à®¨à¯à®¤à®¿à®¯à®¾à®µà®¿à®©à¯ à®ªà®£à¯à®Ÿà¯ˆà®¯ à®šà®®à¯‚à®• à®®à®°à®ªà¯à®•à®³à¯, à®¨à®¾à®Ÿà¯à®Ÿà¯à®ªà¯à®ªà¯à®± à®•à®²à¯ˆà®•à®³à¯ à®®à®±à¯à®±à¯à®®à¯ à®ªà®´à®™à¯à®•à¯à®Ÿà®¿ à®•à¯Šà®£à¯à®Ÿà®¾à®Ÿà¯à®Ÿà®™à¯à®•à®³à¯ˆ à®…à®±à®¿à®¨à¯à®¤à¯à®•à¯Šà®³à¯à®³à¯à®™à¯à®•à®³à¯.',
    catAll: 'à®…à®©à¯ˆà®¤à¯à®¤à¯ à®®à®°à®ªà¯à®•à®³à¯', catWellness: 'à®¨à®¾à®Ÿà¯à®Ÿà¯à®ªà¯à®ªà¯à®± à®®à®°à¯à®¤à¯à®¤à¯à®µà®®à¯',
    catFestival: 'à®•à®¿à®°à®¾à®® à®µà®¿à®´à®¾à®•à¯à®•à®³à¯', catFolk: 'à®¨à®¾à®Ÿà¯à®Ÿà¯à®ªà¯à®ªà¯à®± à®•à®²à¯ˆà®•à®³à¯', catTribal: 'à®ªà®´à®™à¯à®•à¯à®Ÿà®¿ à®µà®´à®•à¯à®•à®™à¯à®•à®³à¯',
    inspect: 'à®®à®°à®ªà¯ à®•à®¾à®£à¯à®•', close: 'à®®à¯‚à®Ÿà¯',
    background: 'à®•à®²à®¾à®šà¯à®šà®¾à®° à®ªà®¿à®©à¯à®©à®£à®¿', custodians: 'à®•à®¾à®ªà¯à®ªà®¾à®³à®°à¯à®•à®³à¯:',
    season: 'à®•à¯Šà®£à¯à®Ÿà®¾à®Ÿà¯à®Ÿ à®ªà®°à¯à®µà®®à¯:', significance: 'à®•à®²à®¾à®šà¯à®šà®¾à®° à®®à¯à®•à¯à®•à®¿à®¯à®¤à¯à®¤à¯à®µà®®à¯:'
  },
  te: {
    badge: 'à°¸à°¾à°‚à°¸à±à°•à±ƒà°¤à°¿à°• à°•à°¾à°°à±à°¯à°•à±à°°à°®à°¾à°²à± & à°¸à°®à°¾à°œ à°…à°¨à±à°­à°µà°¾à°²à± (PS-TUR05)',
    heading: 'à°œà±€à°µà°‚à°¤à°®à±ˆà°¨ à°¸à°¾à°‚à°¸à±à°•à±ƒà°¤à°¿à°• à°¸à°‚à°ªà±à°°à°¦à°¾à°¯à°¾à°²à±',
    subheading: 'à°­à°¾à°°à°¤à°¦à±‡à°¶ à°ªà±à°°à°¾à°¤à°¨ à°¸à°®à°¾à°œ à°ªà°¦à±à°§à°¤à±à°²à±, à°œà°¾à°¨à°ªà°¦ à°¨à±ƒà°¤à±à°¯à°¾à°²à± à°®à°°à°¿à°¯à± à°—à°¿à°°à°¿à°œà°¨ à°µà±‡à°¡à±à°•à°²à°¨à± à°…à°¨à±à°­à°µà°¿à°‚à°šà°‚à°¡à°¿.',
    catAll: 'à°…à°¨à±à°¨à°¿ à°¸à°‚à°ªà±à°°à°¦à°¾à°¯à°¾à°²à±', catWellness: 'à°¸à±à°µà°¦à±‡à°¶à±€ à°µà±ˆà°¦à±à°¯à°‚',
    catFestival: 'à°—à±à°°à°¾à°® à°‰à°¤à±à°¸à°µà°¾à°²à±', catFolk: 'à°œà°¾à°¨à°ªà°¦ & à°­à°•à±à°¤à°¿ à°•à°³à°²à±', catTribal: 'à°—à°¿à°°à°¿à°œà°¨ à°†à°šà°¾à°°à°¾à°²à±',
    inspect: 'à°¸à°‚à°ªà±à°°à°¦à°¾à°¯à°‚ à°šà±‚à°¡à°‚à°¡à°¿', close: 'à°®à±‚à°¸à°¿à°µà±‡à°¯à°¿',
    background: 'à°¸à°¾à°‚à°¸à±à°•à±ƒà°¤à°¿à°• à°¨à±‡à°ªà°¥à±à°¯à°‚', custodians: 'à°¸à°‚à°°à°•à±à°·à°•à±à°²à±:',
    season: 'à°‰à°¤à±à°¸à°µ à°•à°¾à°²à°‚:', significance: 'à°¸à°¾à°‚à°¸à±à°•à±ƒà°¤à°¿à°• à°ªà±à°°à°¾à°®à±à°–à±à°¯à°¤:'
  },
  bn: {
    badge: 'à¦¸à¦¾à¦‚à¦¸à§à¦•à§ƒà¦¤à¦¿à¦• à¦•à¦¾à¦°à§à¦¯à¦•à§à¦°à¦® à¦“ à¦¸à¦¾à¦®à¦¾à¦œà¦¿à¦• à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ (PS-TUR05)',
    heading: 'à¦œà§€à¦¬à¦¨à§à¦¤ à¦¸à¦¾à¦‚à¦¸à§à¦•à§ƒà¦¤à¦¿à¦• à¦à¦¤à¦¿à¦¹à§à¦¯ à¦“ à¦ªà¦¬à¦¿à¦¤à§à¦° à¦†à¦šà¦¾à¦°',
    subheading: 'à¦­à¦¾à¦°à¦¤à§‡à¦° à¦ªà§à¦°à¦¾à¦šà§€à¦¨ à¦¸à¦¾à¦®à¦¾à¦œà¦¿à¦• à¦ªà§à¦°à¦¥à¦¾, à¦²à§‹à¦•à¦¨à§ƒà¦¤à§à¦¯ à¦à¦¬à¦‚ à¦†à¦¦à¦¿à¦¬à¦¾à¦¸à§€ à¦‰à§Žà¦¸à¦¬à¦—à§à¦²à¦¿ à¦†à¦¬à¦¿à¦·à§à¦•à¦¾à¦° à¦•à¦°à§à¦¨à¥¤',
    catAll: 'à¦¸à¦¬ à¦à¦¤à¦¿à¦¹à§à¦¯', catWellness: 'à¦¸à§à¦¥à¦¾à¦¨à§€à¦¯à¦¼ à¦¸à§à¦¬à¦¾à¦¸à§à¦¥à§à¦¯à¦šà¦°à§à¦šà¦¾',
    catFestival: 'à¦—à§à¦°à¦¾à¦®à§€à¦£ à¦‰à§Žà¦¸à¦¬', catFolk: 'à¦²à§‹à¦• à¦“ à¦­à¦•à§à¦¤à¦¿ à¦¶à¦¿à¦²à§à¦ª', catTribal: 'à¦†à¦¦à¦¿à¦¬à¦¾à¦¸à§€ à¦°à§€à¦¤à¦¿à¦¨à§€à¦¤à¦¿',
    inspect: 'à¦à¦¤à¦¿à¦¹à§à¦¯ à¦¦à§‡à¦–à§à¦¨', close: 'à¦¬à¦¨à§à¦§ à¦•à¦°à§à¦¨',
    background: 'à¦¸à¦¾à¦‚à¦¸à§à¦•à§ƒà¦¤à¦¿à¦• à¦ªà¦Ÿà¦­à§‚à¦®à¦¿', custodians: 'à¦¸à¦‚à¦°à¦•à§à¦·à¦• / à¦¬à¦‚à¦¶:',
    season: 'à¦‰à§Žà¦¸à¦¬à§‡à¦° à¦®à§Œà¦¸à§à¦®:', significance: 'à¦¸à¦¾à¦‚à¦¸à§à¦•à§ƒà¦¤à¦¿à¦• à¦¤à¦¾à§Žà¦ªà¦°à§à¦¯:'
  }
};

export const CulturalActivitiesSection: React.FC<CulturalActivitiesSectionProps> = ({
  culturalExperiences,
  language,
  onSelectExperience
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedCulture, setSelectedCulture] = useState<CulturalExperience | null>(null);
  const ui = CULTURE_UI[language] || CULTURE_UI.en;

  const categories = [
    { id: 'ALL', label: ui.catAll },
    { id: 'Community Medicine', label: ui.catWellness },
    { id: 'Seasonal Festival', label: ui.catFestival },
    { id: 'Folk Heritage', label: ui.catFolk },
    { id: 'Tribal Customs', label: ui.catTribal }
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
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#D84315] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{ui.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A3E] tracking-tight leading-tight">
              {ui.heading}
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
              {ui.subheading}
            </p>
          </div>

          {/* Categories Pill Bar â€” wraps in Tamil/long text */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
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
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#D84315] text-white text-[11px] font-bold shadow-md tracking-wide">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white text-[11px] flex items-center justify-between">
                  <span className="font-semibold truncate">{item.tradition_name}</span>
                  <span className="text-amber-300 font-bold shrink-0 ml-2">â˜… {item.trust_score || 98}%</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D84315]" />
                    <span>{item.location_name} â€¢ {item.district}, {item.state}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 line-clamp-2 group-hover:text-[#2D4A3E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-[11px] text-stone-500">
                    <span className="font-bold text-stone-700 block">{item.community_custodians || 'Traditional Guild'}</span>
                    <span>{item.season || 'Year-round'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCulture(item)}
                    className="px-3 py-1.5 rounded-full bg-[#2D4A3E] hover:bg-[#1A332A] text-white text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
                  >
                    <span>{ui.inspect}</span>
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
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
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
                âœ•
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 to-transparent p-4 rounded-b-3xl text-white">
                <span className="px-2.5 py-1 rounded-full bg-[#D84315] text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                  {selectedCulture.category}
                </span>
                <h3 className="text-2xl font-serif font-bold">{selectedCulture.title}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-200 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{selectedCulture.location_name} â€¢ {selectedCulture.district}, {selectedCulture.state}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 uppercase text-xs tracking-wider mb-1 text-[#2D4A3E]">
                  {ui.background}
                </h4>
                <p className="leading-relaxed text-stone-600">{selectedCulture.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-500 block">{ui.custodians}</span>
                  <span className="font-bold text-stone-800">{selectedCulture.community_custodians}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">{ui.season}</span>
                  <span className="font-bold text-[#D84315]">{selectedCulture.season}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-200">
                  <span className="text-stone-500 block">{ui.significance}</span>
                  <span className="font-medium text-stone-800">{selectedCulture.significance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Living Heritage â€¢ PS-TUR05</span>
                </div>
                <button
                  onClick={() => setSelectedCulture(null)}
                  className="px-5 py-2.5 rounded-full bg-[#2D4A3E] text-white font-bold text-xs hover:bg-[#1A332A] transition-colors"
                >
                  {ui.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
