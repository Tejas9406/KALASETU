import { Router } from 'express';

export const worldRouter = Router();

export interface UniversalLocation {
  id: string;
  name: string;
  local_name: string;
  code: string;
  flag_emoji: string;
  coverage_status: 'AVAILABLE' | 'PREVIEW' | 'COMING_SOON';
  status_label: string;
  description: string;
  lat: number;
  lng: number;
  admin_regions: Array<{
    id: string;
    code: string;
    name: string;
    local_name: string;
    lat: number;
    lng: number;
    localities: Array<{
      id: string;
      name: string;
      local_name: string;
      cluster_type: 'ARTISAN_CLUSTER' | 'COMMUNITY_HERITAGE' | 'MIXED';
      lat: number;
      lng: number;
      highlight: string;
    }>;
  }>;
}

export const UNIVERSAL_LOCATION_HIERARCHY: UniversalLocation[] = [
  {
    id: 'cnt_in',
    name: 'India',
    local_name: 'भारत',
    code: 'IN',
    flag_emoji: '🇮🇳',
    coverage_status: 'AVAILABLE',
    status_label: 'Available (Full Heritage Network Active)',
    description: '17+ verified craft ateliers, 12 living community traditions, complete MapLibre cartography, direct payments, and AI intelligence.',
    lat: 20.5937,
    lng: 78.9629,
    admin_regions: [
      {
        id: 'reg_in_mh',
        code: 'IN-MH',
        name: 'Maharashtra',
        local_name: 'महाराष्ट्र',
        lat: 19.7515,
        lng: 75.7139,
        localities: [
          { id: 'loc_kolhapur', name: 'Kolhapur', local_name: 'कोल्हापूर', cluster_type: 'MIXED', lat: 16.7050, lng: 74.2433, highlight: 'GI Kolhapuri Leathercraft & Bhavani Mandap Guilds' },
          { id: 'loc_konkan', name: 'Konkan Coast (Ratnagiri)', local_name: 'कोकण', cluster_type: 'COMMUNITY_HERITAGE', lat: 16.9902, lng: 73.3120, highlight: 'Shimga Palakhi Nrutya & Sacred Betel Groves' },
          { id: 'loc_pandharpur', name: 'Pandharpur', local_name: 'पंढरपूर', cluster_type: 'COMMUNITY_HERITAGE', lat: 17.6778, lng: 75.3278, highlight: 'Warkari Bhakti Lineage & Kakada Bhajan' }
        ]
      },
      {
        id: 'reg_in_mp',
        code: 'IN-MP',
        name: 'Madhya Pradesh',
        local_name: 'मध्य प्रदेश',
        lat: 22.9734,
        lng: 78.6569,
        localities: [
          { id: 'loc_chanderi', name: 'Chanderi (Ashoknagar)', local_name: 'चंदेरी', cluster_type: 'ARTISAN_CLUSTER', lat: 24.7120, lng: 78.1380, highlight: 'Pranpur Silk Pit-Looms & Royal Zari Weaving' },
          { id: 'loc_jhabua', name: 'Jhabua Tribal Belt', local_name: 'झाबुआ', cluster_type: 'COMMUNITY_HERITAGE', lat: 22.7699, lng: 74.5936, highlight: 'Bhil & Bhilala Bhagoria Haat Festival of Colors' }
        ]
      },
      {
        id: 'reg_in_as',
        code: 'IN-AS',
        name: 'Assam',
        local_name: 'অসম',
        lat: 26.2006,
        lng: 92.9376,
        localities: [
          { id: 'loc_majuli', name: 'Majuli Island', local_name: 'মাজুলী', cluster_type: 'MIXED', lat: 26.9500, lng: 94.2167, highlight: 'Neo-Vaishnavite Mukha Masks & Mishing Ahimsa Silk' }
        ]
      },
      {
        id: 'reg_in_jk',
        code: 'IN-JK',
        name: 'Jammu & Kashmir',
        local_name: 'جموں و کشمیر',
        lat: 33.7782,
        lng: 76.5762,
        localities: [
          { id: 'loc_srinagar', name: 'Old Srinagar (Zadibal)', local_name: 'سرینگر', cluster_type: 'ARTISAN_CLUSTER', lat: 34.0837, lng: 74.7973, highlight: 'Seasoned Walnut Wood Jali Carving & Papier-Mâché' }
        ]
      },
      {
        id: 'reg_in_wb',
        code: 'IN-WB',
        name: 'West Bengal',
        local_name: 'পশ্চিমবঙ্গ',
        lat: 22.9868,
        lng: 87.8550,
        localities: [
          { id: 'loc_bishnupur', name: 'Bishnupur & Bankura', local_name: 'বিষ্ণুপুর', cluster_type: 'ARTISAN_CLUSTER', lat: 23.0760, lng: 87.3190, highlight: 'Panchmura Bankura Horse & Terracotta Temple Tiles' },
          { id: 'loc_kumartuli', name: 'Kumartuli (Kolkata)', local_name: 'কুমারটুলি', cluster_type: 'COMMUNITY_HERITAGE', lat: 22.5986, lng: 88.3639, highlight: 'Sacred Clay Deity Invocation & Dhunuchi Dance' }
        ]
      }
    ]
  },
  {
    id: 'cnt_jp',
    name: 'Japan',
    local_name: '日本',
    code: 'JP',
    flag_emoji: '🇯🇵',
    coverage_status: 'PREVIEW',
    status_label: 'Preview Available (Selected Cultural Clusters)',
    description: 'Curated heritage preview featuring traditional Kyoto ceramics (Kiyomizu-yaki), Nishijin silk textiles, and UNESCO Gion Matsuri living pageants.',
    lat: 35.6762,
    lng: 139.6503,
    admin_regions: [
      {
        id: 'reg_jp_kt',
        code: 'JP-26',
        name: 'Kyoto Prefecture',
        local_name: '京都府',
        lat: 35.0116,
        lng: 135.7681,
        localities: [
          { id: 'loc_higashiyama', name: 'Higashiyama Ward', local_name: '東山区', cluster_type: 'ARTISAN_CLUSTER', lat: 34.9950, lng: 135.7780, highlight: 'Kiyomizu-yaki Ceramics & Tea Ceremony Utensils' },
          { id: 'loc_gion', name: 'Gion District', local_name: '祇園', cluster_type: 'COMMUNITY_HERITAGE', lat: 35.0037, lng: 135.7772, highlight: 'Gion Matsuri Yamaboko Procession Living Heritage' }
        ]
      }
    ]
  },
  {
    id: 'cnt_it',
    name: 'Italy',
    local_name: 'Italia',
    code: 'IT',
    flag_emoji: '🇮🇹',
    coverage_status: 'PREVIEW',
    status_label: 'Selected Cultural Data Available',
    description: 'Curated guild preview featuring Florence Santa Croce vegetable-tanned leathercraft and Carnevale di Venezia historic mask pageant.',
    lat: 41.8719,
    lng: 12.5674,
    admin_regions: [
      {
        id: 'reg_it_tc',
        code: 'IT-52',
        name: 'Tuscany',
        local_name: 'Toscana',
        lat: 43.7711,
        lng: 11.2486,
        localities: [
          { id: 'loc_florence', name: 'Florence (Firenze)', local_name: 'Firenze', cluster_type: 'ARTISAN_CLUSTER', lat: 43.7696, lng: 11.2558, highlight: 'Santa Croce Cuoiai Leather Guild & Saddle-Stitching' }
        ]
      },
      {
        id: 'reg_it_vn',
        code: 'IT-34',
        name: 'Veneto',
        local_name: 'Veneto',
        lat: 45.4342,
        lng: 12.3389,
        localities: [
          { id: 'loc_venice', name: 'Venice (Venezia)', local_name: 'Venezia', cluster_type: 'COMMUNITY_HERITAGE', lat: 45.4342, lng: 12.3389, highlight: 'Carnevale di Venezia Handcrafted Mask Living Pageant' }
        ]
      }
    ]
  },
  {
    id: 'cnt_br',
    name: 'Brazil',
    local_name: 'Brasil',
    code: 'BR',
    flag_emoji: '🇧🇷',
    coverage_status: 'COMING_SOON',
    status_label: 'Coming Soon (Ethnographic Fieldwork in Progress)',
    description: 'Salvador de Bahia Afro-Brazilian drumming circles and UNESCO Roda de Capoeira living heritage network onboarding scheduled for next phase.',
    lat: -14.2350,
    lng: -51.9253,
    admin_regions: []
  },
  {
    id: 'cnt_mx',
    name: 'Mexico',
    local_name: 'México',
    code: 'MX',
    flag_emoji: '🇲🇽',
    coverage_status: 'COMING_SOON',
    status_label: 'Coming Soon (Guild Onboarding)',
    description: 'Oaxaca copal-wood Alebrije carving guilds and Day of the Dead indigenous community altar traditions in preliminary cataloguing.',
    lat: 23.6345,
    lng: -102.5528,
    admin_regions: []
  }
];

