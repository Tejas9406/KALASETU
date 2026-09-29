import React, { useState } from 'react';
import { 
  X, Share2, Calendar, ShieldCheck, AlertCircle, 
  MapPin, Sparkles, Network, Users, ArrowRight, Info
} from 'lucide-react';
import { AgenticReasoningTerminal } from '../telemetry/AgenticReasoningTerminal';
import { TelemetryTrace } from '../../types';

interface CommunityAISuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExperience?: (expId: string) => void;
}

export const CommunityAISuiteModal: React.FC<CommunityAISuiteModalProps> = ({
  isOpen,
  onClose,
  onSelectExperience
}) => {
  const [activeTab, setActiveTab] = useState<'graph' | 'crowd' | 'season'>('graph');
  const [selectedNode, setSelectedNode] = useState<string>('fest_shimga');
  const [showTerminal, setShowTerminal] = useState(true);

  // Cultural Knowledge Graph Nodes
  const GRAPH_NODES = [
    { id: 'geo_in_mh', label: 'Maharashtra', type: 'Region', x: 250, y: 50, color: '#3B82F6', info: 'State with coastal Konkan and Western Ghats living heritage' },
    { id: 'comm_konkan', label: 'Konkan Agrarian Gramstha', type: 'Community', x: 130, y: 140, color: '#10B981', info: '400-year-old hereditary coastal village custodians' },
    { id: 'comm_warkari', label: 'Warkari Devotional Guild', type: 'Community', x: 370, y: 140, color: '#10B981', info: '800-year egalitarian saint-poet bhakti movement' },
    { id: 'fest_shimga', label: 'Shimga Palakhi Nrutya', type: 'Festival', x: 80, y: 240, color: '#F59E0B', info: 'Sacred village palanquin dance through betel-nut groves' },
    { id: 'food_rassa', label: 'Tambada-Pandhara Rassa', type: 'Food', x: 220, y: 250, color: '#EC4899', info: 'Indigenous spice and coconut broth culinary heritage' },
    { id: 'fest_kakada', label: 'Kakada Bhajan & Palkhi', type: 'Tradition', x: 420, y: 240, color: '#8B5CF6', info: 'Pre-dawn abhang chants with taal cymbals and mridangam' }
  ];

  const GRAPH_EDGES = [
    { from: 'geo_in_mh', to: 'comm_konkan', label: 'HOSTS' },
    { from: 'geo_in_mh', to: 'comm_warkari', label: 'HOSTS' },
    { from: 'comm_konkan', to: 'fest_shimga', label: 'CELEBRATES' },
    { from: 'comm_konkan', to: 'food_rassa', label: 'CULINARY' },
    { from: 'comm_warkari', to: 'fest_kakada', label: 'PRACTICES' }
  ];

  const selectedNodeData = GRAPH_NODES.find(n => n.id === selectedNode) || GRAPH_NODES[3];

  // Telemetry Trace State for Community
  const [telemetryTrace] = useState<TelemetryTrace>({
    domain: 'COMMUNITY',
    query: 'Cultural Knowledge Graph Traversal & Living Heritage RAG',
    timestamp: new Date().toISOString(),
    total_duration_ms: 195,
    model: 'Groq/Llama-3.3-70B + GraphRAG Cultural Engine',
    confidence: 0.97,
    steps: [
      { id: 'cs1', name: 'Cultural Intent Classification', action: 'Classified user interest as post-harvest agrarian celebration & folklore', status: 'completed', duration_ms: 28 },
      { id: 'cs2', name: 'Living Heritage Context & Calendar', action: 'Matched Phalguna Purnima (March) seasonal window with coastal Konkan', status: 'completed', duration_ms: 38 },
      { id: 'cs3', name: 'Knowledge Graph 3-Hop Traversal', action: 'Traversed Maharashtra -> Konkan Gramstha -> Shimga Palakhi -> Earthen Rituals', status: 'completed', duration_ms: 48 },
      { id: 'cs4', name: 'UNESCO Crowd-Pressure Balancing', action: 'Evaluated village carrying capacity: 42% sustainable load index', status: 'completed', duration_ms: 26 },
      { id: 'cs5', name: 'Sacred Sanctum & Respect Verification', action: 'Confirmed community consent for respectful non-intrusive cultural attendance', status: 'completed', duration_ms: 25 },
      { id: 'cs6', name: 'Grounded Recommendation', action: 'Generated cultural guidance with Gazette & UNESCO references', status: 'completed', duration_ms: 30 }
    ]
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-[#121A16] text-stone-100 rounded-3xl w-full max-w-5xl border border-emerald-900/60 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold shadow-md">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  World 2 • Community Intelligence Suite
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono">
                  GraphRAG & UNESCO Balancing
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-100">
                Kala Setu Community Heritage Intelligence
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
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-800 bg-[#0E1513] overflow-x-auto">
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'graph'
                ? 'text-emerald-400 border-emerald-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>1. Cultural Knowledge Graph (GraphRAG)</span>
          </button>
          <button
            onClick={() => setActiveTab('crowd')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'crowd'
                ? 'text-emerald-400 border-emerald-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. UNESCO Crowd-Pressure Balancing</span>
          </button>
          <button
            onClick={() => setActiveTab('season')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'season'
                ? 'text-emerald-400 border-emerald-400 bg-stone-800/40'
                : 'text-stone-400 border-transparent hover:text-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>3. Seasonal Calendar & Suitability</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Cultural Knowledge Graph */}
          {activeTab === 'graph' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <span className="text-xs uppercase font-bold text-emerald-400 block mb-1">
                  GraphRAG: Interconnected Living Heritage Entities
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Cultural heritage is not a flat database. Kala Setu uses Graph Neural Network traversal connecting Regions, Communities, Festivals, Indigenous Foods, and Folk Rituals to recommend deeply contextual cultural experiences.
                </p>
              </div>

              {/* Interactive SVG Knowledge Graph */}
              <div className="bg-[#0B100E] p-4 rounded-2xl border border-stone-800 relative">
                <div className="text-xs text-stone-400 mb-2 flex items-center justify-between">
                  <span>Click any node to explore its lineage and connected traditions:</span>
                  <span className="text-[10px] text-emerald-400 font-mono">6 Nodes • 5 Relational Edges</span>
                </div>

                <div className="w-full h-72 bg-stone-950/80 rounded-xl overflow-hidden relative flex items-center justify-center border border-stone-800/80">
                  <svg viewBox="0 0 500 320" className="w-full h-full">
                    {/* Render Edges */}
                    {GRAPH_EDGES.map((edge) => {
                      const fromNode = GRAPH_NODES.find(n => n.id === edge.from)!;
                      const toNode = GRAPH_NODES.find(n => n.id === edge.to)!;
                      return (
                        <g key={`${edge.from}-${edge.to}`}>
                          <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke="#374151"
                            strokeWidth="2"
                            strokeDasharray="4"
                          />
                          <text
                            x={(fromNode.x + toNode.x) / 2}
                            y={(fromNode.y + toNode.y) / 2 - 4}
                            fill="#6B7280"
                            fontSize="8"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {edge.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Render Nodes */}
                    {GRAPH_NODES.map((node) => {
                      const isSelected = selectedNode === node.id;
                      return (
                        <g 
                          key={node.id}
                          onClick={() => setSelectedNode(node.id)}
                          className="cursor-pointer transition-transform hover:scale-110"
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isSelected ? 22 : 18}
                            fill={isSelected ? node.color : '#1F2937'}
                            stroke={node.color}
                            strokeWidth={isSelected ? 3 : 2}
                            className="transition-all"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            fill="#F9FAFB"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            pointerEvents="none"
                          >
                            {node.label.split(' ')[0]}
                          </text>
                          <text
                            x={node.x}
                            y={node.y + 32}
                            fill="#9CA3AF"
                            fontSize="8"
                            textAnchor="middle"
                            pointerEvents="none"
                          >
                            {node.type}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected Node Details Box */}
                {selectedNodeData && (
                  <div className="mt-3 p-3.5 bg-stone-900/90 rounded-xl border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedNodeData.color }} />
                        <span className="font-bold text-stone-100 text-sm">{selectedNodeData.label}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono">
                          {selectedNodeData.type}
                        </span>
                      </div>
                      <p className="text-stone-300 mt-1">{selectedNodeData.info}</p>
                    </div>

                    {selectedNode === 'fest_shimga' && onSelectExperience && (
                      <button
                        onClick={() => {
                          onClose();
                          onSelectExperience('cult_04');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>View Living Experience</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: UNESCO Crowd-Pressure Balancing */}
          {activeTab === 'crowd' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <span className="text-xs uppercase font-bold text-emerald-400 block mb-1">
                  UNESCO Living Heritage Sustainable Load Balancing
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  UNESCO explicitly links living heritage preservation with sustainable tourism and community resilience. Kala Setu actively monitors visitor density to protect village sanctity from overtourism, dynamically recommending nearby lesser-known heritage clusters when a shrine or ritual perimeter reaches capacity.
                </p>
              </div>

              {/* Status Simulation Card */}
              <div className="bg-[#0B100E] p-5 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                  <div>
                    <h4 className="font-bold text-stone-200 text-sm">
                      Kokan Shimga Palakhi Ritual Perimeter (Ratnagiri)
                    </h4>
                    <span className="text-xs text-stone-400">Target Carrying Capacity: 40 Guests / Day</span>
                  </div>

                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 font-mono">
                    Load Factor: 42% (Optimal)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Daily Carrying Capacity</span>
                    <span className="text-2xl font-bold font-mono text-stone-200">40</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Community-approved cap</span>
                  </div>
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Current Booked Today</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">17</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Verified QR passes</span>
                  </div>
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block mb-1">Community Serenity Index</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">98%</span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">Ecological balance</span>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-900/40 text-xs text-stone-300 space-y-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Sustainable Carrying Status: Healthy
                  </span>
                  <p className="leading-relaxed font-sans text-stone-300">
                    The ritual perimeter in Konkan maintains respectful space for local gramstha. Guests are provided organic cotton wraps and barefoot footwear shelves at the betel grove perimeter.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Seasonal Calendar */}
          {activeTab === 'season' && (
            <div className="space-y-6">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <span className="text-xs uppercase font-bold text-emerald-400 block mb-1">
                  Living Heritage Calendar & Agro-Climatic Timing
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Living traditions are intrinsically tied to solar, lunar, and harvest seasons. View optimal visit windows across autumn harvest, spring holi festivals, and winter tribal gatherings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { title: 'Autumn Harvest (Oct – Nov)', traditions: ['Chhath Mahaparv (Bihar)', 'Durga Puja & Dhunuchi (Kolkata)', 'Warkari Bhajan (Maharashtra)'], status: 'Active Peak Window' },
                  { title: 'Winter Celebrations (Dec – Jan)', traditions: ['Hornbill 17-Tribes Festival (Nagaland)', 'Theyyam Grove Rites (Kerala)', 'Pardhan Bana Epics (MP)'], status: 'Upcoming Season' },
                  { title: 'Spring Festivities (Feb – Apr)', traditions: ['Kokan Shimga Palakhi (Konkan)', 'Bhil Bhagoria Haat (Jhabua)', 'Bodo Bwisagu Spring (Assam)'], status: 'Spring Peak' },
                  { title: 'Monsoon Replenishment (Jun – Sep)', traditions: ['Brahmaputra River Mask Silt Harvesting', 'Earthen Kiln Curing', 'Weaving Studio Demonstrations'], status: 'Artisan Workshop Season' }
                ].map((s) => (
                  <div key={s.title} className="p-4 bg-stone-900/60 rounded-2xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-100">{s.title}</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-900">
                        {s.status}
                      </span>
                    </div>
                    <ul className="space-y-1 text-stone-400 pl-2">
                      {s.traditions.map((trad) => (
                        <li key={trad} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          <span>{trad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visible Agentic Reasoning Terminal (Section 16) */}
          <div className="pt-4 border-t border-stone-800">
            <AgenticReasoningTerminal
              trace={telemetryTrace}
              isOpen={showTerminal}
              onToggle={() => setShowTerminal(!showTerminal)}
              title="Community AI Autonomous Reasoning Telemetry"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
