import React, { useState } from 'react';
import { 
  Building, UserCheck, ShieldCheck, Award, Star, 
  Calendar, Plus, Edit3, Trash2, CheckCircle2, 
  DollarSign, TrendingUp, Users, MessageSquare, Volume2, Upload, MapPin
} from 'lucide-react';
import { Artisan, Experience } from '../types';

interface ArtisanStudioPageProps {
  artisan: Artisan;
  onSelectExperience: (exp: Experience) => void;
}

export const ArtisanStudioPage: React.FC<ArtisanStudioPageProps> = ({
  artisan,
  onSelectExperience
}) => {
  const [activeTab, setActiveTab] = useState<'workshops' | 'about' | 'portfolio' | 'reviews' | 'payouts'>('workshops');
  
  const [workshops, setWorkshops] = useState([
    {
      id: 'ws_1',
      title: `Hands-On ${artisan.craft_type} Masterclass`,
      category: artisan.craft_type,
      price: 1850,
      duration: 150,
      maxParticipants: 8,
      bookingsCount: 24,
      status: 'Active'
    },
    {
      id: 'ws_2',
      title: `Ancestral Tools & Heritage Technique Demonstration`,
      category: artisan.craft_type,
      price: 1200,
      duration: 90,
      maxParticipants: 12,
      bookingsCount: 16,
      status: 'Active'
    }
  ]);

  const [isAddingWorkshop, setIsAddingWorkshop] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(1500);
  const [newDuration, setNewDuration] = useState(120);

  const handleAddWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setWorkshops([
      ...workshops,
      {
        id: `ws_${Date.now()}`,
        title: newTitle,
        category: artisan.craft_type,
        price: Number(newPrice),
        duration: Number(newDuration),
        maxParticipants: 8,
        bookingsCount: 0,
        status: 'Active'
      }
    ]);
    setNewTitle('');
    setIsAddingWorkshop(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Google My Business Style Profile Card Header */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden mb-8">
        {/* Cover Background */}
        <div className="h-44 sm:h-52 bg-gradient-to-r from-[#2D4A3E] to-[#1A332A] relative p-6 flex items-end">
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase border border-white/20">
              {artisan.craft_type}
            </span>
            {artisan.gi_certified && (
              <span className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Award className="w-3.5 h-3.5" />
                GI Tag Custodian
              </span>
            )}
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-5">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FDFBF7] p-1.5 shadow-xl shrink-0">
                <div className="w-full h-full rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-serif text-3xl font-bold overflow-hidden border-2 border-[#D84315]">
                  {artisan.photo_url ? (
                    <img src={artisan.photo_url} alt={artisan.artisan_name} className="w-full h-full object-cover" />
                  ) : (
                    artisan.artisan_name.charAt(0)
                  )}
                </div>
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D4A3E]">
                    {artisan.artisan_name}
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✓ Verified Atelier
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 mt-1">
                  <MapPin className="w-4 h-4 text-[#D84315]" />
                  <span>{artisan.location_name || artisan.district}, {artisan.state}</span>
                  <span>•</span>
                  <span>{artisan.years_experience}+ Years Ancestral Heritage</span>
                </div>
              </div>
            </div>

            {/* Trust Score Breakdown */}
            <div className="bg-[#F5F0E6] p-4 rounded-2xl border border-stone-200 flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-bold text-lg">
                {artisan.trust_score}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Trust Score</span>
                <span className="text-xs font-bold text-[#2D4A3E]">Pehchan ID & Lineage Verified</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100">
            <div className="p-3 bg-stone-50 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Direct Payouts</span>
              <div className="text-xl font-bold font-serif text-[#D84315]">₹48,500</div>
              <span className="text-[10px] text-emerald-700 font-semibold">96% Net Disbursed</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Tourists Hosted</span>
              <div className="text-xl font-bold font-serif text-[#2D4A3E]">42 Attendees</div>
              <span className="text-[10px] text-stone-500">Across 6 States</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Active Workshops</span>
              <div className="text-xl font-bold font-serif text-stone-800">{workshops.length} Listings</div>
              <span className="text-[10px] text-emerald-700 font-semibold">Live on Discovery</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Average Rating</span>
              <div className="text-xl font-bold font-serif text-amber-600 flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>4.9 / 5</span>
              </div>
              <span className="text-[10px] text-stone-500">28 Verified Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dashboard Navigation Tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-3 mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'workshops', label: 'My Workshops & Classes' },
          { id: 'about', label: 'Atelier Story & Bio' },
          { id: 'portfolio', label: 'Craft Portfolio & Photos' },
          { id: 'reviews', label: 'Tourist Reviews & Responses' },
          { id: 'payouts', label: 'Direct UPI Settlements' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[#2D4A3E] text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      {activeTab === 'workshops' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#2D4A3E]">
              Bookable Masterclass Listings
            </h2>
            <button
              onClick={() => setIsAddingWorkshop(true)}
              className="flex items-center gap-1.5 bg-[#D84315] hover:bg-[#BF360C] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Workshop</span>
            </button>
          </div>

          {/* Add Workshop Form */}
          {isAddingWorkshop && (
            <form onSubmit={handleAddWorkshop} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h3 className="font-bold text-sm text-[#2D4A3E]">Create New Tourism Workshop</h3>
                <button type="button" onClick={() => setIsAddingWorkshop(false)}><Trash2 className="w-4 h-4 text-stone-400" /></button>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Workshop Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass in Traditional Wood Relief Carving"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Fee per Attendee (INR)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#D84315]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddingWorkshop(false)} className="px-4 py-2 bg-stone-100 rounded-full text-xs font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#2D4A3E] text-white rounded-full text-xs font-bold">Publish Workshop</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshops.map((ws) => (
              <div key={ws.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      ● {ws.status} on Platform
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      {ws.bookingsCount} Attendees Booked
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#2D4A3E] mb-2">
                    {ws.title}
                  </h3>
                  <div className="text-xs text-stone-500 space-y-1">
                    <div>Duration: <strong>{ws.duration} Mins</strong></div>
                    <div>Max Capacity: <strong>{ws.maxParticipants} participants per slot</strong></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                  <div className="text-xl font-serif font-bold text-[#D84315]">
                    ₹{ws.price} <span className="text-xs font-normal text-stone-500">/ seat</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-xl font-serif font-bold text-[#2D4A3E]">
            Atelier Heritage Story
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Summary Bio</label>
              <textarea rows={3} defaultValue={artisan.bio} className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Ancestral Journey & Techniques</label>
              <textarea rows={4} defaultValue={artisan.story} className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs" />
            </div>
            <button className="bg-[#2D4A3E] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-sm">
              Save Story Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-[#2D4A3E]">
              Craft Portfolio Gallery
            </h3>
            <button className="flex items-center gap-1.5 bg-[#D84315] text-white font-bold text-xs px-4 py-2 rounded-full">
              <Upload className="w-3.5 h-3.5" />
              <span>Add Images / Video</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <img src={artisan.photo_url} alt="artisan work" className="w-full h-40 rounded-2xl object-cover" />
            <img src="/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg" alt="work" className="w-full h-40 rounded-2xl object-cover" />
            <img src="/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg" alt="work" className="w-full h-40 rounded-2xl object-cover" />
            <img src="/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg" alt="work" className="w-full h-40 rounded-2xl object-cover" />
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-xl font-serif font-bold text-[#2D4A3E]">
            Recent Tourist Feedback (28 Reviews)
          </h3>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-bold text-xs text-stone-800">Rohan Deshmukh ★★★★★</div>
              <div className="text-[10px] text-stone-400">Aug 25, 2026</div>
            </div>
            <p className="text-xs text-stone-600">"Master artisan taught us the whole vegetable-tanning process. Super patient and authentic!"</p>
            <button className="text-[11px] font-bold text-[#D84315] hover:underline">Reply as Artisan →</button>
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-[#2D4A3E]">
              Direct Bank & UPI Settlements
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              0% Middleman Deduction Protocol Active
            </span>
          </div>

          <div className="p-5 bg-[#F5F0E6] rounded-2xl border border-amber-200 space-y-2">
            <div className="text-xs font-bold text-[#2D4A3E]">Linked UPI VPA / Account:</div>
            <div className="font-mono text-sm font-bold text-stone-800">{(artisan.artisan_phone || '+919822012345').replace(/\s/g, '')}@upi</div>
            <div className="text-[11px] text-stone-500">
              Settlements disburse instantly upon tourist QR pass scan at the workshop atelier.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
