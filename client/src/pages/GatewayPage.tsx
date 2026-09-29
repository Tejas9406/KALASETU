import React from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Compass, 
  MapPin, Heart, BookOpen, Globe, Award, ChevronRight, Activity, Network
} from 'lucide-react';

interface GatewayPageProps {
  onEnterArtisanWorld: () => void;
  onEnterCommunityWorld: () => void;
  onNavigateToGenesis: () => void;
  onNavigateToWorld: () => void;
  onNavigateToGovt: () => void;
}

export const GatewayPage: React.FC<GatewayPageProps> = ({
  onEnterArtisanWorld,
  onEnterCommunityWorld,
  onNavigateToGenesis,
  onNavigateToWorld,
  onNavigateToGovt
}) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col justify-between pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Gateway Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[#D84315] text-xs font-bold uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kala Setu 2.0 • Dual-Domain Global Cultural Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#2D4A3E] mb-4">
            Two Intelligent Worlds. <br className="hidden sm:inline" />
            One Living Heritage Platform.
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Choose your journey: Step into the masterclass ateliers of <strong className="text-stone-800">Local Artisans</strong> to learn ancestral crafts, or immerse into living <strong className="text-stone-800">Community Experiences</strong> to celebrate festivals, folk arts, and sacred rituals.
          </p>
        </div>

        {/* Dual-Door Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full mb-12">
          {/* World 1: Local Artisans */}
          <div 
            onClick={onEnterArtisanWorld}
            className="group relative bg-white rounded-3xl overflow-hidden border-2 border-amber-900/10 hover:border-amber-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
              <img
                src="/assets/images/Home page/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg"
                alt="Local Artisans Craft Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <span>🧑‍🎨</span>
                  <span>World 1</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest block mb-0.5">
                  People • Craft • Skill • Making
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Local Artisans
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Connect directly with verified master craftspeople across vegetable-tanned leathercraft, royal Chanderi pit-loom silk, Majuli riverbed bamboo masks, and Kashmir walnut wood relief.
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Pehchan &amp; GI Tag Evidence Verification</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Activity className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Multimodal Craft Vision &amp; Kinematic Pose AI</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Heart className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>96%+ Direct Fee Settlement (Zero Middleman Deductions)</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400">17+ Active Master Guilds</span>
                <span className="bg-[#2D4A3E] group-hover:bg-[#1A332A] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm group-hover:gap-2.5">
                  <span>Enter Artisan World</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* World 2: Community Experiences */}
          <div 
            onClick={onEnterCommunityWorld}
            className="group relative bg-white rounded-3xl overflow-hidden border-2 border-emerald-900/10 hover:border-emerald-600 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
              <img
                src="/assets/images/Culture/Palakhinrutya_-_Dance_of_Palanquin_of_Village_Dities_-_Shimagotsav_in_Kokan_-_Maharashtra.jpg"
                alt="Community Cultural Living Heritage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-700/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <span>🌏</span>
                  <span>World 2</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-widest block mb-0.5">
                  People • Place • Culture • Living Heritage
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Community Experiences
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Experience living community heritage: Kokan Shimga Palakhi palanquin dances, sacred Dhunuchi aartis in Kolkata, Bhil harvest Bhagoria carnivals, and Vedic solar riverbed rituals.
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Community-Approved Respect Protocols &amp; Guidelines</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Network className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Cultural Knowledge Graph (GraphRAG Traversal)</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>UNESCO Sustainable Crowd Load Balancing</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400">12 Living Traditions Active</span>
                <span className="bg-[#2D4A3E] group-hover:bg-[#1A332A] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm group-hover:gap-2.5">
                  <span>Enter Community World</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Network, Genesis & Govt Action Trio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
          <div 
            onClick={onNavigateToGenesis}
            className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 hover:border-amber-500/60 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600/30 text-amber-400 flex items-center justify-center font-bold">
                📜
              </div>
              <div>
                <span className="text-xs font-serif font-bold block group-hover:text-amber-300 transition-colors">
                  Genesis Module
                </span>
                <span className="text-[10px] text-stone-400">
                  Proof of Engineering &amp; Fieldwork
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          <div 
            onClick={onNavigateToWorld}
            className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 hover:border-emerald-500/60 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold">
                🌐
              </div>
              <div>
                <span className="text-xs font-serif font-bold block group-hover:text-emerald-300 transition-colors">
                  World Network
                </span>
                <span className="text-[10px] text-stone-400">
                  Universal Hierarchy (ISO 3166)
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          <div 
            onClick={onNavigateToGovt}
            className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 hover:border-blue-500/60 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold">
                🏛️
              </div>
              <div>
                <span className="text-xs font-serif font-bold block group-hover:text-blue-300 transition-colors">
                  Govt Dashboard
                </span>
                <span className="text-[10px] text-stone-400">
                  National Analytics &amp; SOS Dispatch
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};
