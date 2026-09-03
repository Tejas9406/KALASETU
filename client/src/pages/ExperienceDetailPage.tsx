import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, MapPin, Clock, Users, ShieldCheck, 
  Award, Heart, Star, CheckCircle, Calendar,
  Sparkles, MessageSquare, Plus, Camera, X, ThumbsUp
} from 'lucide-react';
import { Experience, Artisan } from '../types';
import { SupportedLanguage, translations } from '../utils/translations';

interface ExperienceDetailPageProps {
  experience: Experience;
  onBack: () => void;
  onBookNow: (exp: Experience) => void;
  onSelectArtisan: (artisanId: string) => void;
  language: SupportedLanguage;
}

interface ReviewItem {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
  verified: boolean;
  photos?: string[];
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({
  experience,
  onBack,
  onBookNow,
  onSelectArtisan,
  language
}) => {
  const t = translations[language];
  const [activeImage, setActiveImage] = useState(experience.cover_image);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('Aarav Sharma');
  const [newPhoto, setNewPhoto] = useState('');

  const gallery = [
    experience.cover_image,
    '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_07.jpg',
    '/assets/images/02-Handloom/Handloom_in_an_exhibition_002.jpg',
    '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg'
  ];

  // Fetch reviews for this experience
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/experiences/${experience.id}`);
      const data = await res.json();
      if (data.success && data.experience?.reviews) {
        setReviews(data.experience.reviews);
      } else {
        // Fallback default reviews
        setReviews([
          {
            id: 'rev_1',
            reviewer_name: 'Rohan Deshmukh',
            rating: 5,
            comment: 'Incredible workshop! The master artisan taught us the whole traditional process. Left with my own handmade keepsake!',
            created_at: '2026-08-25T10:30:00Z',
            verified: true,
            photos: [experience.cover_image]
          },
          {
            id: 'rev_2',
            reviewer_name: 'Priya Mehta',
            rating: 5,
            comment: 'Very authentic hereditary experience. The workshop was comfortable and we also learned about the rich history.',
            created_at: '2026-08-20T14:15:00Z',
            verified: true,
            photos: []
          }
        ]);
      }
    } catch (e) {
      console.warn('Review fetch fallback:', e);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    setActiveImage(experience.cover_image);
  }, [experience.id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev_${Date.now()}`,
      reviewer_name: reviewerName || 'Verified Traveler',
      rating: newRating,
      comment: newComment.trim(),
      created_at: new Date().toISOString(),
      verified: true,
      photos: newPhoto ? [newPhoto] : []
    };

