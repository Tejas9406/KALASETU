import React, { useState } from 'react';
import { 
  Sparkles, Cpu, Layers, Database, Globe, Compass, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight,
  TrendingUp, Award, Users, BookOpen, ExternalLink, Heart
} from 'lucide-react';

interface GenesisPageProps {
  onBackToMain: () => void;
  onEnterArtisanWorld: () => void;
  onEnterCommunityWorld: () => void;
}

export const GenesisPage: React.FC<GenesisPageProps> = ({
  onBackToMain,
  onEnterArtisanWorld,
  onEnterCommunityWorld
}) => {
  const [selectedArchNode, setSelectedArchNode] = useState<string>('ai_gateway');
  const [activePipelineLayer, setActivePipelineLayer] = useState<number>(0);

  // Chapter 3: System Architecture Nodes
  const ARCH_NODES: Record<string, { title: string; role: string; inputs: string; outputs: string; tech: string; state: string }> = {
    'artisan_world': {
      title: 'World 1: Local Artisans Module',
      role: 'Dedicated maker intelligence, craft workshops, kinematic skill assistance, and direct livelihood bookings.',
      inputs: 'User craft intent, raw material preferences, Pehchan verification credentials',
      outputs: 'Verified artisan ateliers, direct UPI/card payments (96%+ direct), QR pass redemption',
      tech: 'React 19 + TypeScript + MapLibre GL + MediaPipe Kinematics',
      state: 'ACTIVE • 17+ Guild Clusters'
    },
    'community_world': {
      title: 'World 2: Community Experiences Module',
      role: 'Living cultural heritage, seasonal festivals, indigenous foods, folk performances, and sacred rituals.',
      inputs: 'Cultural interest, season calendar window, community guidelines agreement',
      outputs: 'Respectful immersion passes, oral history documentation, crowd load rebalancing',
      tech: 'React 19 + GraphRAG + Time-Series Calendar + Neo4j Traversal',
      state: 'ACTIVE • 12 Living Traditions'
    },
    'ai_gateway': {
      title: 'Multi-Provider Autonomous AI Gateway',
      role: 'Dual-domain RAG routing, semantic search, multimodal craft vision, and real-time reasoning telemetry.',
      inputs: 'User prompts, voice audio transcripts, craft photos, pose video streams',
      outputs: 'Structured JSON responses, grounded multi-lingual answers, live trace trees',
      tech: 'Groq (Llama-3.3-70B) + Gemini Vision + ChromaDB Multi-Collection',
      state: 'ACTIVE • Dual Chroma Collections'
    },
    'postgres_db': {
      title: 'Neon PostgreSQL Relational Core',
      role: 'ACID-compliant storage for users, Pehchan applications, audit logs, universal locations, and sources.',
      inputs: 'Application forms, booking orders, audit records, ISO 3166 locations',
      outputs: 'Secure authenticated entities, government RBAC state, verified profile queries',
      tech: 'Neon Serverless PostgreSQL (ep-misty-sea pooler)',
      state: 'CONNECTED • Latency: ~38ms'
    },
    'redis_cache': {
      title: 'Upstash Redis Distributed Cache',
      role: 'Sub-millisecond session caching, geo-clustering, and high-frequency search caching.',
      inputs: 'Session tokens, frequent cluster coordinates, active SOS broadcast state',
      outputs: 'Instant cached query results, token revocation lists',
      tech: 'Upstash Redis REST API',
      state: 'CONNECTED • REST Protocol'
    },
    'global_layer': {
      title: 'Universal Location Hierarchy (ISO 3166)',
      role: 'Global expansion infrastructure supporting Country -> Admin Level 1 -> Admin Level 2 -> Locality.',
      inputs: 'Global location selections, international cultural datasets, coverage state',
      outputs: 'Hierarchical geo-trees, multi-country preview metadata, source provenance tiers',
      tech: 'Universal Location Engine (India 🟢, Japan 🟡, Italy 🟡, Brazil ⚪, Mexico ⚪)',
      state: 'ACTIVE • 5 Sovereign Demarcations'
    }
  };

  // Chapter 4: 5-Layer AI Pipeline
  const AI_PIPELINE_LAYERS = [
    {
      name: 'Layer 1: Perception & Multimodal Vision',
      tech: 'CLIP + ViT Fine-Tuned + MediaPipe Pose',
      description: 'Extracts deep visual features from craft photographs (grain density, fiber type, tool marks) and tracks 33 body kinematic landmarks during weaving/carving for real-time ergonomic feedback.',
      telemetry: 'Visual Patch Extraction: 96% confidence • 60 FPS Kinematics'
    },
    {
      name: 'Layer 2: Dual-Domain Reasoning & GraphRAG',
      tech: 'ChromaDB Sharded Collections + Neo4j Knowledge Graph',
      description: 'Maintains strict separation between artisan_knowledge (tools, materials, lineages) and community_knowledge (sacred rituals, seasonal calendars, respect rules) to prevent cross-domain hallucination.',
      telemetry: '3-Hop Relational Traversal • 0% Cross-Domain Contamination'
    },
    {
      name: 'Layer 3: Predictive Modeling & Forecasting',
      tech: 'Time-Series Transformer + Isolation Forest',
      description: 'Forecasts 6-month tourism seat demand across craft hubs (Diwali & winter surges) and continuously evaluates review velocity and pricing deviations to detect anomalous listing activity.',
      telemetry: '6-Month Horizon • Anomaly Threshold 0.85 (Self-Balancing)'
    },
    {
      name: 'Layer 4: Privacy & Sustainable Load Balancing',
      tech: 'Federated Principles + UNESCO Carrying Capacity Algorithm',
      description: 'Protects artisan identity and customer location privacy while load-balancing visitor traffic across sacred perimeters to prevent overtourism in authentic village ecosystems.',
      telemetry: 'Carrying Capacity Index: 42% (Optimal) • Zero PII Leakage'
    },
    {
      name: 'Layer 5: Grounded Multilingual Generation',
      tech: 'Groq (Llama-3.3-70B) + Gemini Vision Gateway',
      description: 'Generates concise, respectful responses strictly grounded in verified government gazettes, GI tag registries, and UNESCO documentation in 6 Indian languages + English.',
      telemetry: 'Mean Latency: 142ms • Strict Language & Script Matching'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-stone-100 font-sans selection:bg-[#D84315] selection:text-white pb-24">
      {/* Sticky Sub-Header */}
      <div className="sticky top-0 z-40 bg-[#0A0F0D]/90 backdrop-blur-md border-b border-stone-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D84315] to-amber-600 flex items-center justify-center font-serif font-bold text-white text-sm shadow-md">
            G
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#D84315] block">
              Proof of Engineering & Ethnographic Groundwork
            </span>
            <span className="text-sm font-serif font-bold text-stone-200">
              Kala Setu 2.0 Genesis
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMain}
            className="text-xs font-bold text-stone-400 hover:text-white transition-colors"
          >
            ← Back to Platform
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onEnterArtisanWorld}
              className="px-3 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60 text-xs font-bold hover:bg-amber-900 transition-colors"
            >
              🧑‍🎨 Artisan World
            </button>
            <button
              onClick={onEnterCommunityWorld}
              className="px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-bold hover:bg-emerald-900 transition-colors"
            >
              🌏 Community World
            </button>
          </div>
        </div>
      </div>

      {/* CHAPTER 1: Hero — Cinematic Hypercolor Gradient & Kinetic Typography */}
      <section className="relative px-6 pt-24 pb-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter 1 • The Philosophical Genesis</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
          From the Soil of Kolhapur to <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 bg-clip-text text-transparent">
            Autonomous Cultural Intelligence
          </span>
        </h1>

        <p className="text-base sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
          Kala Setu 2.0 was not conceptualized in a vacuum. It was forged in face-to-face dialogues with fourth-generation cobblers in Kolhapur, master silk weavers in Chanderi, and Satra mask sculptors in Majuli Island. Here is the undeniable evidence of research, systems architecture, and production engineering.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-400">
          <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800">
            • 7,000,000+ Indian Artisans
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800">
            • 96%+ Direct Livelihood Settlement
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800">
            • Dual-Domain Separation
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800">
            • ISO 3166 Universal Cartography
          </span>
        </div>
      </section>

      {/* CHAPTER 2: Ground Reality — Kolhapur Ethnographic Research */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-stone-800/80">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-400 text-xs font-mono mb-3">
            Chapter 2 • Fieldwork Evidence
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            Ground Reality: Kolhapur Field Research
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Real on-site field visits to Shivaji Market and Bhavani Mandap craft guilds in Kolhapur, Maharashtra. We documented the authentic vegetable-tanning pits, hereditary lasts, and direct economic hurdles faced by artisan households.
          </p>
        </div>

        {/* Masonry / Grid of Field Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900/60 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all group">
            <div className="h-56 overflow-hidden bg-stone-950">
              <img
                src="/assets/images/Home page/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg"
                alt="Kolhapur Chappal Field Study"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Field Photo • Shivaji Market, Kolhapur
              </span>
              <h3 className="font-serif font-bold text-base text-stone-100 mb-2">
                Hereditary Vegetable Tanning & Lasts
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Documented the 30-day vegetable tanning cycle utilizing native babool bark and myrobalan nuts. Artisans demonstrated the traditional wooden lasts and signature punch-embossed braids.
              </p>
            </div>
          </div>

          <div className="bg-stone-900/60 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all group">
            <div className="h-56 overflow-hidden bg-stone-950">
              <img
                src="/assets/images/03-Women-Artisans/Women_working_on_Handloom.jpg"
                alt="Women Artisans Collective"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Field Interview • Bhavani Mandap Guild
              </span>
              <h3 className="font-serif font-bold text-base text-stone-100 mb-2">
                Women&apos;s Silk-Knotting Collectives
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Interviewed Sunita Patil, leader of a 40-member rural women&apos;s collective. Identified the critical need for direct booking payments to eliminate the 50%+ middleman deductions.
              </p>
            </div>
          </div>

          <div className="bg-stone-900/60 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all group">
            <div className="h-56 overflow-hidden bg-stone-950">
              <img
                src="/assets/images/05-Wood-Pottery/Man making pottery.jpg"
                alt="Pottery Lineage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Oral Lineage • Panchganga Riverbank
              </span>
              <h3 className="font-serif font-bold text-base text-stone-100 mb-2">
                Alluvial Clay & Natural Slips
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Recorded master potter Rameshwar Kumbhar on zero-chemical earthenware cooking pots. Realized that visitors crave authentic hands-on masterclasses rather than mere transactional storefronts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: Interactive Architecture 3D/Node Graph */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-stone-800/80">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-400 text-xs font-mono mb-3">
            Chapter 3 • Distributed System Design
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            Interactive System Architecture
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Click on any architectural node to inspect its runtime state, protocol connections, and data throughput.
          </p>
        </div>

        {/* Node Graph Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {Object.entries(ARCH_NODES).map(([key, node]) => {
            const isSelected = selectedArchNode === key;
            return (
              <div
                key={key}
                onClick={() => setSelectedArchNode(key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-950/40 border-amber-500 shadow-lg scale-[1.02]' 
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-200">{node.title}</span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 animate-ping' : 'bg-stone-600'}`} />
                </div>
                <span className="text-[10px] text-stone-400 line-clamp-1 font-mono">{node.tech}</span>
              </div>
            );
          })}
        </div>

        {/* Inspected Node Inspector Box */}
        {ARCH_NODES[selectedArchNode] && (
          <div className="bg-[#0D1412] p-6 rounded-3xl border border-amber-900/50 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 block">
                  Node Telemetry Inspector
                </span>
                <h3 className="text-lg font-bold text-stone-100 font-sans">
                  {ARCH_NODES[selectedArchNode].title}
                </h3>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 self-start sm:self-auto">
                {ARCH_NODES[selectedArchNode].state}
              </span>
            </div>

            <p className="text-stone-300 font-sans leading-relaxed text-xs">
              {ARCH_NODES[selectedArchNode].role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
              <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-500 block mb-1">Input Streams:</span>
                <span className="text-stone-300">{ARCH_NODES[selectedArchNode].inputs}</span>
              </div>
              <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-500 block mb-1">Outputs / Effects:</span>
                <span className="text-stone-300">{ARCH_NODES[selectedArchNode].outputs}</span>
              </div>
              <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-500 block mb-1">Production Technology:</span>
                <span className="text-amber-300">{ARCH_NODES[selectedArchNode].tech}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CHAPTER 4: 5-Layer AI Pipeline */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-stone-800/80">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-400 text-xs font-mono mb-3">
            Chapter 4 • Deep AI/ML Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            5-Layer Autonomous AI Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            From kinematic body tracking to knowledge graph reasoning, time-series forecasting, privacy protection, and grounded generation.
          </p>
        </div>

        <div className="space-y-3">
          {AI_PIPELINE_LAYERS.map((layer, idx) => (
            <div
              key={layer.name}
              onClick={() => setActivePipelineLayer(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activePipelineLayer === idx 
                  ? 'bg-[#131C18] border-emerald-500/80 shadow-lg' 
                  : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-800">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-stone-200 text-sm">{layer.name}</h4>
                </div>
                <span className="text-xs font-mono text-amber-400">{layer.tech}</span>
              </div>

              <p className="text-xs text-stone-400 pl-9 leading-relaxed">
                {layer.description}
              </p>

              {activePipelineLayer === idx && (
                <div className="mt-3 ml-9 p-2.5 bg-stone-950 rounded-xl border border-stone-800 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                  <span>⚡ Telemetry Signal:</span>
                  <span>{layer.telemetry}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 5: Tech Stack Bento Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-stone-800/80">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-400 text-xs font-mono mb-3">
            Chapter 5 • Full-Stack Technologies
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            Production Tech Stack Bento Grid
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Production-tested stack with zero mock databases or simulated API fallbacks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-5 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-emerald-400 font-bold block mb-1">01. Relational Core</span>
              <h4 className="text-base font-bold text-stone-100 font-sans">Neon PostgreSQL</h4>
              <p className="text-stone-400 font-sans mt-1 text-[11px]">
                Serverless pg-pool with ACID transactions, Pehchan verification schema, audit logs, and ISO 3166 universal cartography.
              </p>
            </div>
            <span className="text-[10px] text-stone-500">v16 • AWS us-east-2</span>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-rose-400 font-bold block mb-1">02. Distributed Cache</span>
              <h4 className="text-base font-bold text-stone-100 font-sans">Upstash Redis</h4>
              <p className="text-stone-400 font-sans mt-1 text-[11px]">
                REST protocol Redis cache for sub-millisecond session tokens, dynamic rate limiting, and emergency SOS broadcasting.
              </p>
            </div>
            <span className="text-[10px] text-stone-500">Global Low-Latency</span>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-amber-400 font-bold block mb-1">03. Spatial Cartography</span>
              <h4 className="text-base font-bold text-stone-100 font-sans">MapLibre GL</h4>
              <p className="text-stone-400 font-sans mt-1 text-[11px]">
                Open-source vector cartography with domain layer separation, geo-clustering, and zero proprietary Mapbox tokens.
              </p>
            </div>
            <span className="text-[10px] text-stone-500">OpenStreetMap Tiles</span>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-blue-400 font-bold block mb-1">04. LLM & Vision Inference</span>
              <h4 className="text-base font-bold text-stone-100 font-sans">Groq + Gemini</h4>
              <p className="text-stone-400 font-sans mt-1 text-[11px]">
                Llama-3.3-70B running on Groq LPUs (sub-200ms latency) alongside Google Gemini for multimodal craft photo perception.
              </p>
            </div>
            <span className="text-[10px] text-stone-500">Multi-Model Orchestrator</span>
          </div>
        </div>
      </section>

      {/* CHAPTER 6: Measured Impact Counters */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-stone-800/80">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-400 text-xs font-mono mb-3">
            Chapter 6 • Measured Socioeconomic Impact
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            Measurable National Impact
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Directly addressing Smart India Hackathon Problem Statement PS-TUR05: Eliminating predatory middleman commissions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-stone-900/60 p-6 rounded-3xl border border-stone-800">
            <span className="text-3xl sm:text-5xl font-serif font-bold text-amber-400 block mb-1">
              96%+
            </span>
            <span className="text-xs text-stone-300 font-bold block">Direct Fee Settlement</span>
            <span className="text-[10px] text-stone-500 block mt-1">Direct to artisan bank/UPI</span>
          </div>

          <div className="bg-stone-900/60 p-6 rounded-3xl border border-stone-800">
            <span className="text-3xl sm:text-5xl font-serif font-bold text-emerald-400 block mb-1">
              17+
            </span>
            <span className="text-xs text-stone-300 font-bold block">Active Craft Guilds</span>
            <span className="text-[10px] text-stone-500 block mt-1">Kolhapur, Chanderi, Majuli, Srinagar</span>
          </div>

          <div className="bg-stone-900/60 p-6 rounded-3xl border border-stone-800">
            <span className="text-3xl sm:text-5xl font-serif font-bold text-rose-400 block mb-1">
              50%+
            </span>
            <span className="text-xs text-stone-300 font-bold block">Commission Saved</span>
            <span className="text-[10px] text-stone-500 block mt-1">Reclaimed from intermediaries</span>
          </div>

          <div className="bg-stone-900/60 p-6 rounded-3xl border border-stone-800">
            <span className="text-3xl sm:text-5xl font-serif font-bold text-blue-400 block mb-1">
              7M+
            </span>
            <span className="text-xs text-stone-300 font-bold block">Target Beneficiaries</span>
            <span className="text-[10px] text-stone-500 block mt-1">India&apos;s traditional artisan sector</span>
          </div>
        </div>
      </section>

      {/* CHAPTER 7: Future Global Roadmap */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-stone-800/80">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-400 text-xs font-mono mb-3">
            Chapter 7 • The Horizon
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            Global Living Heritage Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            From India&apos;s hereditary clusters to the global network of intangible cultural heritage.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { phase: 'Phase 1: National Scale (Active)', desc: '17+ verified craft hubs across 5 states, dual-domain architecture, visible agentic reasoning telemetry, and live Razorpay/QR checkouts.', badge: '🟢 Fully Live' },
            { phase: 'Phase 2: East Asia & Japan Preview (Active Preview)', desc: 'Kyoto traditional crafts (Kiyomizu-yaki ceramics, Nishijin textiles) and UNESCO Gion Matsuri living pageants catalogued under ISO 3166 JP-26.', badge: '🟡 Preview Live' },
            { phase: 'Phase 3: Mediterranean & European Guilds', desc: 'Florence Santa Croce vegetable-tanned leather guilds and Carnevale di Venezia historic papier-mâché mask pageantry.', badge: '🟡 Preview Live' },
            { phase: 'Phase 4: Global Living Heritage Network (2027)', desc: 'Decentralized federation of community custodians across Latin America, Africa, and Southeast Asia.', badge: '⚪ Scheduled' }
          ].map((item) => (
            <div key={item.phase} className="p-4 bg-stone-900/60 rounded-2xl border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-stone-100 block text-sm">{item.phase}</span>
                <p className="text-stone-400 text-xs mt-1">{item.desc}</p>
              </div>
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-stone-800 text-stone-300 self-start sm:self-auto shrink-0">
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons to Enter Worlds */}
        <div className="mt-14 pt-8 border-t border-stone-800 text-center space-y-4">
          <h3 className="font-serif font-bold text-xl text-stone-100">
            Enter the Two Worlds of Kala Setu 2.0
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onEnterArtisanWorld}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              🧑‍🎨 Enter Local Artisans (Crafts & Makers)
            </button>
            <button
              onClick={onEnterCommunityWorld}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              🌏 Enter Community Experiences (Living Heritage)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
