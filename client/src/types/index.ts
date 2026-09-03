export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'tourist' | 'artisan' | 'govt';
}

export interface Artisan {
  id: string;
  user_id: string;
  artisan_name: string;
  artisan_phone?: string;
  artisan_email?: string;
  craft_type: string;
  years_experience: number;
  trust_score: number;
  gi_certified: boolean;
  women_led: boolean;
  elderly_friendly: boolean;
  id_verified: boolean;
  skill_verified: boolean;
  lat: number;
  lng: number;
  location_name: string;
  district: string;
  state: string;
  photo_url: string;
  bio: string;
  story: string;
  experiences?: Experience[];
}

export interface Experience {
  id: string;
  title: string;
  slug?: string;
  description: string;
  category: string;
  price_inr: number;
  duration_mins: number;
  max_participants: number;
  safety_score?: number;
  women_friendly: boolean;
  elderly_friendly: boolean;
  child_friendly?: boolean;
  lat: number;
  lng: number;
  cover_image: string;
  gallery_images?: string[];
  odop_tag?: string | null;
  location_name?: string;
  address?: string;
  district: string;
  state: string;
  artisan_id: string;
  artisan_name?: string;
  artisan_avatar?: string;
  trust_score?: number;
  reviews?: Review[];
}


export interface Review {
  id: string;
  tourist_id: string;
  reviewer_name?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Booking {
  id: string;
  experience_id: string;
  experience_title?: string;
  cover_image?: string;
  tourist_name: string;
  tourist_phone: string;
  booking_date: string;
  time_slot: string;
  participants: number;
  total_price: number;
  status: string;
  qr_code_data?: string;
  location_name?: string;
  district?: string;
  state?: string;
  artisan_name?: string;
  created_at: string;
}

export interface GovtMetrics {
  totalArtisans: number;
  registeredOnPlatform: number;
  activeExperiences: number;
  totalBookings: number;
  estimatedRevenueInr: number;
  directArtisanIncomePercent: number;
  middlemanCommissionSavedPercent: number;
  womenArtisansPercent: number;
  elderlyArtisansPercent: number;
  giTaggedCoverageCount: number;
  emergencyIncidentsLogged: number;
}
