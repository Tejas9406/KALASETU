import React, { useState } from 'react';
import { Sparkles, X, ChevronRight, ChevronLeft, CheckCircle2, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShowStepsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ShowStepsOverlay: React.FC<ShowStepsOverlayProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      title: "Step 1: Discover & Filter Heritage Crafts",
      targetId: "hero-search-input",
      tab: "home",
      description: "Search by craft lineage, artisan name, or city. Filter through Kolhapuri leather, Chanderi silks, Assam bamboo masks, and Kashmir woodcarving.",
      instruction: "Use the top categories ribbon or search bar to find ancestral workshops.",
      pointerPosition: "top"
    },
    {
      title: "Step 2: Inspect Atelier & Artisan Trust Score",
      targetId: "nav-discover",
      tab: "discover",
      description: "Every master artisan has an audited Trust Score (0-100%) backed by National Pehchan Card, GI Tag verification, and ancestral heritage.",
      instruction: "Click on any workshop card to view the master artisan's story, photos, and safety standards.",
      pointerPosition: "bottom"
    },
    {
      title: "Step 3: Direct Booking & Slot Reservation",
      targetId: "detail-book-now-btn",
      tab: "discover",
      description: "Pick your preferred workshop date, time slot, and number of participants with transparent pricing.",
      instruction: "Zero middlemen deductions: 96%+ of the workshop fee goes straight to the artisan.",
      pointerPosition: "right"
    },
    {
      title: "Step 4: Instant Digital QR Pass & Arrival Verification",
      targetId: "nav-bookings",
      tab: "bookings",
      description: "Receive your encrypted digital pass with QR code immediately. Present your pass upon arrival at the artisan's atelier.",
      instruction: "Access your confirmed itinerary and GPS navigation anytime under 'My Bookings'.",
      pointerPosition: "center"
    }
  ];

  const current = steps[stepIndex];

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      if (steps[nextIdx].tab) {
        onNavigateTab(steps[nextIdx].tab);
      }
    } else {
      // Finished all steps!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onClose();
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      const prevIdx = stepIndex - 1;
      setStepIndex(prevIdx);
      if (steps[prevIdx].tab) {
        onNavigateTab(steps[prevIdx].tab);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] pointer-events-auto bg-black/65 backdrop-blur-[3px] flex items-center justify-center p-4">
      {/* Top Banner with Cancel / Exit anytime */}
      <div className="absolute top-5 right-6 z-10 flex items-center gap-3">
        <span className="text-xs text-white/80 font-medium hidden sm:inline">
          Interactive Guide Active
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md border border-white/30 transition-all shadow-lg"
          title="Exit Guide"
        >
          <X className="w-4 h-4" />
          <span>Exit Guide</span>
        </button>
      </div>

      {/* Main Guided Step Card */}
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 relative">
        {/* Step Indicator Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D84315] uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step {stepIndex + 1} of {steps.length}</span>
          </div>

          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === stepIndex ? 'w-6 bg-[#2D4A3E]' : 'w-2 bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D4A3E] mb-2 leading-tight">
          {current.title}
        </h3>

        {/* Step Description */}
        <p className="text-stone-700 text-sm leading-relaxed mb-4">
          {current.description}
        </p>

        {/* Action Prompt Box */}
        <div className="p-4 bg-[#F5F0E6] rounded-2xl border border-amber-200/80 mb-6 flex items-start gap-3">
          <Navigation className="w-5 h-5 text-[#D84315] shrink-0 mt-0.5 animate-bounce" />
          <div className="text-xs font-semibold text-stone-800">
            {current.instruction}
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-800 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 bg-[#D84315] hover:bg-[#BF360C] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
          >
            <span>{stepIndex === steps.length - 1 ? 'Finish & Explore 🎉' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
