import { Router } from 'express';
import { AIService } from '../services/ai.service.js';

export const communityRouter = Router();

export interface CommunityExperienceItem {
  id: string;
  title: string;
  tradition_name: string;
  category: string;
  description: string;
  location_name: string;
  district: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  cover_image: string;
  season: string;
  community_custodians: string;
  trust_score: number;
  significance: string;
  family_friendly: boolean;
  respect_guidelines: string[];
  capacity_daily: number;
  price_inr: number;
  duration_mins: number;
}

export const SEEDED_COMMUNITY_EXPERIENCES: CommunityExperienceItem[] = [
  {
    id: 'cult_04',
    title: 'Kokan Shimga Palakhi Nrutya (Village Deities Palanquin Dance)',
    tradition_name: 'Shimagotsav Ancestral Palanquin Swaying',
    category: 'Seasonal Festival',
    description: 'Spectacular coastal village gathering where hereditary bearers dance through narrow betel-nut groves carrying sacred wooden palanquins of gram-daivatas.',
    location_name: 'Konkan Coastal Villages',
    district: 'Ratnagiri',
    state: 'Maharashtra',
    country: 'India',
    lat: 16.9902,
    lng: 73.3120,
    cover_image: '/assets/images/Culture/Palakhinrutya_-_Dance_of_Palanquin_of_Village_Dities_-_Shimagotsav_in_Kokan_-_Maharashtra.jpg',
    season: 'Holi / Shimga (March)',
    community_custodians: 'Kokan Gramstha & Tarang Custodians',
    trust_score: 96,
    significance: '400-year-old coastal Konkan agrarian community cohesion ritual.',
    family_friendly: true,
    respect_guidelines: [
      'Remove footwear at sacred threshold',
      'Follow local tarang procession direction',
      'Use only natural plant-based gulal colors'
    ],
    capacity_daily: 40,
    price_inr: 0,
    duration_mins: 180
  },
  {
    id: 'cult_03',
    title: 'Dhunuchi Naach & Kumartuli Sacred Clay Deity Invocation',
    tradition_name: 'Sacred Dhunuchi Aarti with Dhak Rhythm',
    category: 'Sacred Rituals',
    description: 'Ecstatic clay-censer devotional dance with burning coconut husk and camphor, celebrating the living artisan deity sculpted from holy Ganges clay.',
    location_name: 'Kumartuli Ghats, Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5986,
    lng: 88.3639,
    cover_image: '/assets/images/Culture/Dancing_mood_of_Durga_Puja.jpg',
    season: 'Sharadotsav (September – October)',
    community_custodians: 'Kumartuli Sculptors Guild & Dhakis',
    trust_score: 98,
    significance: 'UNESCO Representative List of the Intangible Cultural Heritage of Humanity.',
    family_friendly: true,
    respect_guidelines: [
      'Do not touch uninstalled sacred clay idols',
      'Maintain distance from hot incense fire censers',
      'Seek permission before flash photography of Dhakis'
    ],
    capacity_daily: 50,
    price_inr: 450,
    duration_mins: 120
  },
  {
    id: 'cult_09',
    title: 'Hornbill Indigenous Cultural Festival of 17 Tribes',
    tradition_name: 'Naga Morung Unity & Warrior Log-Drumming',
    category: 'Tribal Customs',
    description: 'Gathering of all 17 recognized indigenous Naga tribes showcasing ancestral log-drum music, ceremonial warrior attire, traditional wrestling, and folk dances.',
    location_name: 'Kisama Heritage Village',
    district: 'Kohima',
    state: 'Nagaland',
    country: 'India',
    lat: 25.6022,
    lng: 94.1105,
    cover_image: '/assets/images/Culture/The_Bhagoria_festival.jpg',
    season: 'December 1st to 10th (Winter)',
    community_custodians: '17 Naga Tribal Apex Councils',
    trust_score: 99,
    significance: 'Celebrated as the "Festival of Festivals" uniting Northeast indigenous oral traditions.',
    family_friendly: true,
    respect_guidelines: [
      'Respect sacred tribal clan totems',
      'Never touch ceremonial hornbill feather headgear without elder guidance',
      'Support indigenous bamboo craftspeople directly'
    ],
    capacity_daily: 120,
    price_inr: 600,
    duration_mins: 240
  },
  {
    id: 'cult_10',
    title: 'Kakada Bhajan & Warkari Bhakti Devotional Walk',
    tradition_name: 'Pre-Dawn Abhang Chanting & Palkhi Foot Pilgrimage',
    category: 'Folk Music',
    description: 'Ancient pre-dawn devotional singing of Tukaram and Dnyaneshwar abhangs with taal cymbals and mridangam, embodying 800 years of egalitarian Maharashtra bhakti.',
    location_name: 'Chandrabhaga Riverbanks',
    district: 'Pandharpur',
    state: 'Maharashtra',
    country: 'India',
    lat: 17.6778,
    lng: 75.3278,
    cover_image: '/assets/images/Culture/Devotees_offer_prayers_on_the_occasion_of_the_Chhath_Puja_festival.jpg',
    season: 'Year-round (Peak: Ashadhi & Kartiki Ekadashi)',
    community_custodians: 'Warkari Sampradaya & Hereditary Kirtankars',
    trust_score: 98,
    significance: 'Historic egalitarian saint-poet oral tradition promoting social harmony.',
    family_friendly: true,
    respect_guidelines: [
      'Maintain contemplative silence during pre-dawn prayer (4:30 AM)',
      'Participate respectfully in community chanting'
    ],
    capacity_daily: 60,
    price_inr: 0,
    duration_mins: 90
  },
  {
    id: 'cult_05',
    title: 'Bhil & Bhilala Bhagoria Haat Festival of Colors',
    tradition_name: 'Tribal Harvest Courtship & Dhol Assemblies',
    category: 'Seasonal Festival',
    description: 'Vibrant tribal carnival of giant dhol drums, brass ornaments, gulal celebrations, and community bonding across the Vindhyan hills.',
    location_name: 'Jhabua Tribal Belt',
    district: 'Jhabua',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 22.7699,
    lng: 74.5936,
    cover_image: '/assets/images/Culture/The_Bhagoria_festival.jpg',
    season: 'Week preceding Holi (March)',
    community_custodians: 'Bhil & Bhilala Tribal Elders',
    trust_score: 97,
    significance: 'Ancient indigenous harvest Thanksgiving and agrarian matchmaking fair.',
    family_friendly: true,
    respect_guidelines: [
      'Ask elder permission before taking portrait photos of women',
      'Observe community matchmaking customs respectfully from distance'
    ],
    capacity_daily: 45,
    price_inr: 0,
    duration_mins: 180
  },
  {
    id: 'cult_06',
    title: 'Chhath Mahaparv — Vedic Riverbank Solar Worship',
    tradition_name: 'Riverbed Arghya with Handmade Bamboo Soop',
    category: 'Sacred Rituals',
    description: 'Austerity festival honoring Surya and Chhathi Maiya on the banks of holy rivers, using 100% organic offerings and bamboo woven winnowing baskets.',
    location_name: 'Ganga Ghats, Patna',
    district: 'Patna',
    state: 'Bihar',
    country: 'India',
    lat: 25.6120,
    lng: 85.1440,
    cover_image: '/assets/images/Culture/Devotees_offer_prayers_on_the_occasion_of_the_Chhath_Puja_festival.jpg',
    season: 'Kartik Shukla Shashthi (November)',
    community_custodians: 'Ganga Ghat Parvatis & Bamboo Guilds',
    trust_score: 99,
    significance: 'Vedic solar science and ecological reverence unchanged for over 3,000 years.',
    family_friendly: true,
    respect_guidelines: [
      'Maintain clean pathways for barefoot devotees',
      'Zero non-biodegradable waste in riverbed',
      'Do not touch prasad baskets before offering rituals'
    ],
    capacity_daily: 80,
    price_inr: 0,
    duration_mins: 150
  },
  {
    id: 'cult_02',
    title: 'Bodo-Kachari Indigenous Loom Songs & Spring Customs',
    tradition_name: 'Bagurumba Dance & Dokhona Silk Rites',
    category: 'Folk Dance',
    description: 'Ancestral butterfly-movement spring rituals accompanied by Kham drums, Sifung flutes, and hand-spun floral Dokhona ceremonial weaving.',
    location_name: 'Kokrajhar Bodoland',
    district: 'Kokrajhar',
    state: 'Assam',
    country: 'India',
    lat: 26.4014,
    lng: 90.2716,
    cover_image: '/assets/images/Culture/Bodo-Kachari_2.jpg',
    season: 'Bwisagu Spring Festival (April)',
    community_custodians: 'Bodo Women Weaving & Cultural Guild',
    trust_score: 97,
    significance: 'UNESCO Intangible Folk Heritage Documentation.',
    family_friendly: true,
    respect_guidelines: [
      'Appreciate sacred weaving songs respectfully without interruption',
      'Support village weavers directly'
    ],
    capacity_daily: 30,
    price_inr: 500,
    duration_mins: 120
  },
  {
    id: 'cult_07',
    title: 'Gond & Baiga Forest Storytelling with Bana Strings',
    tradition_name: 'Pardhan Bardic Oral Epics of Mahua Groves',
    category: 'Folk Heritage',
    description: 'Mystical musical epics played on the two-stringed Bana instrument, recounting creation myths and sacred relationships with the Narmada valley flora.',
    location_name: 'Maikal Hills, Dindori',
    district: 'Dindori',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 22.9520,
    lng: 81.0820,
    cover_image: '/assets/images/Culture/Folk_Artist.jpg',
    season: 'Autumn Forest Gatherings (Oct - Feb)',
    community_custodians: 'Pardhan Gond Bards & Elders',
    trust_score: 98,
    significance: 'National Oral Heritage preservation and indigenous tribal mythology.',
    family_friendly: true,
    respect_guidelines: [
      'Respect sacred storytelling circle protocols',
      'No loud amplified electronics in forest settlements'
    ],
    capacity_daily: 25,
    price_inr: 750,
    duration_mins: 150
  },
  {
    id: 'cult_08',
    title: 'Theyyam Sacred Grove Invocation & Poliyanthram',
    tradition_name: 'Living Deity Embodiment & Fire Walking',
    category: 'Sacred Rituals',
    description: 'Ancestral temple ritual where hereditary performers don massive headdresses and red turmeric body paint to channel protective ancestral spirits.',
    location_name: 'North Malabar Sacred Groves',
    district: 'Kannur',
    state: 'Kerala',
    country: 'India',
    lat: 11.8745,
    lng: 75.3704,
    cover_image: '/assets/images/Culture/Poliyanthram_podavadukkam.jpg',
    season: 'November to May (Kavu Rituals)',
    community_custodians: 'Vannar & Malayan Hereditary Custodians',
    trust_score: 99,
    significance: 'Over 1,500 years of unbroken sacred grove conservation and spiritual dance.',
    family_friendly: true,
    respect_guidelines: [
      'Maintain absolute reverence in sacred kavu grove perimeter',
      'Do not cross boundaries during fire walking rituals'
    ],
    capacity_daily: 50,
    price_inr: 0,
    duration_mins: 200
  },
  {
    id: 'cult_11_jp',
    title: 'Gion Matsuri Yamaboko Procession Living Heritage',
    tradition_name: 'Yamaboko Junko Sacred Float Pageant',
    category: 'Heritage Procession',
    description: 'Over 1,100 years of unbroken Kyoto living heritage, featuring massive 25-meter wooden floats adorned with historic tapestries, paraded through the ancient capital.',
    location_name: 'Shijo-dori & Gion District',
    district: 'Kyoto',
    state: 'Kyoto Prefecture',
    country: 'Japan',
    lat: 35.0037,
    lng: 135.7772,
    cover_image: '/assets/images/Culture/Dancing_mood_of_Durga_Puja.jpg',
    season: 'July 14th to 24th (Midsummer)',
    community_custodians: 'Kyoto Machishu Historic Guilds',
    trust_score: 99,
    significance: 'UNESCO Intangible Cultural Heritage of Humanity.',
    family_friendly: true,
    respect_guidelines: [
      'Follow designated pedestrian spectator pathways',
      'Never obstruct float pulling ropes'
    ],
    capacity_daily: 200,
    price_inr: 0,
    duration_mins: 180
  },
  {
    id: 'cult_12_it',
    title: 'Carnevale di Venezia Historic Masquerade Pageant',
    tradition_name: 'Festa Veneziana & Commedia dell’Arte Masquerade',
    category: 'Seasonal Festival',
    description: 'Centuries-old Venetian living tradition of handcrafted papier-mâché masks, grand water parades along the Cannaregio canal, and historic guild revelry.',
    location_name: 'Grand Canal & San Marco',
    district: 'Venice',
    state: 'Veneto',
    country: 'Italy',
    lat: 45.4342,
    lng: 12.3389,
    cover_image: '/assets/images/Culture/Woman_lighting_the_candles_for_the_Festival_of_Lights_in_India.jpg',
    season: 'February (Carnival Season)',
    community_custodians: 'Compagnia de Calza & Mask Artisans Guild',
    trust_score: 98,
    significance: 'Traced to 1162 AD, celebrating Venetian civic identity and mask crafts.',
    family_friendly: true,
    respect_guidelines: [
      'Respect historical costume preservation protocols',
      'Adhere to canal bridge crowding controls'
    ],
    capacity_daily: 150,
    price_inr: 0,
    duration_mins: 150
  }
];