    try {
      await fetch(`/api/experiences/${experience.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewerName,
          rating: newRating,
          comment: newComment,
          photos: newPhoto ? [newPhoto] : []
        })
      });
    } catch (err) {
      console.warn('Submitted to local state fallback');
    }

    setReviews([newRev, ...reviews]);
    setNewComment('');
    setNewPhoto('');
    setIsReviewModalOpen(false);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#D84315] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Discovery</span>
      </button>

      {/* Main Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Gallery & Details (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visual Showcase */}
          <div className="space-y-3">
            <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-md border border-stone-200">
              <img
                src={activeImage}
                alt={experience.title}
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src = '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg';
                }}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#2D4A3E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {experience.category}
                </span>
                {experience.odop_tag && (
                  <span className="bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    ODOP Recognized
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-[#D84315] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-[#D84315] font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>{experience.location_name || experience.district}, {experience.state}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D4A3E] leading-tight">
              {experience.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{avgRating} ({reviews.length} Verified Reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>{experience.duration_mins || 150} Mins</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-stone-400" />
                <span>Max {experience.max_participants || 8} Participants</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Safety</span>
              </div>
            </div>
          </div>

          {/* Experience Narrative */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#2D4A3E]">
              About the Living Heritage Masterclass
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {experience.description}
            </p>

            <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F5F0E6] rounded-2xl">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#2D4A3E] mb-2">
                  What's Included:
                </h4>
                <ul className="text-xs space-y-1.5 text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Raw authentic craft materials provided</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>One-on-one guidance by master artisan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Handmade keepsake to take home</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Regional folk storytelling & refreshments</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#FDFBF7] border border-stone-200 rounded-2xl">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#D84315] mb-2">
                  Accessibility & Safety:
                </h4>
                <ul className="text-xs space-y-1.5 text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Women-friendly safe atelier environment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ground floor seated access (Elderly-friendly)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Clean drinking water & first aid available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Master Artisan Bio Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2D4A3E] text-white font-serif text-xl font-bold flex items-center justify-center border-2 border-[#D84315] overflow-hidden shrink-0">
                {experience.artisan_avatar ? (
                  <img src={experience.artisan_avatar} alt={experience.artisan_name} className="w-full h-full object-cover" />
                ) : (
                  (experience.artisan_name || 'A').charAt(0)
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Master Craftsman</span>
                <h3 className="font-serif font-bold text-lg text-stone-800">
                  {experience.artisan_name || 'Verified Master Artisan'}
                </h3>
                <p className="text-xs text-stone-500">
                  {experience.location_name || experience.district}, {experience.state}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectArtisan(experience.artisan_id)}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-5 py-2.5 rounded-full transition-colors shrink-0"
            >
              View Full Artisan Profile →
            </button>
          </div>

          {/* 🌟 Ratings & Reviews Section (P0 Requirement) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#2D4A3E]">
                  {t.reviewsTitle}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-stone-800">{avgRating} out of 5</span>
                  <span className="text-xs text-stone-400">({reviews.length} tourist reviews)</span>
                </div>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-2 bg-[#D84315] hover:bg-[#BF360C] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-transform hover:scale-105 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{t.writeReview}</span>
              </button>
            </div>

            {/* Review Cards Feed */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-bold text-xs">
                        {rev.reviewer_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                          <span>{rev.reviewer_name}</span>
                          {rev.verified && (
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              ✓ Verified Tourist Pass
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {new Date(rev.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Review Photos */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex gap-2 pt-1">
                      {rev.photos.map((p, pIdx) => (
                        <img
                          key={pIdx}
                          src={p}
                          alt="review photo"
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget (1 Col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
            <div>
              <span className="text-xs text-stone-400 block uppercase font-bold tracking-wider">
                Direct Workshop Pass
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#D84315]">
                  ₹{experience.price_inr}
                </span>
                <span className="text-xs text-stone-500 font-medium">/ seat</span>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="bg-[#F5F0E6] p-4 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#2D4A3E]">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% Verified Authentic Experience</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Zero middleman commissions. Your fee directly supports rural master artisans and their families.
              </p>
            </div>

            {/* Quick Details List */}
            <div className="space-y-3 text-xs text-stone-600 border-t border-b border-stone-100 py-4">
              <div className="flex justify-between">
                <span>Workshop Duration:</span>
                <span className="font-semibold text-stone-800">{experience.duration_mins} mins</span>
              </div>
              <div className="flex justify-between">
                <span>Craft Category:</span>
                <span className="font-semibold text-stone-800">{experience.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-semibold text-stone-800">{experience.district}</span>
              </div>
            </div>

            {/* Call To Action */}
            <button
              id="detail-book-now-btn"
              onClick={() => onBookNow(experience)}
              className="w-full bg-[#D84315] hover:bg-[#BF360C] text-white font-bold py-4 rounded-full text-base shadow-lg transition-transform hover:scale-105"
            >
              Book Workshop Seat Now →
            </button>

            <p className="text-[11px] text-center text-stone-400">
              Instant confirmation with digital QR pass.
            </p>
          </div>
        </div>
      </div>

      {/* ⭐ Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2D4A3E]">
                Review Your Workshop Experience
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 hover:bg-stone-100 rounded-full text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Overall Rating:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-700 ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Feedback / Story:
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share what you crafted, how the artisan guided you, and tips for future travelers..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#2D4A3E]"
                />
              </div>

              {/* Photo Attachment URL */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Attach Photo URL (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="https://... or sample craft photo"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setNewPhoto(experience.cover_image)}
                    className="px-3 py-2 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-200 shrink-0"
                  >
                    Use Workshop Photo
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#D84315] hover:bg-[#BF360C] text-white py-2.5 rounded-full text-xs font-bold shadow-md"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
