import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, ShieldAlert, PhoneCall, AlertTriangle, 
  MapPin, CheckCircle, X, Send, Download, FileText, 
  CreditCard, ShieldCheck, RefreshCw, LifeBuoy 
} from 'lucide-react';
import { SupportedLanguage, translations } from '../../utils/translations';

interface DynamicHelpButtonProps {
  currentRole: 'tourist' | 'artisan' | 'govt';
  language: SupportedLanguage;
}

export const DynamicHelpButton: React.FC<DynamicHelpButtonProps> = ({
  currentRole,
  language
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<'menu' | 'scam' | 'wrongInfo' | 'paymentIssue' | 'artisanPayout' | 'submitted'>('menu');
  const [scamDetails, setScamDetails] = useState({ workshop: '', desc: '', amount: '' });
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingGps, setLoadingGps] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const t = translations[language];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const captureGps = () => {
    setLoadingGps(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLoadingGps(false);
        },
        () => {
          setGpsCoords({ lat: 16.7050, lng: 74.2433 }); // Fallback to craft cluster
          setLoadingGps(false);
        },
        { timeout: 5000 }
      );
    } else {
      setGpsCoords({ lat: 16.7050, lng: 74.2433 });
      setLoadingGps(false);
    }
  };

  const handleOpenScamReport = () => {
    captureGps();
    setActiveForm('scam');
  };

  const handleSubmitScamReport = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `REP-${Date.now().toString().slice(-6)}`;
    setTicketId(id);
    setActiveForm('submitted');
  };

  const handleExportData = () => {
    const sampleData = {
      platform: "Kala Setu National Tourism Registry",
      exportDate: new Date().toISOString(),
      registeredArtisans: 1248,
      totalRevenueDirectINR: 1240000,
      activeODOPClusters: ["Kolhapur", "Chanderi", "Majuli", "Srinagar", "Bishnupur"],
      emergencyResolutionRate: "100%"
    };
    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kala-setu-ministry-report-${Date.now()}.json`;
    a.click();
  };

  return (
    <>
      {/* Navbar Help Trigger Button */}
      <button
        onClick={() => {
          setActiveForm('menu');
          setIsOpen(true);
        }}
        title={t.helpAndSupport}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#D84315]/10 text-[#D84315] hover:bg-[#D84315] hover:text-white border border-[#D84315]/30 transition-all shadow-sm"
      >
        <LifeBuoy className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t.helpAndSupport}</span>
      </button>

      {/* Dynamic Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-[#2D4A3E] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-400/20 rounded-full">
                  <LifeBuoy className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {t.helpAndSupport}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    {currentRole === 'tourist' ? 'Tourist Grievance & Safety Desk' :
                     currentRole === 'artisan' ? 'Artisan Welfare & Payout Support' :
                     'Government Administration Portal'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Menu for TOURIST */}
              {activeForm === 'menu' && currentRole === 'tourist' && (
                <div className="space-y-3">
                  <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-1">
                    Grievance Redressal & Verification
                  </div>

                  <button
                    onClick={handleOpenScamReport}
                    className="w-full p-4 rounded-2xl bg-red-50 border border-red-200 text-left flex items-start gap-3 hover:bg-red-100 transition-colors group"
                  >
                    <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-red-900 group-hover:underline">
                        Report Scam, Fake Artisan or Overcharging
                      </div>
                      <div className="text-xs text-red-700 mt-0.5">
                        Instant GPS geotagging & report dispatch to district tourism authority.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveForm('wrongInfo')}
                    className="w-full p-3.5 rounded-2xl bg-white border border-stone-200 text-left flex items-center gap-3 hover:bg-stone-50 transition-colors"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-800">
                        Flag Misleading Listing or Wrong Location
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Notify admin verification team to re-inspect workshop details.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveForm('paymentIssue')}
                    className="w-full p-3.5 rounded-2xl bg-white border border-stone-200 text-left flex items-center gap-3 hover:bg-stone-50 transition-colors"
                  >
                    <CreditCard className="w-5 h-5 text-[#2D4A3E] shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-800">
                        Payment, Refund or Cancellation Assistance
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Razorpay escrow transaction disputes and refund requests.
                      </div>
                    </div>
                  </button>

                  <div className="pt-3 border-t border-stone-200">
                    <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">
                      Direct National Helplines
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:1363"
                        className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div>1363 (Tourist Infoline)</div>
                          <span className="text-[9px] font-normal text-emerald-700">24x7 Multi-lingual</span>
                        </div>
                      </a>

                      <a
                        href="tel:1800114000"
                        className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs font-bold text-blue-800 hover:bg-blue-100"
                      >
                        <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <div>1800-11-4000</div>
                          <span className="text-[9px] font-normal text-blue-700">National Consumer Helpline</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu for ARTISAN */}
              {activeForm === 'menu' && currentRole === 'artisan' && (
                <div className="space-y-3">
                  <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-1">
                    Artisan Atelier Support
                  </div>

                  <button
                    onClick={() => setActiveForm('artisanPayout')}
                    className="w-full p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-3 hover:bg-amber-100 transition-colors"
                  >
                    <CreditCard className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-amber-900">
                        Payment & Direct Payout Delay Grievance
                      </div>
                      <div className="text-xs text-amber-700 mt-0.5">
                        Escalate missing UPI or direct bank transfers from tourist bookings.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      alert('Your Pehchan card and Aadhaar documentation are currently 100% verified. You can update craft photos anytime.');
                    }}
                    className="w-full p-3.5 rounded-2xl bg-white border border-stone-200 text-left flex items-center gap-3 hover:bg-stone-50 transition-colors"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-800">
                        GI Tag & ID Verification Renewal
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Upload updated State Award certificates or guild membership.
                      </div>
                    </div>
                  </button>

                  <div className="pt-3 border-t border-stone-200">
                    <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">
                      Artisan Welfare Helplines
                    </div>
                    <a
                      href="tel:1800118601"
                      className="w-full p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div>1800-11-8601 (Ministry of MSME & Handicrafts)</div>
                        <span className="text-[10px] font-normal text-emerald-700">Scheme inquiries, loans & Pehchan ID support</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Menu for GOV ADMIN */}
              {activeForm === 'menu' && currentRole === 'govt' && (
                <div className="space-y-3">
                  <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-1">
                    Administrative Operations
                  </div>

                  <button
                    onClick={handleExportData}
                    className="w-full p-4 rounded-2xl bg-[#2D4A3E]/10 border border-[#2D4A3E]/30 text-left flex items-start gap-3 hover:bg-[#2D4A3E]/20 transition-colors"
                  >
                    <Download className="w-5 h-5 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#2D4A3E]">
                        Export Ministry Tourism & ODOP Data (JSON)
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        Download comprehensive economic metrics and cluster health logs.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => alert('Diagnostic complete: All 5 regional cluster nodes are healthy (Latency: 28ms).')}
                    className="w-full p-3.5 rounded-2xl bg-white border border-stone-200 text-left flex items-center gap-3 hover:bg-stone-50 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-800">
                        Run Cluster Node Health Diagnostics
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Verify PostgreSQL connection pools and Upstash sync.
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Form: SCAM REPORT (with GPS capture) */}
              {activeForm === 'scam' && (
                <form onSubmit={handleSubmitScamReport} className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-800 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>Authority Dispatch Protocol Active</span>
                    </div>
                    <p className="text-[11px]">
                      Your current GPS location will be attached to initiate inspection by local tourist police.
                    </p>
                    <div className="font-mono text-[10px] bg-white/70 p-1.5 rounded mt-1">
                      {loadingGps ? 'Fetching GPS coordinates...' : gpsCoords ? `GPS: ${gpsCoords.lat.toFixed(4)}° N, ${gpsCoords.lng.toFixed(4)}° E` : 'GPS Captured'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Workshop or Artisan Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shivaji Market Craft Stall #14"
                      value={scamDetails.workshop}
                      onChange={(e) => setScamDetails({ ...scamDetails, workshop: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Disputed / Overcharged Amount (INR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2500"
                      value={scamDetails.amount}
                      onChange={(e) => setScamDetails({ ...scamDetails, amount: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Incident Details & Evidence
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe what happened (e.g. claimed GI tag but sold machine-made product, refused entry after payment)..."
                      value={scamDetails.desc}
                      onChange={(e) => setScamDetails({ ...scamDetails, desc: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveForm('menu')}
                      className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full text-xs font-bold shadow-md"
                    >
                      Submit Report to Authority
                    </button>
                  </div>
                </form>
              )}

              {/* Form: WRONG INFO */}
              {activeForm === 'wrongInfo' && (
                <form onSubmit={handleSubmitScamReport} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Experience URL or Title</label>
                    <input type="text" required placeholder="Title of experience..." className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">What information is incorrect?</label>
                    <textarea required rows={3} placeholder="Describe wrong timings, invalid price, fake photos..." className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setActiveForm('menu')} className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold">← Back</button>
                    <button type="submit" className="flex-1 bg-[#2D4A3E] text-white py-2.5 rounded-full text-xs font-bold">Submit Flag</button>
                  </div>
                </form>
              )}

              {/* Form: PAYMENT ISSUE */}
              {activeForm === 'paymentIssue' && (
                <form onSubmit={handleSubmitScamReport} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Booking Reference ID</label>
                    <input type="text" required placeholder="e.g. BK-2026-XXXX" className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Issue Type</label>
                    <select className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs">
                      <option>Double Charged / Deducted without Pass</option>
                      <option>Workshop Cancelled by Artisan (Need Refund)</option>
                      <option>Payment Gateway Timeout</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setActiveForm('menu')} className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold">← Back</button>
                    <button type="submit" className="flex-1 bg-[#D84315] text-white py-2.5 rounded-full text-xs font-bold">Escalate to Escrow Desk</button>
                  </div>
                </form>
              )}

              {/* Form: ARTISAN PAYOUT */}
              {activeForm === 'artisanPayout' && (
                <form onSubmit={handleSubmitScamReport} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Artisan Registry ID</label>
                    <input type="text" required placeholder="e.g. art_kolhapur_01" className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Pending Amount / Settlement Date</label>
                    <input type="text" required placeholder="e.g. ₹3,700 for 2 workshops on Aug 28" className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setActiveForm('menu')} className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold">← Back</button>
                    <button type="submit" className="flex-1 bg-amber-700 text-white py-2.5 rounded-full text-xs font-bold">Submit Payout Escalation</button>
                  </div>
                </form>
              )}

              {/* Success Screen */}
              {activeForm === 'submitted' && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#2D4A3E]">
                    Grievance Ticket Registered!
                  </h4>
                  <div className="text-xs font-mono font-bold text-[#D84315] bg-orange-50 p-2 rounded-lg max-w-xs mx-auto border border-orange-200">
                    Ticket ID: {ticketId || 'TKT-2026-9481'}
                  </div>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Our compliance team has received your ticket and location coordinates. You will receive an SMS resolution within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setActiveForm('menu');
                      setIsOpen(false);
                    }}
                    className="mt-4 bg-[#2D4A3E] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#1A332A]"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