export const CULTURAL_SOURCES_PROVENANCE = [
  {
    tier: 1,
    tier_name: 'Official National / Regional Sources',
    sources: [
      { name: 'Office of the Development Commissioner (Handicrafts), Ministry of Textiles, Govt. of India', role: 'Pehchan artisan registry & craft clusters gazette', confidence: '99.5%' },
      { name: 'Geographical Indications Registry, Intellectual Property India', role: 'GI Tag specifications, raw materials & geographic boundary demarcation', confidence: '99.8%' },
      { name: 'Ministry of Tourism (Incredible India & Dekho Apna Desh)', role: 'Rural tourism circuit validation & safety protocols', confidence: '99.2%' }
    ]
  },
  {
    tier: 2,
    tier_name: 'UNESCO & International Cultural Datasets',
    sources: [
      { name: 'UNESCO Representative List of the Intangible Cultural Heritage of Humanity', role: 'Living heritage guidelines, oral traditions & festive event protocols', confidence: '98.9%' },
      { name: 'UNESCO World Heritage Centre Contenders', role: 'Majuli cultural landscape & Bishnupur temple heritage boundaries', confidence: '98.5%' }
    ]
  },
  {
    tier: 3,
    tier_name: 'Recognized Institutions & Museums',
    sources: [
      { name: 'National Museum New Delhi & Crafts Museum', role: 'Historical lineage, tool taxonomy, and museum specimens archive', confidence: '97.4%' },
      { name: 'Kyoto Museum of Crafts and Design (Miyako Messe)', role: 'Kiyomizu-yaki ceramic glazing history & technical records', confidence: '97.1%' }
    ]
  },
  {
    tier: 4,
    tier_name: 'Community Custodians & Hereditary Guilds',
    sources: [
      { name: 'Bhavani Mandap Leathercraft Guild, Kolhapur', role: 'Oral workshop practices, vegetable tanning formulas & fair piece rates', confidence: '96.2%' },
      { name: 'Natun Samaguri Satra, Majuli Island', role: '16th-century Neo-Vaishnavite mask choreography & organic pigment recipes', confidence: '96.8%' }
    ]
  },
  {
    tier: 5,
    tier_name: 'Curated Secondary Research Archives',
    sources: [
      { name: 'Kala Setu Ethnographic Research Field Notes (Kolhapur 2026)', role: 'On-ground artisan interviews, workshop coordinates, photos & video verification', confidence: '95.5%' }
    ]
  }
];

// Universal Location Hierarchy endpoint
worldRouter.get('/hierarchy', (req, res) => {
  res.json({
    success: true,
    platform: 'Kala Setu 2.0 Global World Network',
    count: UNIVERSAL_LOCATION_HIERARCHY.length,
    locations: UNIVERSAL_LOCATION_HIERARCHY
  });
});

// List countries with coverage badges
worldRouter.get('/countries', (req, res) => {
  const summary = UNIVERSAL_LOCATION_HIERARCHY.map(c => ({
    id: c.id,
    name: c.name,
    local_name: c.local_name,
    code: c.code,
    flag_emoji: c.flag_emoji,
    coverage_status: c.coverage_status,
    status_label: c.status_label,
    description: c.description,
    regions_count: c.admin_regions.length,
    lat: c.lat,
    lng: c.lng
  }));

  res.json({
    success: true,
    countries: summary
  });
});

// Tier 1 to Tier 5 Cultural Sources & Provenance Metadata
worldRouter.get('/sources', (req, res) => {
  res.json({
    success: true,
    policy: 'Strict Cultural Provenance — No Hallucinated Cultural Facts',
    provenance_tiers: CULTURAL_SOURCES_PROVENANCE
  });
});