// In-memory reviews store for community experiences
const COMMUNITY_REVIEWS: Record<string, any[]> = {
  'cult_04': [
    {
      id: 'rev_c_1',
      reviewer_name: 'Mahesh Sawant',
      rating: 5,
      comment: 'Watching the palanquin sway through betel-nut groves was mesmerizing. The whole village came together in genuine solidarity.',
      created_at: '2026-03-24T18:00:00Z',
      verified: true
    }
  ],
  'cult_03': [
    {
      id: 'rev_c_2',
      reviewer_name: 'Anirban Bhattacharya',
      rating: 5,
      comment: 'The Dhak rhythm and sacred Dhunuchi dance along the Ganges is spiritually electrifying. Authentic living heritage at its zenith.',
      created_at: '2026-10-12T20:30:00Z',
      verified: true
    }
  ]
};

// 1. Get all community experiences with filters
communityRouter.get('/', (req, res) => {
  try {
    const { category, season, region, country, search, family_friendly } = req.query;
    let list = [...SEEDED_COMMUNITY_EXPERIENCES];

    if (category && category !== 'All') {
      list = list.filter(item => item.category.toLowerCase().includes(String(category).toLowerCase()));
    }
    if (season && season !== 'All') {
      list = list.filter(item => item.season.toLowerCase().includes(String(season).toLowerCase()));
    }
    if (region && region !== 'All') {
      list = list.filter(item => item.state.toLowerCase().includes(String(region).toLowerCase()) || item.district.toLowerCase().includes(String(region).toLowerCase()));
    }
    if (country && country !== 'All') {
      list = list.filter(item => item.country.toLowerCase().includes(String(country).toLowerCase()));
    }
    if (family_friendly === 'true') {
      list = list.filter(item => item.family_friendly);
    }
    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.tradition_name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      domain: 'COMMUNITY',
      count: list.length,
      experiences: list
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Map Clusters (Exclusively Community Experiences)
communityRouter.get('/map/clusters', (req, res) => {
  try {
    const geoJson = {
      type: 'FeatureCollection',
      features: SEEDED_COMMUNITY_EXPERIENCES.map(item => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.lng, item.lat]
        },
        properties: {
          id: item.id,
          title: item.title,
          tradition: item.tradition_name,
          category: item.category,
          season: item.season,
          location: `${item.district}, ${item.state}`,
          community: item.community_custodians,
          trustScore: item.trust_score,
          image: item.cover_image,
          domain: 'COMMUNITY'
        }
      }))
    };

    res.json({ success: true, domain: 'COMMUNITY', geoJson, list: SEEDED_COMMUNITY_EXPERIENCES });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Cultural Knowledge Graph Endpoint (Neo4j / GraphRAG)
communityRouter.get('/knowledge-graph', (req, res) => {
  try {
    const graph = AIService.getCulturalKnowledgeGraph();
    res.json({
      success: true,
      domain: 'COMMUNITY',
      graph
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. UNESCO Crowd & Pressure Intelligence Endpoint
communityRouter.get('/ai/crowd-pressure', (req, res) => {
  try {
    const { location = 'Konkan Coastal Villages', participants = 2 } = req.query;
    const analysis = AIService.calculateCrowdPressureIndex(String(location), Number(participants) || 2);
    res.json({ success: true, domain: 'COMMUNITY', analysis });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Seasonal Intelligence Calculator
communityRouter.get('/ai/seasonal', (req, res) => {
  try {
    const { tradition = 'Kokan Shimga', month = 'October' } = req.query;
    const seasonData = AIService.calculateSeasonalSuitability(String(tradition), String(month));
    res.json({ success: true, domain: 'COMMUNITY', seasonData });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Community AI Conversational Assistant with Visible Telemetry
communityRouter.post('/ai/chat', async (req, res) => {
  try {
    const { query, language = 'en', history = [] } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required' });
    }
    const result = await AIService.chatWithCommunityAI(query, history, language);
    res.json({
      success: true,
      domain: 'COMMUNITY',
      reply: result.reply,
      telemetry: result.telemetry
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Get single community experience detail
communityRouter.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const found = SEEDED_COMMUNITY_EXPERIENCES.find(c => c.id === id) || SEEDED_COMMUNITY_EXPERIENCES[0];
    const reviews = COMMUNITY_REVIEWS[found.id] || [
      {
        id: 'rev_default_comm',
        reviewer_name: 'Dr. Radhika Sen',
        rating: 5,
        comment: 'A profoundly authentic community immersion. Custodians guided us with warmth, depth, and respect.',
        created_at: '2026-08-15T10:00:00Z',
        verified: true
      }
    ];

    res.json({
      success: true,
      domain: 'COMMUNITY',
      experience: {
        ...found,
        reviews
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Post review for community experience
communityRouter.post('/:id/reviews', (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerName, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, error: 'Rating and comment are required' });
    }

    const newRev = {
      id: `rev_c_${Date.now()}`,
      reviewer_name: reviewerName || 'Verified Cultural Traveler',
      rating: Number(rating) || 5,
      comment,
      created_at: new Date().toISOString(),
      verified: true
    };

    if (!COMMUNITY_REVIEWS[id]) {
      COMMUNITY_REVIEWS[id] = [];
    }
    COMMUNITY_REVIEWS[id].unshift(newRev);

    res.json({ success: true, review: newRev });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
