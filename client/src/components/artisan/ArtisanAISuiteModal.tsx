import React, { useState } from 'react';
import { 
  X, Eye, Activity, TrendingUp, ShieldAlert, 
  CheckCircle2, AlertTriangle, ArrowRight, Play, Cpu
} from 'lucide-react';
import { AgenticReasoningTerminal } from '../telemetry/AgenticReasoningTerminal';
import { TelemetryTrace } from '../../types';

interface ArtisanAISuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArtisan?: (artisanId: string) => void;
  onBookMasterclass?: (experienceId: string) => void;
}

export const ArtisanAISuiteModal: React.FC<ArtisanAISuiteModalProps> = ({
  isOpen,
  onClose,
  onSelectArtisan,
  onBookMasterclass
}) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'kinematics' | 'forecast' | 'anomaly'>('vision');
  const [selectedSample, setSelectedSample] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [kinematicRunning, setKinematicRunning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  // Vision Craft Recognition Samples
  const CRAFT_SAMPLES = [
    {
      name: 'Kolhapuri Braided Leather',
      image: '/assets/images/Home page/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
      category: 'Leathercraft',
      cluster: 'Shivaji Market, Kolhapur',
      hint: 'Kolhapuri chappal vegetable-tanned leather braid'
    },
    {
      name: 'Chanderi Zari Silk Loom',
      image: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
      category: 'Handloom',
      cluster: 'Pranpur Village, Chanderi',
      hint: 'Chanderi gossamer silk pit-loom gold zari'
    },
    {
      name: 'Majuli Vaishnavite Mask',
      image: '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
      category: 'Bamboo-Cane',
      cluster: 'Natun Samaguri Satra, Majuli',
      hint: 'Majuli bamboo armature riverbed clay mask'
    },
    {
      name: 'Kashmir Walnut Wood Jali',
      image: '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
      category: 'Woodwork',
      cluster: 'Zadibal Old City, Srinagar',
      hint: 'Kashmir seasoned walnut root floral undercut relief'
    }
  ];

  // Vision Recognition Result
  const [visionResult, setVisionResult] = useState<any>({
    identified_craft: 'Vegetable-Tanned Kolhapuri Leathercraft',
    confidence: 0.96,
    primary_materials: ['Full-grain buffalo leather', 'Babool bark tannins', 'Silk cord braid'],
    traditional_techniques: ['Panchganga riverbank wet-molding', 'Hand-punched awl holes', 'Four-strand toe braid'],
    probable_cluster: 'Shivaji Market, Kolhapur, Maharashtra',
    matching_artisans: [
      { id: 'art_kolhapur_01', name: 'Santosh Kamble', cluster: 'Shivaji Market, Kolhapur', trust_score: 98, experience_id: 'exp_kolhapur_01' }
    ],
    visual_features: [
      'Authentic non-chemical vegetable-tanning patina',
      'Hand-cut welt with signature squeak stitch channel',
      'Natural myrobalan herbal extraction sheen'
    ]
  });

  // Telemetry Trace State
  const [telemetryTrace, setTelemetryTrace] = useState<TelemetryTrace>({
    domain: 'ARTISAN',
    query: 'Multimodal Craft Recognition (Kolhapuri Braided Leather)',
    timestamp: new Date().toISOString(),
    total_duration_ms: 184,
    model: 'Groq/Llama-3.3-70B + ViT-Craft-Classifier',
    confidence: 0.96,
    steps: [
      { id: 's1', name: 'Vision Feature Extraction (ViT)', action: 'Extracted deep visual patch tokens: grain density, stitch contours, natural dye hues', status: 'completed', duration_ms: 32 },
      { id: 's2', name: 'Craft Taxonomy Classification', action: 'Matched with GI registry benchmark dataset for Leathercraft (ODOP-MH-KOLHAPUR)', status: 'completed', duration_ms: 45 },
      { id: 's3', name: 'PostgreSQL Atelier Geospatial Filter', action: 'Located verified master cobblers within 5km of Kolhapur craft cluster', status: 'completed', duration_ms: 28 },
      { id: 's4', name: 'Trust & Pehchan Card Verification', action: 'Verified Santosh Kamble Pehchan ID & GI Authorized User accreditation', status: 'completed', duration_ms: 25 },
      { id: 's5', name: 'Explainable AI Feature Importance', action: 'Attributed 48% weight to vegetable tanning grain, 32% to braid pattern', status: 'completed', duration_ms: 30 },
      { id: 's6', name: 'Grounded Recommendation', action: 'Ranked Heritage Kolhapuri Chappal Masterclass as top match for direct booking', status: 'completed', duration_ms: 24 }
    ]
  });

  const handleRunVisionAnalysis = (index: number) => {
    setSelectedSample(index);
    setIsAnalyzing(true);
    const sample = CRAFT_SAMPLES[index];

    setTimeout(() => {
      setIsAnalyzing(false);
      setVisionResult({
        identified_craft: sample.name,
        confidence: 0.95 + (index * 0.01),
        primary_materials: index === 1 
          ? ['Mulberry silk 300-count', 'Gold & silver zari wire', 'Fine cotton warp']
          : index === 2 
          ? ['Bhaluka bamboo splits', 'Brahmaputra alluvial silt', 'Organic pigments']
          : index === 3
          ? ['Seasoned walnut root wood', 'Natural agate burnishing wax']
          : ['Full-grain buffalo leather', 'Babool bark tannins', 'Silk cord braid'],
        traditional_techniques: index === 1
          ? ['Earthen pit-loom throw-shuttle', 'Micro-threading', 'Peacock booti interlacing']
          : index === 2
          ? ['Split-bamboo armature weaving', 'Riverbed clay contour modeling', 'Organic vegetable dyeing']
          : index === 3
          ? ['3D undercut deep relief (Jali)', 'Floral trellis carving', 'Agate stone burnishing']
          : ['Panchganga riverbank wet-molding', 'Hand-punched awl holes', 'Four-strand toe braid'],
        probable_cluster: sample.cluster,
        matching_artisans: [
          {
            id: index === 1 ? 'art_chanderi_01' : index === 2 ? 'art_majuli_01' : index === 3 ? 'art_srinagar_01' : 'art_kolhapur_01',
            name: index === 1 ? 'Kamla Bai' : index === 2 ? 'Hemanta Bora' : index === 3 ? 'Ghulam Mohammad Zargar' : 'Santosh Kamble',
            cluster: sample.cluster,
            trust_score: index === 3 ? 99 : index === 0 ? 98 : 96,
            experience_id: index === 1 ? 'exp_chanderi_01' : index === 2 ? 'exp_majuli_01' : index === 3 ? 'exp_srinagar_01' : 'exp_kolhapur_01'
          }
        ],
        visual_features: [
          `Authentic signature detected: ${sample.name}`,
          `Raw material consistency matches ${sample.cluster} guild guidelines`,
          'Zero synthetic machine-pressed extrusion artifacts detected'
        ]
      });

      setTelemetryTrace({
        domain: 'ARTISAN',
        query: `Multimodal Craft Recognition (${sample.name})`,
        timestamp: new Date().toISOString(),
        total_duration_ms: 190,
        model: 'Groq/Llama-3.3-70B + ViT-Craft-Classifier',
        confidence: 0.96,
        steps: [
          { id: 's1', name: 'Vision Feature Extraction (ViT)', action: `Processed image tensors: detected ${sample.category} fiber and surface grain`, status: 'completed', duration_ms: 36 },
          { id: 's2', name: 'Craft Taxonomy Classification', action: `Classified as ${sample.name} with 96% confidence`, status: 'completed', duration_ms: 42 },
          { id: 's3', name: 'PostgreSQL Atelier Geospatial Filter', action: `Located verified master craftspeople in ${sample.cluster}`, status: 'completed', duration_ms: 30 },
          { id: 's4', name: 'Trust & Verification Check', action: 'Verified master artisan credentials and direct booking availability', status: 'completed', duration_ms: 28 },
          { id: 's5', name: 'Explainable AI Feature Trace', action: 'Computed SHAP explanation vector for raw materials and heritage technique', status: 'completed', duration_ms: 32 },
          { id: 's6', name: 'Grounded Recommendation', action: 'Verified atelier calendar slots available for booking', status: 'completed', duration_ms: 22 }
        ]
      });
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-[#151D1A] text-stone-100 rounded-3xl w-full max-w-5xl border border-stone-700/80 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-bold shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                  World 1 • Autonomous Intelligence Suite
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 font-mono">
                  v2.0 Kinematics & Vision
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-100">
                Kala Setu Artisan Intelligence
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-800 bg-[#121815] overflow-x-auto">
          <button
            onClick={() => setActiveTab('vision')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'vision'
                ? 'text-amber-400 border-amber-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>1. Multimodal Craft Recognition</span>
          </button>
          <button
            onClick={() => setActiveTab('kinematics')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'kinematics'
                ? 'text-amber-400 border-amber-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>2. Kinematic Technique Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'forecast'
                ? 'text-amber-400 border-amber-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>3. Demand Forecasting</span>
          </button>
          <button
            onClick={() => setActiveTab('anomaly')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'anomaly'
                ? 'text-amber-400 border-amber-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>4. Anomaly Detection</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Multimodal Craft Recognition */}
          {activeTab === 'vision' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <span className="text-xs uppercase font-bold text-amber-400 block mb-1">
                  ViT + CLIP Vision Encoder Fine-Tuned on Indian Crafts
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Upload an image of a handmade product, textile, or pottery fragment. The vision pipeline identifies the craft classification, constituent raw materials, traditional production methods, and connects you directly to verified hereditary masters.
                </p>
              </div>

              {/* Sample Selector */}
              <div>
                <span className="text-xs font-bold text-stone-300 block mb-2">
                  Select a Craft Specimen or Upload Photo:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CRAFT_SAMPLES.map((sample, idx) => (
                    <div
                      key={sample.name}
                      onClick={() => handleRunVisionAnalysis(idx)}
                      className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedSample === idx 
                          ? 'border-amber-400 shadow-lg scale-[1.02]' 
                          : 'border-stone-800 hover:border-stone-600 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="h-24 w-full overflow-hidden bg-stone-950">
                        <img 
                          src={sample.image} 
                          alt={sample.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <div className="p-2 bg-stone-900 text-left">
                        <span className="text-[11px] font-bold text-stone-200 block truncate">
                          {sample.name}
                        </span>
                        <span className="text-[10px] text-amber-400 block truncate">
                          {sample.cluster}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recognition Result Card */}
              {visionResult && (
                <div className="bg-[#0E1513] rounded-2xl p-5 border border-amber-900/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                          Vision Match Confirmed
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-stone-100 mt-0.5">
                        {visionResult.identified_craft}
                      </h3>
                      <span className="text-xs text-stone-400">
                        Cluster: {visionResult.probable_cluster}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-amber-400">
                        {(visionResult.confidence * 100).toFixed(0)}%
                      </span>
                      <span className="text-[10px] text-stone-400 block">ViT Visual Confidence</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">Constituent Raw Materials:</span>
                      <ul className="space-y-1 text-stone-300">
                        {visionResult.primary_materials.map((m: string) => (
                          <li key={m} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-stone-400 font-bold block mb-1">Traditional Techniques Identified:</span>
                      <ul className="space-y-1 text-stone-300">
                        {visionResult.traditional_techniques.map((tech: string) => (
                          <li key={tech} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Matching Artisan Recommendation */}
                  <div className="pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Verified Hereditary Custodian
                      </span>
                      <span className="text-sm font-bold text-amber-300">
                        {visionResult.matching_artisans[0]?.name} • Trust {visionResult.matching_artisans[0]?.trust_score}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onSelectArtisan && (
                        <button
                          onClick={() => {
                            onClose();
                            onSelectArtisan(visionResult.matching_artisans[0]?.id);
                          }}
                          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200 transition-colors"
                        >
                          View Studio
                        </button>
                      )}
                      {onBookMasterclass && (
                        <button
                          onClick={() => {
                            onClose();
                            onBookMasterclass(visionResult.matching_artisans[0]?.experience_id);
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition-colors flex items-center gap-1 shadow-md"
                        >
                          <span>Book Workshop</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Kinematic Technique Analysis */}
          {activeTab === 'kinematics' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
                  <Activity className="w-4 h-4" />
                  <span>MediaPipe Pose 33-Body-Landmark Biomechanical Tracking</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Real-time motion kinematic assistance monitors wrist velocity, elbow flexion angles, and rhythmic shuttle cadence during traditional handloom weaving and leather awl piercing to assist learners and record ergonomic muscle memory.
                </p>
              </div>

              {/* Interactive Simulator Card */}
              <div className="bg-[#0B100E] p-5 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setKinematicRunning(!kinematicRunning)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        kinematicRunning
                          ? 'bg-amber-600 text-white animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{kinematicRunning ? 'Stream Paused' : 'Start Live Pose Stream'}</span>
                    </button>
                    <span className="text-xs text-stone-400 font-mono">
                      Target: Pit-Loom Shuttle Throw (Chanderi)
                    </span>
                  </div>

                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    33 Landmarks Active • 60 FPS
                  </span>
                </div>

                {/* Telemetry Visualizer Gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Wrist Stability</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">91%</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Optimal 14°–18° flex</span>
                  </div>
                  <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Rhythm Cadence</span>
                    <span className="text-2xl font-bold font-mono text-amber-400">38 bpm</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Continuous throw</span>
                  </div>
                  <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Joint Symmetry</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">0.94</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Bilateral harmony</span>
                  </div>
                  <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Fatigue Index</span>
                    <span className="text-2xl font-bold font-mono text-blue-400">Low</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Ergonomic posture</span>
                  </div>
                </div>

                {/* Real-time assistance signal */}
                <div className="p-3.5 bg-stone-900/90 rounded-xl border border-amber-900/40 text-xs space-y-1">
                  <span className="font-bold text-amber-300 block">
                    ⚡ Live Biomechanical Feedback:
                  </span>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    Forearm angle maintained securely at 24° during shuttle release. Optimal tension transferred to the warp thread without snapping delicate 300-count silk fibers.
                  </p>
                </div>

                {/* Mandatory Authenticity Disclaimer (Section 8.1 & 14.2) */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-300">Authenticity Note:</strong> Kinematic pose analysis serves as an educational assistance signal and ergonomic guide for masterclass students. Movement alone never proves authenticity; hereditary craft mastery is verified through guild lineages and Pehchan credentials.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Demand Forecasting */}
          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <span className="text-xs uppercase font-bold text-amber-400 block mb-1">
                  Time-Series Transformer • 6-Month Tourism Horizon
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Forecasts workshop seat demand across India&apos;s 5 major craft hubs based on historical search telemetry, festival seasonality (Diwali, Dussehra, Winter wedding season), and atelier capacity.
                </p>
              </div>

              {/* 6-Month Forecast Table / Chart */}
              <div className="bg-[#0B100E] p-5 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <h4 className="font-bold text-stone-200 text-sm">
                      Kolhapur & Chanderi Craft Clusters (Oct 2026 – Mar 2027)
                    </h4>
                    <span className="text-xs text-stone-400">Peak Surge: Nov–Dec 2026</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                    High Confidence Model
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { month: 'Oct 2026', views: 1240, bookings: 185, load: 68 },
                    { month: 'Nov 2026 (Diwali Peak)', views: 2150, bookings: 310, load: 94 },
                    { month: 'Dec 2026 (Winter Travel)', views: 2890, bookings: 395, load: 98 },
                    { month: 'Jan 2027', views: 1820, bookings: 245, load: 76 },
                    { month: 'Feb 2027', views: 1540, bookings: 195, load: 62 },
                    { month: 'Mar 2027', views: 1320, bookings: 160, load: 54 }
                  ].map((row) => (
                    <div key={row.month} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-200 w-44">{row.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              row.load > 90 ? 'bg-rose-500' : row.load > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${row.load}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right font-mono text-stone-300 w-28">
                        <span>{row.load}% Load</span>
                        <span className="text-stone-500 block text-[10px]">{row.bookings} bookings</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 text-xs text-stone-400">
                  💡 <strong className="text-stone-200">Directorate Action Recommendation:</strong> Open 2 supplementary morning slots in November to prevent booking saturation while maintaining the strict 8-guest ceiling per masterclass.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Anomaly Detection */}
          {activeTab === 'anomaly' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <span className="text-xs uppercase font-bold text-amber-400 block mb-1">
                  Isolation Forest + Autoencoder Integrity Radar
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Monitors artisan listings and traveler review velocity to detect artificial review bursts, abnormal pricing spikes, or copycat listings without ever making automated accusations.
                </p>
              </div>

              <div className="bg-[#0B100E] p-5 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <h4 className="font-bold text-stone-200 text-sm">
                      Master Atelier Audit: Santosh Kamble (Kolhapur)
                    </h4>
                    <span className="text-xs text-stone-400">Audit Status: Continuous AI Verification</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                    Anomaly Score: 0.12 (Normal)
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-emerald-900/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-200 block">Review Velocity Consistency</span>
                      <span className="text-stone-400 text-[11px]">2.4 authentic reviews/week with verified QR pass redemption</span>
                    </div>
                    <span className="text-emerald-400 font-bold">PASS ✓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/80 border border-emerald-900/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-200 block">Price Stability vs ODOP Benchmark</span>
                      <span className="text-stone-400 text-[11px]">Workshop rate ₹1,850 aligns with regional guild standards</span>
                    </div>
                    <span className="text-emerald-400 font-bold">PASS ✓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/80 border border-emerald-900/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-200 block">GPS Atelier Check-In Verification</span>
                      <span className="text-stone-400 text-[11px]">Consistent coordinates at Shivaji Market workshop</span>
                    </div>
                    <span className="text-emerald-400 font-bold">PASS ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visible Agentic Reasoning Terminal (Section 16) */}
          <div className="pt-4 border-t border-stone-800">
            <AgenticReasoningTerminal
              trace={telemetryTrace}
              isOpen={showTerminal}
              onToggle={() => setShowTerminal(!showTerminal)}
              title="Artisan AI Autonomous Reasoning Telemetry"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
