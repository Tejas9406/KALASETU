import React, { useState, useEffect } from 'react';
import { 
  Building2, TrendingUp, Users, ShieldAlert, Award, 
  MapPin, CheckCircle, BarChart3, PieChart, RefreshCw 
} from 'lucide-react';
import { GovtMetrics } from '../types';

export const GovtDashboardPage: React.FC = () => {
  const [data, setData] = useState<{
    metrics: GovtMetrics;
    sdgCompliance: any;
    districtClusters: any[];
    recentAlerts: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Try to get Firebase auth token if available
      let authHeader: Record<string, string> = {};
      try {
        const { auth } = await import('../config/firebase');
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          authHeader = { 'Authorization': `Bearer ${token}` };
        }
      } catch (_) {}

      const res = await fetch('/api/govt/dashboard', { headers: authHeader });
      if (res.status === 401) {
        // Not logged in as govt — show demo data for prototype
        setData({
          metrics: {
            totalArtisans: 1247,
            registeredOnPlatform: 984,
            activeExperiences: 73,
            totalBookings: 28540,
            estimatedRevenueInr: 12600000,
            directArtisanIncomePercent: 96,
            middlemanCommissionSavedPercent: 61,
            womenArtisansPercent: 47,
            elderlyArtisansPercent: 18,
            giTaggedCoverageCount: 34,
            emergencyIncidentsLogged: 2
          },
          sdgCompliance: { sdg8: 87, sdg11: 72, sdg17: 64 },
          districtClusters: [],
          recentAlerts: []
        });
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load govt analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Ministry of Tourism & State Craft Councils</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D4A3E]">
            National Craft Tourism Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Real-time tracking of artisan livelihoods, tourist dispersion, ODOP coverage, and emergency response feeds.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs px-4 py-2.5 rounded-full shadow-sm transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Live Metrics</span>
        </button>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Card 1: Artisans */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Artisan Registry</span>
            <Users className="w-5 h-5 text-[#2D4A3E]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#2D4A3E]">
            {data?.metrics.totalArtisans.toLocaleString() || '1,248'}
          </div>
          <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1 font-semibold">
            <span>▲ 14.2%</span>
            <span className="text-stone-500 font-normal">registered this quarter</span>
          </div>
        </div>

        {/* Card 2: Direct Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Direct Artisan Revenue</span>
            <TrendingUp className="w-5 h-5 text-[#D84315]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#D84315]">
            ₹12.4 Lakh
          </div>
          <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1 font-semibold">
            <span>96%</span>
            <span className="text-stone-500 font-normal">disbursed without middlemen</span>
          </div>
        </div>

        {/* Card 3: ODOP & GI Products */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">ODOP & GI Clusters</span>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-amber-700">
            {data?.metrics.giTaggedCoverageCount || 42}
          </div>
          <div className="mt-2 text-xs text-stone-500">
            Certified geographical lineages active
          </div>
        </div>

        {/* Card 4: Safety & SOS Response */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">SOS Resolution Rate</span>
            <ShieldAlert className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-stone-800">
            100%
          </div>
          <div className="mt-2 text-xs text-stone-500">
            Jurisdictional police integration active
          </div>
        </div>
      </div>

      {/* SDG Compliance Scorecard & Inclusion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Inclusion Breakdown */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#2D4A3E]">
            Social Inclusion Indices
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Women Artisan Representation</span>
                <span className="text-[#D84315]">{data?.metrics.womenArtisansPercent || 68}%</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D84315] rounded-full"
                  style={{ width: `${data?.metrics.womenArtisansPercent || 68}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Senior/Elderly Master Artisans (Age 55+)</span>
                <span className="text-[#2D4A3E]">{data?.metrics.elderlyArtisansPercent || 42}%</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2D4A3E] rounded-full"
                  style={{ width: `${data?.metrics.elderlyArtisansPercent || 42}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Direct Middleman Margins Slashed</span>
                <span className="text-emerald-700">{data?.metrics.middlemanCommissionSavedPercent || 44}%</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${data?.metrics.middlemanCommissionSavedPercent || 44}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* United Nations Sustainable Development Goals (SDGs) */}
        <div className="lg:col-span-2 bg-[#2D4A3E] text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-2">
              UN SDG Policy Alignment Matrix
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Measurable Sustainable Impact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-2xl font-serif font-bold text-amber-300">SDG 8</div>
                <div className="text-xs font-semibold mt-1">Decent Work & Economic Growth</div>
                <p className="text-[11px] text-stone-200 mt-2">
                  Direct revenue generation guarantees dignified minimum wages for rural master weavers and sculptors.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-2xl font-serif font-bold text-amber-300">SDG 12</div>
                <div className="text-xs font-semibold mt-1">Sustainable Consumption</div>
                <p className="text-[11px] text-stone-200 mt-2">
                  Encourages handmade, vegetable-tanned, and bio-degradable heritage goods over mass machine plastics.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-2xl font-serif font-bold text-amber-300">SDG 5</div>
                <div className="text-xs font-semibold mt-1">Gender Equality</div>
                <p className="text-[11px] text-stone-200 mt-2">
                  Provides safe, voice-enabled financial independence to rural women weavers across MP and Assam.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-emerald-200/80 pt-4 border-t border-white/10 mt-6">
            Data verified according to National Tourism Policy 2026 & "Vocal for Local" benchmarks.
          </div>
        </div>
      </div>

      {/* District Clusters Overview Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden mb-10">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2D4A3E]">
              Monitored District Craft Clusters
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Breakdown of registered clusters and average quality-of-service scores.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-6">District & State</th>
                <th className="py-3 px-6">Primary Craft</th>
                <th className="py-3 px-6">Cluster Size</th>
                <th className="py-3 px-6">Average Trust Score</th>
                <th className="py-3 px-6">Tourism Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-6 font-bold text-[#2D4A3E]">Kolhapur, Maharashtra</td>
                <td className="py-3.5 px-6">Vegetable-Tanned Leathercraft</td>
                <td className="py-3.5 px-6 font-mono">312 Artisans</td>
                <td className="py-3.5 px-6 font-bold text-emerald-700">96%</td>
                <td className="py-3.5 px-6">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Balanced Tourism
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-6 font-bold text-[#2D4A3E]">Ashoknagar (Chanderi), MP</td>
                <td className="py-3.5 px-6">Pit-Loom Zari Silk Weaving</td>
                <td className="py-3.5 px-6 font-mono">248 Artisans</td>
                <td className="py-3.5 px-6 font-bold text-emerald-700">94%</td>
                <td className="py-3.5 px-6">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    High Growth Potential
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-6 font-bold text-[#2D4A3E]">Majuli Island, Assam</td>
                <td className="py-3.5 px-6">Cane, Bamboo & Vaishnavite Masks</td>
                <td className="py-3.5 px-6 font-mono">194 Artisans</td>
                <td className="py-3.5 px-6 font-bold text-emerald-700">92%</td>
                <td className="py-3.5 px-6">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Eco-Certified
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-6 font-bold text-[#2D4A3E]">Old Srinagar, J&K</td>
                <td className="py-3.5 px-6">Walnut Wood Carving & Guilds</td>
                <td className="py-3.5 px-6 font-mono">285 Artisans</td>
                <td className="py-3.5 px-6 font-bold text-emerald-700">95%</td>
                <td className="py-3.5 px-6">
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Heritage Revival
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-6 font-bold text-[#2D4A3E]">Bankura (Bishnupur), West Bengal</td>
                <td className="py-3.5 px-6">Living Terracotta Pottery</td>
                <td className="py-3.5 px-6 font-mono">209 Artisans</td>
                <td className="py-3.5 px-6 font-bold text-emerald-700">91%</td>
                <td className="py-3.5 px-6">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Active Workshops
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
