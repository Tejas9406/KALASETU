import React, { useState, useEffect } from 'react';
import { BookmarkCheck, Calendar, Clock, MapPin, QrCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { Booking } from '../types';
import { SupportedLanguage, translations } from '../utils/translations';

interface MyBookingsPageProps {
  language: SupportedLanguage;
  onExploreMore: () => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  language,
  onExploreMore
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings/user/usr_demo_tourist');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
          Travel Itinerary & Passes
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
          {t.myBookings}
        </h1>
        <p className="text-stone-600 text-sm mt-2">
          Your confirmed artisan workshop passes. Present your pass upon arrival at the atelier.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-stone-500 text-sm">
          Loading your travel passes...
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-lg mx-auto">
          <BookmarkCheck className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">
            No Booked Experiences Yet
          </h3>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Discover and book hands-on workshops with verified Indian master artisans in Kolhapur, Chanderi, and Majuli.
          </p>
          <button
            onClick={onExploreMore}
            className="bg-[#D84315] hover:bg-[#BF360C] text-white font-bold text-xs px-6 py-3 rounded-full transition-transform hover:scale-105"
          >
            Explore Masterclasses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Confirmed Pass
                  </span>
                  <span className="font-mono text-xs text-stone-400 font-bold">
                    {b.id}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#2D4A3E] mb-2 line-clamp-2">
                  {b.experience_title}
                </h3>

                <div className="space-y-2 text-xs text-stone-600 my-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D84315]" />
                    <span className="font-medium">Date: {new Date(b.booking_date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D84315]" />
                    <span className="font-medium">Time Slot: {b.time_slot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D84315]" />
                    <span className="font-medium">{b.location_name || b.district}, {b.state}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#F5F0E6] border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Total Fee Paid</span>
                  <span className="text-xl font-serif font-bold text-[#D84315]">
                    ₹{b.total_price}
                  </span>
                  <span className="text-[10px] text-stone-400"> ({b.participants} Attendees)</span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono font-bold text-stone-700">
                  <QrCode className="w-4 h-4 text-[#2D4A3E]" />
                  <span>Entry Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
