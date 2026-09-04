import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { AICulturalConcierge } from './components/chat/AICulturalConcierge';
import { BookingModal } from './components/booking/BookingModal';
import { ShowStepsOverlay } from './components/guide/ShowStepsOverlay';
import { ArtisanRegisterModal } from './components/artisan/ArtisanRegisterModal';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { ArtisanStudioPage } from './pages/ArtisanStudioPage';
import { GovtDashboardPage } from './pages/GovtDashboardPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { GalleryPage } from './pages/GalleryPage';
import { MapLibreView } from './components/map/MapLibreView';
import { AuthModal } from './components/auth/AuthModal';
import { Experience, Artisan, Booking } from './types';
import { SupportedLanguage, translations } from './utils/translations';
import { LOCALIZED_EXPERIENCES } from './utils/localizedData';
import { getApiUrl } from './config/api';

const DEFAULT_INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'art_kolhapur_01',
    user_id: 'usr_kolhapur_01',
    artisan_name: 'Santosh Kamble',
    artisan_phone: '+91 98220 12345',
    craft_type: 'Vegetable-Tanned Leathercraft',
    years_experience: 28,
    trust_score: 98,
    gi_certified: true,
    women_led: false,
    elderly_friendly: true,
    id_verified: true,
    skill_verified: true,
    lat: 16.7050,
    lng: 74.2433,
    location_name: 'Shivaji Market, Kolhapur',
    district: 'Kolhapur',
    state: 'Maharashtra',
    photo_url: '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    bio: 'Fourth-generation hereditary cobbler crafting GI-tagged Kolhapuri chappals using babool bark and myrobalan herbal tanning.',
    story: 'My great-grandfather crafted chappals for the royal court of Chhatrapati Shahu Maharaj. Every cut and hand-stitched braided strap preserves our family pride.'
  },
  {
    id: 'art_chanderi_01',
    user_id: 'usr_chanderi_01',
    artisan_name: 'Kamla Bai',
    artisan_phone: '+91 97550 11223',
    craft_type: 'Chanderi Zari Silk Pit-Loom Weaving',
    years_experience: 35,
    trust_score: 97,
    gi_certified: true,
    women_led: true,
    elderly_friendly: true,
    id_verified: true,
    skill_verified: true,
    lat: 24.7120,
    lng: 78.1380,
    location_name: 'Pranpur Craft Village, Chanderi',
    district: 'Ashoknagar',
    state: 'Madhya Pradesh',
    photo_url: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
    bio: 'State Awardee pit-loom weaver known for gossamer-weight silk-cotton sarees with royal peacock and lotus bootis.',
    story: 'My loom sits inside a natural earthen pit keeping the silk moist and supple under the Bundelkhand sun.'
  },
  {
    id: 'art_majuli_01',
    user_id: 'usr_majuli_01',
    artisan_name: 'Hemanta Bora',
    artisan_phone: '+91 94350 22334',
    craft_type: 'Mukha Bamboo Mask Making',
    years_experience: 30,
    trust_score: 96,
    gi_certified: true,
    women_led: false,
    elderly_friendly: true,
    id_verified: true,
    skill_verified: true,
    lat: 26.9500,
    lng: 94.2167,
    location_name: 'Natun Samaguri Satra, Majuli',
    district: 'Majuli',
    state: 'Assam',
    photo_url: '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
    bio: 'Vaishnavite mask maker sculpting giant mythological characters from bamboo split frames, Brahmaputra clay, and cow dung.',
    story: 'Mask making on Majuli Island was initiated by Saint Srimanta Sankardeva in the 16th century for Bhaona spiritual theatre.'
  },
  {
    id: 'art_srinagar_01',
    user_id: 'usr_srinagar_01',
    artisan_name: 'Ghulam Mohammad Zargar',
    artisan_phone: '+91 99060 11223',
    craft_type: 'Kashmir Walnut Wood Carving',
    years_experience: 42,
    trust_score: 99,
    gi_certified: true,
    women_led: false,
    elderly_friendly: true,
    id_verified: true,
    skill_verified: true,
    lat: 34.0837,
    lng: 74.7973,
    location_name: 'Zadibal Old City, Srinagar',
    district: 'Srinagar',
    state: 'Jammu and Kashmir',
    photo_url: '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
    bio: 'National Award winner specializing in deep undercut floral carving on 4-year seasoned walnut root wood.',
    story: 'We never apply varnish. The natural wax within seasoned Kashmir walnut wood shines when rubbed with agate stone.'
  },
  {
    id: 'art_bishnupur_01',
    user_id: 'usr_bishnupur_01',
    artisan_name: 'Subhas Kumbhakar',
    artisan_phone: '+91 94340 11223',
    craft_type: 'Living Terracotta Pottery & Bankura Horse',
    years_experience: 33,
    trust_score: 96,
    gi_certified: true,
    women_led: false,
    elderly_friendly: true,
    id_verified: true,
    skill_verified: true,
    lat: 23.0760,
    lng: 87.3190,
    location_name: 'Panchmura Village, Bankura',
    district: 'Bankura',
    state: 'West Bengal',
    photo_url: '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    bio: 'Sculptor of the world-famous Bankura terracotta horse, hand-thrown in five hollow parts and fired in reduction wood-kilns.',
    story: 'Panchmura terracotta horses have represented Indian folk art at the National Museum and UNESCO forums for generations.'
  }
];

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [currentRole, setCurrentRole] = useState<'tourist' | 'artisan' | 'govt'>('tourist');
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const t = translations[language] || translations.en;

  const [experiences, setExperiences] = useState<Experience[]>(LOCALIZED_EXPERIENCES['en']);
  const [artisans, setArtisans] = useState<Artisan[]>(DEFAULT_INITIAL_ARTISANS);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(LOCALIZED_EXPERIENCES['en'][0]);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(DEFAULT_INITIAL_ARTISANS[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isShowStepsOpen, setIsShowStepsOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Restore stored session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('kala_setu_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setAuthenticatedUser(u);
        if (u.role) {
          setCurrentRole(u.role.toLowerCase() as any);
        }
      }
    } catch (e) {}
  }, []);

  // Update whole dataset dynamically when language changes (Requirement 6)
  useEffect(() => {
    const localized = LOCALIZED_EXPERIENCES[language] || LOCALIZED_EXPERIENCES['en'];
    setExperiences(localized);
    if (selectedExperience) {
      const match = localized.find(e => e.id === selectedExperience.id);
      if (match) setSelectedExperience(match);
    }
  }, [language]);

  // Load API data if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, artRes] = await Promise.all([
          fetch(getApiUrl('/api/experiences')),
          fetch(getApiUrl('/api/artisans'))
        ]);
        const expData = await expRes.json();
        const artData = await artRes.json();

        if (artData.success && artData.artisans?.length > 0) {
          setArtisans(artData.artisans);
        }
      } catch (err) {
        console.warn('API sync completed with local fallback state');
      }
    };
    fetchData();
  }, []);

  const handleSelectExperience = (exp: Experience) => {
    setSelectedExperience(exp);
    setCurrentTab('experience-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtisan = (artisanOrId: Artisan | string) => {
    if (typeof artisanOrId === 'string') {
      const found = artisans.find(a => a.id === artisanOrId || a.user_id === artisanOrId);
      if (found) {
        setSelectedArtisan(found);
      }
    } else {
      setSelectedArtisan(artisanOrId);
    }
    setCurrentTab('artisan-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateBooking = (exp: Experience) => {
    setSelectedExperience(exp);
    setIsBookingModalOpen(true);
  };

  const handleArtisanRegistered = (newArtisan: Artisan) => {
    setArtisans([newArtisan, ...artisans]);
    setSelectedArtisan(newArtisan);
    setCurrentRole('artisan');
    setCurrentTab('artisan-studio');
  };

  const handleAuthSuccess = (user: any, token: string) => {
    setAuthenticatedUser(user);
    if (user.role === 'ARTISAN') {
      setCurrentRole('artisan');
      setCurrentTab('artisan-studio');
    } else if (user.role === 'ADMIN') {
      setCurrentRole('govt');
      setCurrentTab('govt');
    } else {
      setCurrentRole('tourist');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between font-sans selection:bg-[#D84315] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        authenticatedUser={authenticatedUser}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentTab === 'home' && (
          <HomePage
            experiences={experiences}
            artisans={artisans}
            onSelectExperience={handleSelectExperience}
            onSelectArtisan={handleSelectArtisan}
            onNavigateToDiscover={() => setCurrentTab('discover')}
            language={language}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverPage
            experiences={experiences}
            onSelectExperience={handleSelectExperience}
            language={language}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryPage language={language} />
        )}

        {currentTab === 'artisans' && (
          <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
                  Verified Hereditary Custodians
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
                  {t.masterArtisansTitle}
                </h1>
                <p className="text-stone-600 text-sm mt-2">
                  Connect directly with certified practitioners across traditional leathercraft, pit-loom silk weaving, bamboo mask making, and terracotta sculpting.
                </p>
              </div>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-[#2D4A3E] hover:bg-[#1A332A] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm self-start sm:self-auto"
              >
                + Register New Artisan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisans.map((artisan) => (
                <div
                  key={artisan.id}
                  onClick={() => handleSelectArtisan(artisan)}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-serif text-xl font-bold overflow-hidden shrink-0 border-2 border-[#D84315]">
                      {artisan.photo_url ? (
                        <img src={artisan.photo_url} alt={artisan.artisan_name} className="w-full h-full object-cover" />
                      ) : (
                        artisan.artisan_name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-stone-800 group-hover:text-[#D84315] transition-colors line-clamp-1">
                        {artisan.artisan_name}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">
                        {artisan.craft_type} • {artisan.district}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Trust {artisan.trust_score}%
                        </span>
                        {artisan.gi_certified && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            GI Tag
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {artisan.bio || artisan.story}
                  </p>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#D84315]">
                    <span>{artisan.years_experience}+ Years Legacy</span>
                    <span>View Studio →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'map' && (
          <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
                Spatial Cartography
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
                Living Heritage Geospatial Map
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Explore verified craft clusters and bookable ateliers on OpenStreetMap. Click any pin for atelier details.
              </p>
            </div>
            <MapLibreView
              experiences={experiences}
              onSelectExperience={handleSelectExperience}
              height="650px"
            />
          </div>
        )}

        {currentTab === 'experience-detail' && selectedExperience && (
          <ExperienceDetailPage
            experience={selectedExperience}
            onBack={() => setCurrentTab('discover')}
            onBookNow={handleInitiateBooking}
            onSelectArtisan={handleSelectArtisan}
            language={language}
          />
        )}

        {currentTab === 'artisan-detail' && selectedArtisan && (
          <ArtisanProfilePage
            artisan={selectedArtisan}
            onBack={() => setCurrentTab('artisans')}
            onSelectExperience={handleSelectExperience}
            language={language}
          />
        )}

        {currentTab === 'artisan-studio' && selectedArtisan && (
          <ArtisanStudioPage
            artisan={selectedArtisan}
            onSelectExperience={handleSelectExperience}
          />
        )}

        {currentTab === 'bookings' && (
          <MyBookingsPage
            language={language}
            onExploreMore={() => setCurrentTab('discover')}
          />
        )}

        {currentTab === 'govt' && (
          <GovtDashboardPage language={language} />
        )}
      </main>

      {/* Direct Booking Checkout Modal */}
      <BookingModal
        experience={selectedExperience}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={() => {
          // Booking confirmed!
        }}
      />

      {/* Show Steps Interactive Guide Overlay (Triggered from inside Chatbot) */}
      <ShowStepsOverlay
        isOpen={isShowStepsOpen}
        onClose={() => setIsShowStepsOpen(false)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Artisan Registration Onboarding Modal */}
      <ArtisanRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegistered={handleArtisanRegistered}
      />

      {/* Firebase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        targetRole={currentRole}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Sleek Floating AI Cultural Concierge (Icon-only trigger with pulse) */}
      <AICulturalConcierge
        language={language}
        onStartShowSteps={() => setIsShowStepsOpen(true)}
        onOpenHelp={() => {
          // Open help
        }}
      />

      {/* Mobile Bottom Thumb Navigation */}
      <MobileNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
      />

      {/* Footer */}
      <footer className="bg-[#1A332A] text-white pt-12 pb-16 sm:pb-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#D84315] flex items-center justify-center font-serif font-bold text-white text-base">
                  क
                </div>
                <span className="text-xl font-serif font-bold text-white">KALA SETU (कला सेतु)</span>
              </div>
              <p className="text-xs text-stone-300 max-w-sm leading-relaxed">
                Smart India Hackathon 2026 • Problem Statement PS-TUR05: Local Artisan and Experience Discovery Platform. Direct livelihoods, authentic living craft, and zero middleman deductions.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-3">
                National Initiatives
              </h4>
              <ul className="text-xs space-y-2 text-stone-300">
                <li>• One District One Product (ODOP)</li>
                <li>• Dekho Apna Desh (Ministry of Tourism)</li>
                <li>• Vocal for Local Craft Guilds</li>
                <li>• GI Tag Heritage Protection</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-3">
                Helplines & Grievances
              </h4>
              <ul className="text-xs space-y-2 text-stone-300">
                <li>• 24/7 Tourist Police: 1363</li>
                <li>• National Consumer Helpline: 1800-11-4000</li>
                <li>• MSME Artisan Helpline: 1800-11-8601</li>
                <li>• Emergency Police Dispatch: 112</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center text-xs text-stone-400">
            © 2026 Kala Setu — Dedicated to India's 7 Million Traditional Artisans. 🇮🇳
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
