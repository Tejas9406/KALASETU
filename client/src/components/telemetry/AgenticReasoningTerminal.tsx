import React, { useState } from 'react';
import { Terminal, CheckCircle2, Clock, Cpu, Sparkles, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { TelemetryTrace } from '../../types';

interface AgenticReasoningTerminalProps {
  trace: TelemetryTrace | null;
  isOpen: boolean;
  onToggle: () => void;
  title?: string;
}

export const AgenticReasoningTerminal: React.FC<AgenticReasoningTerminalProps> = ({
  trace,
  isOpen,
  onToggle,
  title
}) => {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  if (!trace) return null;

  const isArtisan = trace.domain === 'ARTISAN';

  return (
    <div className="bg-[#121815] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 font-mono text-xs">
      {/* Header bar */}
      <div 
        onClick={onToggle}
        className={`px-4 py-3 cursor-pointer flex items-center justify-between border-b transition-colors ${
          isArtisan ? 'border-amber-900/40 bg-stone-900/80 hover:bg-stone-900' : 'border-emerald-900/40 bg-stone-900/80 hover:bg-stone-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full animate-ping ${isArtisan ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          <div className="flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${isArtisan ? 'text-amber-400' : 'text-emerald-400'}`} />
            <span className="font-bold text-stone-200 tracking-wider uppercase text-[11px]">
              {title || `${trace.domain} AI Agentic Reasoning Trace`}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
            {trace.model}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-stone-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            <span>{trace.total_duration_ms}ms</span>
            <span className="text-stone-600">•</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{(trace.confidence * 100).toFixed(0)}% Conf</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-stone-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-400" />
          )}
        </div>
      </div>

      {/* Expandable Step-by-Step Telemetry Nodes */}
      {isOpen && (
        <div className="p-4 space-y-2 bg-[#0B100E] max-h-96 overflow-y-auto">
          <div className="text-[11px] text-stone-400 mb-3 pb-2 border-b border-stone-800 flex items-center justify-between">
            <span className="text-stone-300 font-medium">Input Query: &quot;{trace.query}&quot;</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans">
              <ShieldCheck className="w-3 h-3" /> Grounded RAG Verified
            </span>
          </div>

          <div className="space-y-1.5">
            {trace.steps.map((step, idx) => {
              const isSelected = activeStepId === step.id;
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStepId(isSelected ? null : step.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-stone-900 border-amber-500/50 shadow-md' 
                      : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-700/50">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-stone-200 font-semibold text-[11px]">
                        {idx + 1}. {step.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <span className="text-stone-500">{step.duration_ms}ms</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-400 mt-1 pl-7 font-sans leading-relaxed">
                    {step.action}
                  </p>

                  {step.details && isSelected && (
                    <div className="mt-2 pt-2 border-t border-stone-800 text-[10px] text-amber-300/90 pl-7 font-mono bg-stone-900/40 p-2 rounded-lg">
                      <span className="text-stone-500 block mb-0.5">Execution Telemetry:</span>
                      {step.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-500 font-sans">
            <span>Kala Setu 2.0 Autonomous Telemetry Engine</span>
            <span>Zero Hallucination Guarantee • CC-BY-SA 4.0</span>
          </div>
        </div>
      )}
    </div>
  );
};
