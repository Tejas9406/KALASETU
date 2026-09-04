import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Mic, MicOff, Volume2, X, Sparkles, 
  CornerDownLeft, MessageSquare, HelpCircle, Navigation 
} from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';
import { getApiUrl } from '../../config/api';

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
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; showStepsBtn?: boolean; showHelpBtn?: boolean }>>([
    {
      role: 'assistant',
      text: 'Namaste! I am Kala Setu Saathi. Ask me about genuine artisan workshops in Kolhapur, Chanderi silks, Assam bamboo masks, or say "how to book" for an interactive tour.',
      showStepsBtn: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Auto-scroll chat window to latest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

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
          history: messages.map(m => ({ role: m.role, content: m.text }))
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev, 
          { 
            role: 'assistant', 
            text: data.reply,
            showStepsBtn: isAskingHowToBook,
            showHelpBtn: isAskingScam
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { 
            role: 'assistant', 
            text: 'I am happy to guide you through verified artisan workshops across Kolhapur, Chanderi, Majuli, Srinagar, and Bishnupur!',
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
          text: 'Our cultural archives are online and ready! You can explore verified ateliers directly or launch our interactive guide.',
          showStepsBtn: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sleek Floating Toggle Button with Icon only and subtle pulse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={t.aiSaathiTooltip}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-[#2D4A3E] to-[#1A332A] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(45,74,62,0.45)] hover:scale-110 active:scale-95 transition-all border-2 border-amber-400/70 group"
      >
        <Sparkles className="w-6 h-6 text-amber-300 animate-pulse group-hover:rotate-12 transition-transform" />
        {/* Tooltip on hover */}
        <span className="absolute -top-9 right-0 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          {t.aiSaathiTooltip}
        </span>
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[620px] h-[75vh] z-50 bg-[#FDFBF7] rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Top Bar */}
          <div className="bg-[#2D4A3E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-300/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">Kala Setu Saathi</h3>
                <p className="text-[11px] text-emerald-200">AI Cultural Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFBF7]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm relative group ${
                    m.role === 'user'
                      ? 'bg-[#D84315] text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  {/* Read Aloud button */}
                  {m.role === 'assistant' && (
                    <button
                      onClick={() => speakText(m.text)}
                      title="Read aloud"
                      className="absolute -bottom-2 -right-2 p-1 bg-stone-100 rounded-full border border-stone-200 text-stone-600 hover:text-[#2D4A3E] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Show Steps Trigger Button if assistant suggests it */}
                {m.showStepsBtn && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onStartShowSteps();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transition-transform hover:scale-105"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-700" />
                    <span>Show Steps (Interactive Guide) ✨</span>
                  </button>
                )}

                {/* Show Help Trigger if scam reported */}
                {m.showHelpBtn && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenHelp();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transition-transform hover:scale-105"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-red-700" />
                    <span>Open Help & Grievance Desk 🛡️</span>
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-stone-500 italic p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#D84315]" />
                <span>Consulting cultural records...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input & Voice Controls */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              title="Voice Input (Speech-to-Text)"
              className={`p-2.5 rounded-full border transition-all ${
                isListening
                  ? 'bg-red-500 text-white border-red-600 animate-pulse'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border-stone-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isListening ? 'Listening...' : 'Ask about crafts, or "how to book"...'}
              className="flex-1 bg-stone-50 text-stone-800 border border-stone-200 rounded-full px-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#2D4A3E]"
            />

            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 bg-[#2D4A3E] hover:bg-[#1A332A] disabled:opacity-50 text-white rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
