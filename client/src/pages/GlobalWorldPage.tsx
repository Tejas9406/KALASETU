import React, { useState } from 'react';
import { 
  Globe, MapPin, ShieldCheck, CheckCircle2, ChevronRight, 
  ExternalLink, Sparkles, BookOpen, Layers, Info
} from 'lucide-react';
import { UNIVERSAL_LOCATION_HIERARCHY, CULTURAL_SOURCES_PROVENANCE } from '../utils/worldData';

interface GlobalWorldPageProps {
  onBackToMain: () => void;
  onSelectCountryContext: (countryCode: string) => void;
}

export const GlobalWorldPage: React.FC<GlobalWorldPageProps> = ({
  onBackToMain,
  onSelectCountryContext
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('IN');
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'sources'>('hierarchy');

  const selectedCountry = UNIVERSAL_LOCATION_HIERARCHY.find(c => c.code === selectedCountryCode) || UNIVERSAL_LOCATION_HIERARCHY[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-20">
      {/* Header Bar */}
      <div className="bg-[#1A332A] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                Global Expansion Layer • ISO 3166 Standard
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700/60 font-mono">
                Multi-Country Architecture
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              World Local Culture Network
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-2 leading-relaxed">
              Kala Setu is designed from day one as a global cultural intelligence platform. It replaces rigid national administrative assumptions with a universal hierarchy: Country → Admin Region Level 1 → Locality.
            </p>
          </div>

          <button
            onClick={onBackToMain}
            className="text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors self-start sm:self-auto"
          >
            ← Back to Platform
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'hierarchy'
                ? 'bg-[#2D4A3E] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Universal Location Hierarchy (ISO 3166)
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'sources'
                ? 'bg-[#2D4A3E] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Tier 1–5 Cultural Source Provenance
          </button>
        </div>

        {/* TAB 1: Universal Location Hierarchy */}
        {activeTab === 'hierarchy' && (
          <div className="space-y-6">
            {/* Country Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {UNIVERSAL_LOCATION_HIERARCHY.map((country) => {
                const isSelected = selectedCountryCode === country.code;
                const isAvailable = country.coverage_status === 'AVAILABLE';
                const isPreview = country.coverage_status === 'PREVIEW';
                return (
                  <div
                    key={country.code}
                    onClick={() => {
                      setSelectedCountryCode(country.code);
                      onSelectCountryContext(country.code);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#2D4A3E] bg-white shadow-md scale-[1.02]'
                        : 'border-stone-200 bg-white/60 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{country.flag_emoji}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isPreview
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-stone-100 text-stone-600 border-stone-300'
                        }`}>
                          {isAvailable ? '🟢 Active' : isPreview ? '🟡 Preview' : '⚪ Soon'}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-sm text-stone-900">
                        {country.name}
                      </h3>
                      <span className="text-[11px] text-stone-500">{country.local_name}</span>
                    </div>

                    <span className="text-[10px] font-mono text-stone-400 mt-2">
                      {country.code} • {country.admin_regions.length} Regions Active
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Country Deep-Dive Explorer */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{selectedCountry.flag_emoji}</span>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-stone-900">
                        {selectedCountry.name} ({selectedCountry.local_name})
                      </h2>
                      <span className="text-xs text-stone-500 font-mono">
                        ISO 3166-1: {selectedCountry.code} • {selectedCountry.status_label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectCountryContext(selectedCountry.code);
                      onBackToMain();
                    }}
                    className="px-4 py-2 rounded-full bg-[#2D4A3E] text-white text-xs font-bold hover:bg-[#1A332A] transition-colors"
                  >
                    Set as Active Country Context
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                {selectedCountry.description}
              </p>

              {/* Administrative Region Breakdown */}
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#D84315] block">
                  Admin Region Level 1 & Localities Hierarchy:
                </span>

                {selectedCountry.admin_regions.length === 0 ? (
                  <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center text-stone-500 text-xs">
                    Fieldwork and heritage taxonomy cataloguing currently in progress for {selectedCountry.name}. Cultural clusters will become interactive as community elder agreements finalize.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedCountry.admin_regions.map((reg) => (
                      <div key={reg.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            <span className="font-bold text-sm text-stone-900">
                              {reg.name} ({reg.local_name})
                            </span>
                            <span className="text-[10px] font-mono text-stone-400 bg-white px-2 py-0.5 rounded border border-stone-200">
                              {reg.code}
                            </span>
                          </div>
                          <span className="text-xs text-stone-500 font-mono">
                            {reg.localities.length} Localities Mapped
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                          {reg.localities.map((loc) => (
                            <div key={loc.id} className="p-3 bg-white rounded-xl border border-stone-200 flex flex-col justify-between text-xs">
                              <div>
                                <span className="font-bold text-stone-800 block text-[11px]">
                                  {loc.name} <span className="text-stone-400 font-normal">({loc.local_name})</span>
                                </span>
                                <span className="text-[10px] text-stone-500 line-clamp-2 mt-1">
                                  {loc.highlight}
                                </span>
                              </div>
                              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                                <span className={`font-bold px-1.5 py-0.5 rounded ${
                                  loc.cluster_type === 'ARTISAN_CLUSTER'
                                    ? 'bg-amber-50 text-amber-800'
                                    : loc.cluster_type === 'COMMUNITY_HERITAGE'
                                    ? 'bg-emerald-50 text-emerald-800'
                                    : 'bg-blue-50 text-blue-800'
                                }`}>
                                  {loc.cluster_type.replace('_', ' ')}
                                </span>
                                <span className="text-stone-400 font-mono">
                                  {loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Tier 1–5 Cultural Source Provenance */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#D84315] block">
                Strict Cultural Provenance Framework (Section 9.3)
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Source-Aware Cultural Intelligence
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                AI systems must never invent cultural facts. Every artisan technique, sacred ritual rule, and community tradition presented on Kala Setu is mapped to a strict Tier 1 to Tier 5 provenance hierarchy with verified citations and open licenses.
              </p>
            </div>

            <div className="space-y-4">
              {CULTURAL_SOURCES_PROVENANCE.map((tier) => (
                <div key={tier.tier} className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center font-mono">
                        T{tier.tier}
                      </span>
                      <h3 className="font-bold text-sm text-stone-900 font-serif">
                        {tier.tier_name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">
                      Tier {tier.tier} Weight in RAG Scoring
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {tier.sources.map((src) => (
                      <div key={src.name} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-stone-800 block text-[11px] mb-0.5">
                            {src.name}
                          </span>
                          <span className="text-stone-600 text-[11px] leading-relaxed">
                            {src.role}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                          <span className="text-emerald-700 font-bold font-mono">
                            Confidence: {src.confidence}
                          </span>
                          <span className="text-stone-400">License: CC-BY-SA 4.0</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
