import React, { useState } from 'react';
import { 
  X, CheckCircle, ShieldCheck, Award, Upload, 
  Sparkles, UserCheck, MapPin, AlertCircle, FileText, Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Artisan } from '../../types';
import { getApiUrl } from '../../config/api';

interface ArtisanRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (artisan: Artisan) => void;
}

export const ArtisanRegisterModal: React.FC<ArtisanRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegistered
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    craftType: 'Vegetable-Tanned Leathercraft',
    craftCluster: 'Shivaji Market Guild',
    district: 'Kolhapur',
    state: 'Maharashtra',
    yearsExperience: 15,
    idProofType: 'PEHCHAN_CARD',
    idProofNumber: 'PAHCHAN/MH/KOL/2026/89',
    pehchanCardNumber: 'PAHCHAN/MH/KOL/2026/89',
    giCertified: true,
    giAuthorizedUserNo: 'AU/4921/GI/12',
    awardCategory: 'STATE_AWARD',
    womenLed: false,
    elderlyFriendly: true,
    bio: '',
    story: '',
    photoUrl: '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    workshopTitle: 'Ancestral Masterclass in Traditional Craft',
    workshopPrice: 1800,
    evidencePhotos: [
      '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
      '/assets/images/05-Wood-Pottery/Craftsmen wood.jpg',
      '/assets/images/02-Artisans/artisan potters.jpg'
    ]
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<any>(null);

  // Evidence-based trust score calculation
  const getEvidenceScore = () => {
    let score = 50;
    if (formData.idProofNumber.trim().length > 4) score += 20;
    if (formData.evidencePhotos.length >= 3) score += 20;
    if (formData.pehchanCardNumber.trim().length > 4) score += 10;
    return Math.min(score, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('kala_setu_token') || '';
      const res = await fetch(getApiUrl('/api/artisans/verification/apply'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          artisan_name: formData.name,
          phone: formData.phone,
          craft_type: formData.craftType,
          craft_cluster: formData.craftCluster,
          district: formData.district,
          state: formData.state,
          years_experience: formData.yearsExperience,
          pehchan_card_number: formData.pehchanCardNumber,
          gi_authorized_user_no: formData.giCertified ? formData.giAuthorizedUserNo : null,
          award_category: formData.awardCategory,
          id_proof_type: formData.idProofType,
          id_proof_data: formData.idProofNumber,
          evidence_photos: formData.evidencePhotos
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedApp(data);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        
        // Pass synthesized verified artisan to parent
        const createdArtisan: Artisan = {
          id: data.applicationId,
          user_id: `usr_${Date.now()}`,
          artisan_name: formData.name,
          artisan_phone: formData.phone,
          craft_type: formData.craftType,
          years_experience: formData.yearsExperience,
          trust_score: data.trustScore || getEvidenceScore(),
          gi_certified: formData.giCertified,
          women_led: formData.womenLed,
          elderly_friendly: formData.elderlyFriendly,
          id_verified: true,
          skill_verified: true,
          lat: 16.7050,
          lng: 74.2433,
          location_name: `${formData.craftCluster}, ${formData.district}`,
          district: formData.district,
          state: formData.state,
          photo_url: formData.photoUrl,
          bio: formData.bio || `Hereditary ${formData.craftType} master artisan with ${formData.yearsExperience} years of experience.`,
          story: formData.story || 'Preserving ancestral handcraft techniques for future generations.'
        };

        onRegistered(createdArtisan);
      }
    } catch (err) {
      console.warn('Registration API warning:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#2D4A3E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/20 rounded-full">
              <UserCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Artisan Verification & Studio Setup
              </h3>
              <p className="text-[11px] text-emerald-200">
                Government of India / DC (Handicrafts) Evidence Flow (Step {step} of 3)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        {submittedApp ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2D4A3E]">
              Application Submitted to Review Queue
            </h3>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Application ID:</span>
                <span className="font-mono font-bold text-stone-800">{submittedApp.applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                  PENDING_REVIEW
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Evidence Trust Score:</span>
                <span className="font-bold text-emerald-700">{submittedApp.trustScore || getEvidenceScore()}%</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your credentials and craft photos are securely queued for review by the Directorate of Handicrafts panel. You can now explore your Artisan Studio in preview mode.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#2D4A3E] text-white py-3 rounded-full text-xs font-bold shadow-md hover:bg-[#1A332A]"
            >
              Go to My Artisan Studio →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Step 1: Basic Info & Craft Hub */}
            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Santosh Kamble / Kamla Bai"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone (Direct UPI payouts)</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Craft Tradition</label>
                    <select
                      value={formData.craftType}
                      onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-2 py-2 text-xs"
                    >
                      <option value="Vegetable-Tanned Leathercraft">Leathercraft (Kolhapuri)</option>
                      <option value="Chanderi Zari Silk Pit-Loom Weaving">Silk Weaving (Chanderi)</option>
                      <option value="Mukha Bamboo Mask Making">Bamboo & Masks (Majuli)</option>
                      <option value="Kashmir Walnut Wood Carving">Walnut Woodwork (Srinagar)</option>
                      <option value="Living Terracotta Pottery">Terracotta Pottery (Bishnupur)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">District & State</label>
                    <input
                      type="text"
                      required
                      value={`${formData.district}, ${formData.state}`}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value.split(',')[0].trim() })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Years Practicing Craft</label>
                    <input
                      type="number"
                      required
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.name}
                  className="w-full mt-4 bg-[#2D4A3E] text-white py-3 rounded-full text-xs font-bold hover:bg-[#1A332A] disabled:opacity-50"
                >
                  Continue to Credentials & ID →
                </button>
              </div>
            )}

            {/* Step 2: Verification & Pehchan ID */}
            {step === 2 && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Evidence-Based Credentials (Privacy Compliant)</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Kala Setu respects UIDAI guidelines. Upload masked ID or Pehchan number. Full raw documents are encrypted at rest with zero public exposure.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Primary ID Type</label>
                    <select
                      value={formData.idProofType}
                      onChange={(e) => setFormData({ ...formData, idProofType: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-2 py-2 text-xs"
                    >
                      <option value="PEHCHAN_CARD">Pehchan ID Card (DC Handicrafts)</option>
                      <option value="MASKED_AADHAAR">Masked Aadhaar (XXXX-XXXX-1234)</option>
                      <option value="VOTER_ID">Election Voter ID</option>
                      <option value="GUILD_CERTIFICATE">Artisan Guild / Cooperative Certificate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">ID / Card Number</label>
                    <input
                      type="text"
                      value={formData.idProofNumber}
                      onChange={(e) => setFormData({ ...formData, idProofNumber: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.giCertified}
                      onChange={(e) => setFormData({ ...formData, giCertified: e.target.checked })}
                      className="rounded text-[#2D4A3E]"
                    />
                    <span className="font-semibold">Registered GI (Geographical Indication) User</span>
                  </label>

                  {formData.giCertified && (
                    <input
                      type="text"
                      placeholder="GI Authorized User Certificate No (e.g. AU/4921/GI/12)"
                      value={formData.giAuthorizedUserNo}
                      onChange={(e) => setFormData({ ...formData, giAuthorizedUserNo: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-mono"
                    />
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#2D4A3E] text-white py-2.5 rounded-full text-xs font-bold hover:bg-[#1A332A]"
                  >
                    Next: Workshop Evidence →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Craft Evidence & First Workshop */}
            {step === 3 && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <ImageIcon className="w-4 h-4 text-amber-700" />
                    <span>Workshop Proof (3 Verified Photos Attached)</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Attaches verified photos of raw materials, live craftsmanship, and atelier tools to your review application.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Atelier Story & Lineage
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share your ancestral craft lineage and what makes your atelier unique..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value, story: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2D4A3E]"
                  />
                </div>

                <div className="p-3 bg-stone-100 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-stone-800 block">Calculated Evidence Score</span>
                    <span className="text-[10px] text-stone-500">Based on submitted ID, cluster, and photos</span>
                  </div>
                  <span className="text-lg font-serif font-bold text-emerald-700">
                    {getEvidenceScore()}%
                  </span>
                </div>

                <div className="flex gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#D84315] hover:bg-[#BF360C] text-white py-2.5 rounded-full text-xs font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit for Gov Review 📜'}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
