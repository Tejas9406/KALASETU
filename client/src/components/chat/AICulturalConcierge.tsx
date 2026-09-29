import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Mic, MicOff, Volume2, X, Sparkles, 
  CornerDownLeft, MessageSquare, HelpCircle, Navigation, Terminal, Network
} from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';
import { getApiUrl } from '../../config/api';
import { AgenticReasoningTerminal } from '../telemetry/AgenticReasoningTerminal';
import { TelemetryTrace } from '../../types';

interface AICulturalConciergeProps {
  language: SupportedLanguage;
  onStartShowSteps: () => void;
  onOpenHelp: () => void;
}

export const AICulturalConcierge: React.FC<AICulturalConciergeProps> = ({
  language,
  onStartShowSteps,
  onOpenHelp
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<'artisan' | 'community'>('artisan');
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentTrace, setCurrentTrace] = useState<TelemetryTrace | null>(null);

  const [messages, setMessages] = useState<Array<{ 
    role: 'user' | 'assistant'; 
    text: string; 
    domain?: string;
    telemetry?: TelemetryTrace;
    showStepsBtn?: boolean; 
    showHelpBtn?: boolean 
  }>>([
    {
      role: 'assistant',
      text: 'Namaste! I am Kala Setu Saathi. Ask me about verified artisan workshops in Kolhapur, Chanderi, Majuli, and Srinagar, or switch to Community AI for living heritage festivals and rituals.',
      showStepsBtn: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Auto-scroll chat window to latest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, showTerminal]);

  // Web Speech API Voice Recognition
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  // Text-to-Speech playback
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const lower = userText.toLowerCase();
    const isAskingHowToBook = lower.includes('book') || lower.includes('how to') || lower.includes('steps') || lower.includes('guide') || lower.includes('बुक');
    const isAskingScam = lower.includes('scam') || lower.includes('fraud') || lower.includes('cheat') || lower.includes('fake') || lower.includes('धोखा');

    try {
      const res = await fetch(getApiUrl('/api/chat/message'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          language,
          domain: selectedDomain,
          history: messages.map(m => ({ role: m.role, content: m.text }))
        })
      });

      const data = await res.json();
      if (data.success) {
        if (data.telemetry) {
          setCurrentTrace(data.telemetry);
        }

        setMessages((prev) => [
          ...prev, 
          { 
            role: 'assistant', 
            text: data.reply,
            domain: data.domain,
            telemetry: data.telemetry,
            showStepsBtn: isAskingHowToBook,
            showHelpBtn: isAskingScam
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { 
            role: 'assistant', 
            text: 'I am happy to guide you through verified craft workshops and living community traditions!',
            showStepsBtn: isAskingHowToBook,
            showHelpBtn: isAskingScam
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'assistant', 
          text: 'Our cultural archives are online and ready! You can explore verified craft ateliers and living traditions directly.',
          showStepsBtn: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button with Icon only and subtle pulse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={t.aiSaathiTooltip}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-[#2D4A3E] to-[#1A332A] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(45,74,62,0.45)] hover:scale-110 active:scale-95 transition-all border-2 border-amber-400/70 group"
      >
        <Sparkles className="w-6 h-6 text-amber-300 animate-pulse group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-9 right-0 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          {t.aiSaathiTooltip}
        </span>
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[440px] max-h-[640px] h-[78vh] z-50 bg-[#FDFBF7] rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Top Bar with Domain Switcher */}
          <div className="bg-[#2D4A3E] text-white p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-300/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white">Kala Setu Saathi</h3>
                  <p className="text-[10px] text-emerald-200">Dual-Domain Cultural Concierge</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {currentTrace && (
                  <button
                    onClick={() => setShowTerminal(!showTerminal)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-colors flex items-center gap-1 border ${
                      showTerminal 
                        ? 'bg-amber-400 text-stone-900 border-amber-400' 
                        : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
                    }`}
                    title="Toggle Agentic Reasoning Terminal"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Telemetry</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Domain Selector Pills inside Concierge */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-black/25 text-xs font-bold">
              <button
                onClick={() => setSelectedDomain('artisan')}
                className={`py-1 rounded-lg text-[11px] transition-all flex items-center justify-center gap-1 ${
                  selectedDomain === 'artisan'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span>🧑‍🎨</span>
                <span>Artisan AI</span>
              </button>
              <button
                onClick={() => setSelectedDomain('community')}
                className={`py-1 rounded-lg text-[11px] transition-all flex items-center justify-center gap-1 ${
                  selectedDomain === 'community'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span>🌏</span>
                <span>Community AI</span>
              </button>
            </div>
          </div>

          {/* Embedded Agentic Reasoning Terminal Drawer */}
          {showTerminal && currentTrace && (
            <div className="p-2 bg-[#0B100E] border-b border-stone-800">
              <AgenticReasoningTerminal
                trace={currentTrace}
                isOpen={true}
                onToggle={() => setShowTerminal(!showTerminal)}
                title="Active Query Trace"
              />
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FDFBF7]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm shadow-xs relative group ${
                    m.role === 'user'
                      ? 'bg-[#D84315] text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  {/* Actions for Assistant Messages */}
                  {m.role === 'assistant' && (
                    <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => speakText(m.text)}
                        className="text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Listen</span>
                      </button>

                      {m.telemetry && (
                        <button
                          onClick={() => {
                            setCurrentTrace(m.telemetry!);
                            setShowTerminal(true);
                          }}
                          className="text-[#D84315] hover:underline font-mono text-[10px] flex items-center gap-1"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Trace ({m.telemetry.total_duration_ms}ms)</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Contextual Action Buttons */}
                {m.showStepsBtn && (
                  <button
                    onClick={onStartShowSteps}
                    className="mt-1.5 self-start flex items-center gap-1.5 text-xs font-bold text-[#2D4A3E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Show Me Interactive Guide →</span>
                  </button>
                )}

                {m.showHelpBtn && (
                  <button
                    onClick={onOpenHelp}
                    className="mt-1.5 self-start flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-full shadow-xs transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Open Grievance &amp; SOS Dispatch</span>
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-stone-500 text-xs italic bg-white border border-stone-200 px-3 py-2 rounded-2xl w-fit">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>{selectedDomain === 'artisan' ? 'Consulting artisan guild archives...' : 'Traversing cultural knowledge graph...'}</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-stone-100/90 border-t border-stone-200/80 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {selectedDomain === 'artisan' ? (
              <>
                <button
                  onClick={() => setInputMessage('How to book a Kolhapuri leathercraft masterclass?')}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-amber-500 text-stone-700 shrink-0 transition-colors"
                >
                  👞 Kolhapuri Leather
                </button>
                <button
                  onClick={() => setInputMessage('Tell me about Chanderi pit-loom silk weaving in Pranpur.')}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-amber-500 text-stone-700 shrink-0 transition-colors"
                >
                  🧵 Chanderi Silk
                </button>
                <button
                  onClick={() => setInputMessage('Who are the verified bamboo mask artisans on Majuli Island?')}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-amber-500 text-stone-700 shrink-0 transition-colors"
                >
                  🎋 Majuli Masks
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setInputMessage('What is the sacred significance of Kokan Shimga Palakhi?')}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-emerald-500 text-stone-700 shrink-0 transition-colors"
                >
                  🎉 Kokan Shimga
                </button>
                <button
                  onClick={() => setInputMessage('When is Dhunuchi Naach celebrated in Kolkata and what are the respect rules?')}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-emerald-500 text-stone-700 shrink-0 transition-colors"
                >
                  🪔 Dhunuchi Naach
                </button>
                <button
                  onClick={() => setInputMessage('Tell me about the 17 tribes Hornbill Cultural Festival.')}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-emerald-500 text-stone-700 shrink-0 transition-colors"
                >
                  🏹 Hornbill Festival
                </button>
              </>
            )}
          </div>

          {/* Input Controls Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-full transition-colors ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={selectedDomain === 'artisan' ? 'Ask Artisan AI about crafts, workshops...' : 'Ask Community AI about festivals, rituals...'}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-2.5 bg-[#D84315] hover:bg-[#BF360C] disabled:opacity-40 text-white rounded-full transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
