import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, ShieldCheck, QrCode, 
  CreditCard, CheckCircle2, X, Sparkles, MapPin 
} from 'lucide-react';
import { Experience, Booking } from '../../types';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  experience,
  isOpen,
  onClose,
  onBookingSuccess
}) => {
  if (!isOpen || !experience) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [selectedDate, setSelectedDate] = useState('2026-09-05');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 01:00 PM');
  const [participants, setParticipants] = useState(1);
  const [touristName, setTouristName] = useState('Aarav Sharma');
  const [touristPhone, setTouristPhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const totalPrice = experience.price_inr * participants;

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handleSimulatePayment = async () => {
    setLoading(true);

    try {
      // 1. Trigger Razorpay order creation on backend
      const orderRes = await fetch('/api/bookings/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceId: experience.id,
          participants,
          touristId: 'usr_demo_tourist'
        })
      });
      const orderData = await orderRes.json();

      // 2. Confirm booking in Neon DB with generated QR pass
      const confirmRes = await fetch('/api/bookings/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceId: experience.id,
          touristId: 'usr_demo_tourist',
          touristName,
          touristPhone,
          bookingDate: selectedDate,
          timeSlot: selectedSlot,
          participants,
          totalPrice,
          razorpayPaymentId: `pay_${Date.now()}_test`,
          razorpayOrderId: orderData?.order?.orderId || `ord_${Date.now()}`
        })
      });

      const confirmData = await confirmRes.json();
      if (confirmData.success) {
        setConfirmedBooking(confirmData.booking);
        setStep('confirmed');
        onBookingSuccess(confirmData.booking);

        // Celebration Confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Booking processing error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#2D4A3E] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
              Kala Setu Direct Artisan Pass
            </span>
            <h3 className="text-lg font-serif font-bold text-white line-clamp-1">
              {experience.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between text-sm text-stone-600 mb-1">
                  <span>Price per seat:</span>
                  <span className="font-bold text-[#2D4A3E]">₹{experience.price_inr}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Artisan Custodian:</span>
                  <span className="font-semibold text-stone-800">{experience.artisan_name || 'Master Artisan'}</span>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
                  Select Workshop Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-09-01"
                  max="2026-10-31"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#2D4A3E]"
                />
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
                  Select Workshop Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '10:00 AM - 01:00 PM',
                    '02:30 PM - 05:30 PM'
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`text-xs p-2.5 rounded-xl border text-center font-medium transition-all ${
                        selectedSlot === slot
                          ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Participants Counter */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
                  Number of Attendees
                </label>
                <div className="flex items-center gap-4 bg-white border border-stone-300 rounded-xl p-2 w-fit">
                  <button
                    type="button"
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-100 font-bold text-stone-700 hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span className="font-bold text-base px-2">{participants}</span>
                  <button
                    type="button"
                    onClick={() => setParticipants(Math.min(experience.max_participants || 8, participants + 1))}
                    className="w-8 h-8 rounded-lg bg-stone-100 font-bold text-stone-700 hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tourist Info */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={touristName}
                    onChange={(e) => setTouristName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={touristPhone}
                    onChange={(e) => setTouristPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Summary Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div>
                  <span className="text-xs text-stone-500">Total Workshop Fee:</span>
                  <div className="text-2xl font-bold font-serif text-[#D84315]">
                    ₹{totalPrice}
                  </div>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  className="bg-[#D84315] hover:bg-[#BF360C] text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
                >
                  Proceed to Payment →
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-[#F5F0E6] p-4 rounded-2xl border border-amber-200/60">
                <div className="flex items-center justify-between text-sm font-semibold text-stone-800 mb-1">
                  <span>Payable Amount</span>
                  <span className="text-xl font-bold text-[#2D4A3E]">₹{totalPrice}</span>
                </div>
                <p className="text-xs text-stone-600">
                  Direct artisan remuneration. 0% middleman deduction via Kala Setu protocol.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#2D4A3E] bg-[#2D4A3E]/5 text-[#2D4A3E] font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📱</span>
                    <div>
                      <div className="text-sm">UPI (GPay / PhonePe / Paytm / BHIM)</div>
                      <div className="text-[11px] text-stone-500 font-normal">Instant authorization via test token</div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'upi' ? 'border-[#2D4A3E] bg-[#2D4A3E]' : 'border-stone-300'}`} />
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#2D4A3E] bg-[#2D4A3E]/5 text-[#2D4A3E] font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#2D4A3E]" />
                    <div>
                      <div className="text-sm">Credit / Debit Card (Razorpay Sandbox)</div>
                      <div className="text-[11px] text-stone-500 font-normal">Test Card: 4111 1111 1111 1111</div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'card' ? 'border-[#2D4A3E] bg-[#2D4A3E]' : 'border-stone-300'}`} />
                </button>
              </div>

              <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Sandbox Mode: Automatic authorization with test OTP 1234.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={() => setStep('details')}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  ← Back to Details
                </button>
                <button
                  onClick={handleSimulatePayment}
                  disabled={loading}
                  className="bg-[#2D4A3E] hover:bg-[#1A332A] disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105"
                >
                  {loading ? 'Processing Payment...' : `Authorize & Pay ₹${totalPrice}`}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-3 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-[#2D4A3E]">
                  Workshop Seat Confirmed!
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Your direct artisan pass has been issued and logged to Neon PostgreSQL.
                </p>
              </div>

              {/* QR Pass Box */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm inline-block mx-auto text-center">
                <div className="w-32 h-32 bg-stone-50 border border-stone-300 rounded-xl mx-auto flex items-center justify-center mb-2">
                  <QrCode className="w-24 h-24 text-stone-800" />
                </div>
                <div className="text-xs font-mono font-bold text-[#2D4A3E]">
                  PASS: {confirmedBooking?.id || '#KALA-2026-CONFIRMED'}
                </div>
                <div className="text-[10px] text-stone-400">Show to Master Artisan upon arrival</div>
              </div>

              <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl max-w-sm mx-auto text-left space-y-1">
                <div><strong>Workshop:</strong> {experience.title}</div>
                <div><strong>Date & Time:</strong> {selectedDate} | {selectedSlot}</div>
                <div><strong>Location:</strong> {experience.location_name || experience.district}, {experience.state}</div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#2D4A3E] text-white font-bold py-3 rounded-full text-sm hover:bg-[#1A332A] transition-colors"
              >
                Done & View My Itinerary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
