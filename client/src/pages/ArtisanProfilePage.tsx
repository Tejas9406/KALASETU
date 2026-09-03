import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Award, ShieldCheck, Star, 
  Calendar, CheckCircle, Volume2, Mic, Sparkles, Phone 
} from 'lucide-react';
import { Artisan, Experience } from '../types';
import { SupportedLanguage, translations } from '../utils/translations';

interface ArtisanProfilePageProps {
  artisan: Artisan;
  onBack: () => void;
  onSelectExperience: (exp: Experience) => void;
  language: SupportedLanguage;
}

export const ArtisanProfilePage: React.FC<ArtisanProfilePageProps> = ({
  artisan,
  onBack,
  onSelectExperience,
  language
}) => {
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const t = translations[language];

  // Text to Speech for artisan narrative
  const handlePlayStory = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingStory) {
        window.speechSynthesis.cancel();
        setIsPlayingStory(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(artisan.story || artisan.bio);
        utterance.rate = 0.92;
        utterance.onend = () => setIsPlayingStory(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingStory(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#D84315] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Discovery</span>
      </button>

      {/* Hero Artisan Banner */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden mb-10">
        {/* Cover Pattern Header */}
        <div className="h-44 sm:h-56 bg-gradient-to-r from-[#2D4A3E] to-[#1A332A] relative flex items-end p-6 sm:p-8">
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase border border-white/20">
              {artisan.craft_type}
            </span>
            {artisan.gi_certified && (
              <span className="bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                GI Tagged
              </span>
            )}
          </div>
        </div>

        {/* Profile Card Overlay */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-5">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FDFBF7] p-1.5 shadow-xl shrink-0">
                <div className="w-full h-full rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-serif text-3xl font-bold overflow-hidden border-2 border-[#D84315]">
                  {artisan.photo_url ? (
                    <img src={artisan.photo_url} alt={artisan.artisan_name} className="w-full h-full object-cover" />
                  ) : (
                    artisan.artisan_name.charAt(0)
                  )}
                </div>
              </div>
              <div className="pb-2">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D4A3E]">
                  {artisan.artisan_name}
                </h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 mt-1">
                  <MapPin className="w-4 h-4 text-[#D84315]" />
                  <span>{artisan.district}, {artisan.state}</span>
                  <span>•</span>
                  <span>{artisan.years_experience}+ Years of Hereditary Craft</span>
                </div>
              </div>
            </div>

            {/* Trust Score Highlight */}
            <div className="bg-[#F5F0E6] p-4 rounded-2xl border border-stone-200 flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-bold text-lg">
                {artisan.trust_score}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Trust Rating</span>
                <span className="text-sm font-bold text-[#2D4A3E]">Government ID & Skill Verified</span>
              </div>
            </div>
          </div>

          {/* Badges Ribbon */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="bg-emerald-50 text-emerald-800 font-semibold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              National Artisan Registry ID: {artisan.id}
            </span>
            {artisan.women_led && (
              <span className="bg-rose-50 text-rose-800 font-semibold px-3 py-1 rounded-full border border-rose-200">
                👩 Women-Led Craft Guild
              </span>
            )}
            {artisan.elderly_friendly && (
              <span className="bg-amber-50 text-amber-800 font-semibold px-3 py-1 rounded-full border border-amber-200">
                👴 Senior Master Artisan
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Narrative & Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A3E]">
              The Artisan's Living Story
            </h2>
            <button
              onClick={handlePlayStory}
              className="flex items-center gap-2 bg-[#F5F0E6] hover:bg-[#EAE2D2] text-[#2D4A3E] font-bold text-xs px-4 py-2 rounded-full border border-stone-200 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingStory ? 'Pause Audio Story' : 'Listen to Voice Story'}</span>
            </button>
          </div>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {artisan.story || artisan.bio}
          </p>

          {/* Multi-point Verification Breakdown */}
          <div className="mt-8 pt-6 border-t border-stone-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4">
              Kala Setu Trust Verification Matrix:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="font-bold text-[#2D4A3E] text-sm mb-1">1. Identity Verification</div>
                <div className="text-xs text-stone-600">Aadhaar & Artisan Pehchan Card verified.</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="font-bold text-[#2D4A3E] text-sm mb-1">2. Skill Authenticity</div>
                <div className="text-xs text-stone-600">Ancestral lineage & atelier inspection approved.</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="font-bold text-[#2D4A3E] text-sm mb-1">3. Direct Remuneration</div>
                <div className="text-xs text-stone-600">Zero middleman deduction guarantee.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Workshop Stats */}
        <div className="bg-[#F5F0E6] rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#2D4A3E]">
            Atelier Details
          </h3>

          <div className="space-y-3 text-xs text-stone-700">
            <div>
              <span className="text-stone-400 block uppercase font-bold">Region & District:</span>
              <span className="font-semibold text-sm">{artisan.district}, {artisan.state}</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-bold">Years Practicing:</span>
              <span className="font-semibold text-sm">{artisan.years_experience} Years</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-bold">GI Registration Status:</span>
              <span className="font-semibold text-sm">{artisan.gi_certified ? 'Certified GI Custodian' : 'Traditional Guild Member'}</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="font-bold text-[#D84315]">Direct Support Guarantee</div>
            <p>
              When you book with this artisan, 100% of the workshop fee goes straight to their bank account.
            </p>
          </div>
        </div>
      </div>

      {/* Bookable Experiences from this Artisan */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A3E] mb-6">
          Workshops Hosted by {artisan.artisan_name}
        </h2>

        {artisan.experiences && artisan.experiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artisan.experiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => onSelectExperience(exp)}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-6 items-center"
              >
                <img
                  src={exp.cover_image}
                  alt={exp.title}
                  className="w-full sm:w-40 h-36 rounded-2xl object-cover shrink-0"
                  onError={(e: any) => {
                    e.target.src = '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-base text-[#2D4A3E] line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                    {exp.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-serif font-bold text-[#D84315]">
                      ₹{exp.price_inr}
                    </span>
                    <span className="text-xs font-bold text-[#2D4A3E] hover:underline">
                      Book Seat →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center text-stone-500 text-sm">
            Workshops for this artisan are in active scheduling. Please check back shortly.
          </div>
        )}
      </div>
    </div>
  );
};
