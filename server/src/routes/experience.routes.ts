import { Router } from 'express';
import { pool } from '../config/db.js';

export const experienceRouter = Router();

// In-memory reviews store
const REVIEWS_STORE: Record<string, any[]> = {
  'exp_kolhapur_01': [
    {
      id: 'rev_1',
      reviewer_name: 'Rohan Deshmukh',
      rating: 5,
      comment: 'Incredible workshop! Santosh-ji taught us the whole vegetable-tanning process and how to braid the leather straps. Left with my own pair of custom chappals!',
      created_at: '2026-08-25T10:30:00Z',
      verified: true,
      photos: ['/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg']
    },
    {
      id: 'rev_2',
      reviewer_name: 'Dr. Priya Mehta',
      rating: 5,
      comment: 'Authentic hereditary craft experience. The workshop was comfortable and we also learned about the history under Chhatrapati Shahu Maharaj.',
      created_at: '2026-08-20T14:15:00Z',
      verified: true,
      photos: []
    },
    {
      id: 'rev_3',
      reviewer_name: 'Amitabh Sen',
      rating: 4,
      comment: 'Very thorough demonstration of traditional wooden lasts and buffing with agate stone. Highly recommended for craft enthusiasts.',
      created_at: '2026-08-14T09:00:00Z',
      verified: true,
      photos: []
    }
  ],
  'exp_chanderi_01': [
    {
      id: 'rev_4',
      reviewer_name: 'Sunaina Rao',
      rating: 5,
      comment: 'Weaving silk on a pit-loom in Pranpur village was magical. Kamla Bai was so warm and patient with beginners.',
      created_at: '2026-08-28T16:00:00Z',
      verified: true,
      photos: ['/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg']
    },
    {
      id: 'rev_5',
      reviewer_name: 'Ananya Verma',
      rating: 5,
      comment: 'The sheer feather-light quality of authentic Chanderi silk is impossible to appreciate until you sit at the loom yourself.',
      created_at: '2026-08-18T11:20:00Z',
      verified: true,
      photos: []
    }
  ]
};

// Enriched 17+ Experiences corresponding to the master artisans
const SEEDED_EXPERIENCES = [
  // Kolhapur (5)
  {
    id: 'exp_kolhapur_01',
    artisan_id: 'art_kolhapur_01',
    artisan_name: 'Santosh Kamble',
    artisan_avatar: '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    trust_score: 98,
    title: 'Heritage Kolhapuri Chappal Crafting Masterclass',
    description: 'Learn ancestral vegetable tanning using myrobalan and babool bark. Sit alongside 4th-generation master cobblers, shape traditional wooden lasts, hand-punch intricate motifs, and braid genuine leather straps.',
    category: 'Leathercraft',
    price_inr: 1850,
    duration_mins: 150,
    max_participants: 8,
    lat: 16.7050,
    lng: 74.2433,
    location_name: 'Shivaji Market, Kolhapur',
    district: 'Kolhapur',
    state: 'Maharashtra',
    cover_image: '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    odop_tag: 'ODOP-MH-KOLHAPUR-LEATHER',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_kolhapur_02',
    artisan_id: 'art_kolhapur_02',
    artisan_name: 'Sunita Patil',
    artisan_avatar: '/assets/images/03-Women-Artisans/Women_working_on_Handloom.jpg',
    trust_score: 95,
    title: 'Kolhapur Royal Cord Knotting & Zaree Embroidery',
    description: 'A women-led workshop dedicated to fine silk-knotting (Chutki work) and gold zaree lace ornamentation on traditional Maharashtrian leather goods.',
    category: 'Leathercraft',
    price_inr: 1400,
    duration_mins: 120,
    max_participants: 10,
    lat: 16.6980,
    lng: 74.2380,
    location_name: 'Bhavani Mandap Guild, Kolhapur',
    district: 'Kolhapur',
    state: 'Maharashtra',
    cover_image: '/assets/images/03-Women-Artisans/Women_working_on_Handloom.jpg',
    odop_tag: 'ODOP-WOMEN-GUILD',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_kolhapur_03',
    artisan_id: 'art_kolhapur_03',
    artisan_name: 'Rameshwar Kumbhar',
    artisan_avatar: '/assets/images/05-Wood-Pottery/Man making pottery.jpg',
    trust_score: 94,
    title: 'Panchganga Riverbank Earthen Pottery & Wheel Throwing',
    description: 'Throw natural terracotta pots on an electric and manual stone wheel. Learn natural pebble-burnishing and traditional straw reduction firing for rich black earthenware.',
    category: 'Pottery',
    price_inr: 1200,
    duration_mins: 120,
    max_participants: 6,
    lat: 16.7120,
    lng: 74.2250,
    location_name: 'Kumbhar Galli, Kolhapur',
    district: 'Kolhapur',
    state: 'Maharashtra',
    cover_image: '/assets/images/05-Wood-Pottery/Man making pottery.jpg',
    odop_tag: 'ODOP-EARTHENWARE',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_kolhapur_04',
    artisan_id: 'art_kolhapur_04',
    artisan_name: 'Meena Jadhav',
    artisan_avatar: '/assets/images/02-Handloom/Handloom_in_an_exhibition_002.jpg',
    trust_score: 96,
    title: 'Shuttle-Loom Organic Cotton Khadi Weaving',
    description: 'Experience pure cotton handloom weaving. Learn bobbin winding, shuttle throwing, and the mathematics behind authentic Maharashtrian border motifs.',
    category: 'Handloom',
    price_inr: 1600,
    duration_mins: 180,
    max_participants: 8,
    lat: 16.6850,
    lng: 74.2520,
    location_name: 'Ichalkaranji Belt, Kolhapur',
    district: 'Kolhapur',
    state: 'Maharashtra',
    cover_image: '/assets/images/02-Handloom/Handloom_in_an_exhibition_002.jpg',
    odop_tag: 'ODOP-KHADI',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_kolhapur_05',
    artisan_id: 'art_kolhapur_05',
    artisan_name: 'Ananda Chougule',
    artisan_avatar: '/assets/images/04-Bamboo-Cane/Bamboo products from kolhapur.jpeg',
    trust_score: 92,
    title: 'Western Ghats Bamboo Stripping & Basketry Atelier',
    description: 'Master the knife techniques used to split thick raw bamboo into paper-thin flexible strips. Weave geometric grain baskets and sustainable tableware.',
    category: 'Bamboo-Cane',
    price_inr: 1100,
    duration_mins: 120,
    max_participants: 12,
    lat: 16.7200,
    lng: 74.2100,
    location_name: 'Radhanagari, Kolhapur',
    district: 'Kolhapur',
    state: 'Maharashtra',
    cover_image: '/assets/images/04-Bamboo-Cane/Bamboo products from kolhapur.jpeg',
    odop_tag: 'ODOP-BAMBOO',
    women_friendly: true,
    elderly_friendly: true
  },

  // Chanderi (3)
  {
    id: 'exp_chanderi_01',
    artisan_id: 'art_chanderi_01',
    artisan_name: 'Kamla Bai',
    artisan_avatar: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
    trust_score: 97,
    title: 'Royal Chanderi Silk Pit-Loom Weaving & Zari Interlacing',
    description: 'Immerse yourself in 700-year-old Bundelkhand royalty. Sit in an earthen pit loom, handle pure mulberry silk and electroplated gold zari, and weave royal peacock motifs.',
    category: 'Handloom',
    price_inr: 2200,
    duration_mins: 180,
    max_participants: 6,
    lat: 24.7120,
    lng: 78.1380,
    location_name: 'Pranpur Craft Village, Chanderi',
    district: 'Ashoknagar',
    state: 'Madhya Pradesh',
    cover_image: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
    odop_tag: 'ODOP-MP-CHANDERI-SILK',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_chanderi_02',
    artisan_id: 'art_chanderi_02',
    artisan_name: 'Mohammad Rashid Ansari',
    artisan_avatar: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_07.jpg',
    trust_score: 98,
    title: 'Jacquard Zari Brocade & Gossamer Silk Masterclass',
    description: 'Learn the delicate micro-threading required for 300-count gossamer cotton-silk fabrics, guided by master awardee weavers of the historic Bada Bazaar guild.',
    category: 'Handloom',
    price_inr: 2400,
    duration_mins: 180,
    max_participants: 6,
    lat: 24.7180,
    lng: 78.1320,
    location_name: 'Bada Bazaar, Chanderi',
    district: 'Ashoknagar',
    state: 'Madhya Pradesh',
    cover_image: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_07.jpg',
    odop_tag: 'ODOP-CHANDERI-BROCADE',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_chanderi_03',
    artisan_id: 'art_chanderi_03',
    artisan_name: 'Devendra Koli',
    artisan_avatar: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_18.jpg',
    trust_score: 93,
    title: 'Natural Indigo & Marigold Silk Yarn Vat Dyeing',
    description: 'Hands-on natural yarn vat dyeing session using pomegranate rind, indigo leaf fermentation, and marigold flower extract to produce rich eco-friendly silk colors.',
    category: 'Handloom',
    price_inr: 1500,
    duration_mins: 120,
    max_participants: 10,
    lat: 24.7080,
    lng: 78.1420,
    location_name: 'Koli Mohalla, Chanderi',
    district: 'Ashoknagar',
    state: 'Madhya Pradesh',
    cover_image: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_18.jpg',
    odop_tag: 'ODOP-NATURAL-DYES',
    women_friendly: true,
    elderly_friendly: false
  },

  // Majuli (3)
  {
    id: 'exp_majuli_01',
    artisan_id: 'art_majuli_01',
    artisan_name: 'Hemanta Bora',
    artisan_avatar: '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
    trust_score: 96,
    title: 'Neo-Vaishnavite Mukha Bamboo Mask Sculpting Masterclass',
    description: 'Learn the 500-year-old art of crafting mythical character masks (Mukha) using bamboo splits, organic Brahmaputra riverbed silt, and natural vegetable pigments.',
    category: 'Bamboo-Cane',
    price_inr: 1950,
    duration_mins: 180,
    max_participants: 8,
    lat: 26.9500,
    lng: 94.2167,
    location_name: 'Natun Samaguri Satra, Majuli Island',
    district: 'Majuli',
    state: 'Assam',
    cover_image: '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
    odop_tag: 'ODOP-AS-MAJULI-MASKS',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_majuli_02',
    artisan_id: 'art_majuli_02',
    artisan_name: 'Rumi Doley',
    artisan_avatar: '/assets/images/03-Women-Artisans/A_tribal_women_weaving_ethnic_handlooms_in_Assam.jpg',
    trust_score: 95,
    title: 'Mishing Tribal Ahimsa Eri Silk & Waist-Loom Weaving',
    description: 'Learn traditional tribal waist-loom weaving with peace-silk (Eri silk), spun from wild cocoons without harming the moth, dyed with forest roots.',
    category: 'Handloom',
    price_inr: 1750,
    duration_mins: 150,
    max_participants: 8,
    lat: 26.9650,
    lng: 94.2300,
    location_name: 'Jengraimukh, Majuli',
    district: 'Majuli',
    state: 'Assam',
    cover_image: '/assets/images/03-Women-Artisans/A_tribal_women_weaving_ethnic_handlooms_in_Assam.jpg',
    odop_tag: 'ODOP-ERI-SILK',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_majuli_03',
    artisan_id: 'art_majuli_03',
    artisan_name: 'Biren Kalita',
    artisan_avatar: '/assets/images/04-Bamboo-Cane/Old man Crafting Bomboo.jpeg',
    trust_score: 93,
    title: 'Heritage Cane Sieving & Dun Vessel Crafting',
    description: 'Learn to split and bevel fine Assam rattan cane to produce traditional Dun grain measures, fish traps, and flexible eco-friendly lampshades.',
    category: 'Bamboo-Cane',
    price_inr: 1300,
    duration_mins: 120,
    max_participants: 8,
    lat: 26.9400,
    lng: 94.2050,
    location_name: 'Kamalabari, Majuli',
    district: 'Majuli',
    state: 'Assam',
    cover_image: '/assets/images/04-Bamboo-Cane/Old man Crafting Bomboo.jpeg',
    odop_tag: 'ODOP-CANE-MAJULI',
    women_friendly: true,
    elderly_friendly: true
  },

  // Srinagar (3)
  {
    id: 'exp_srinagar_01',
    artisan_id: 'art_srinagar_01',
    artisan_name: 'Ghulam Mohammad Zargar',
    artisan_avatar: '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
    trust_score: 99,
    title: 'Master Walnut Wood Undercut Relief & Chinar Carving',
    description: 'Master delicate chisel channelling and deep 3D floral undercut carving on seasoned Kashmir walnut wood root blocks in the heart of Old Srinagar.',
    category: 'Woodwork',
    price_inr: 2500,
    duration_mins: 180,
    max_participants: 6,
    lat: 34.0837,
    lng: 74.7973,
    location_name: 'Zadibal Guild, Old Srinagar',
    district: 'Srinagar',
    state: 'Jammu and Kashmir',
    cover_image: '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
    odop_tag: 'ODOP-JK-SRINAGAR-WALNUT',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_srinagar_02',
    artisan_id: 'art_srinagar_02',
    artisan_name: 'Farooq Ahmed Mir',
    artisan_avatar: '/assets/images/02-Handloom/Rajasthan_Carpet_Weaver.jpg',
    trust_score: 97,
    title: 'Pure Changthangi Pashmina Spinning & Sozni Embroidery',
    description: 'Discover how 12-micron raw Pashmina goat wool is hand-spun on wooden charkhas and ornamented with micro-needle Sozni needlecraft.',
    category: 'Handloom',
    price_inr: 2800,
    duration_mins: 150,
    max_participants: 6,
    lat: 34.0900,
    lng: 74.8100,
    location_name: 'Nowhatta, Srinagar',
    district: 'Srinagar',
    state: 'Jammu and Kashmir',
    cover_image: '/assets/images/02-Handloom/Rajasthan_Carpet_Weaver.jpg',
    odop_tag: 'ODOP-PASHMINA',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_srinagar_03',
    artisan_id: 'art_srinagar_03',
    artisan_name: 'Bashir Butt',
    artisan_avatar: '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    trust_score: 94,
    title: 'Kashmir Papier-Mâché Pulp Molding & Gold Naqashi',
    description: 'Learn paper pulp molding and intricate 24-karat gold leaf hazara miniature brushwork on traditional papier-mâché jewelry boxes and wall plates.',
    category: 'Painting',
    price_inr: 1800,
    duration_mins: 120,
    max_participants: 10,
    lat: 34.0750,
    lng: 74.8200,
    location_name: 'Alamgari Bazaar, Srinagar',
    district: 'Srinagar',
    state: 'Jammu and Kashmir',
    cover_image: '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    odop_tag: 'ODOP-PAPIER-MACHE',
    women_friendly: true,
    elderly_friendly: true
  },

  // Bishnupur (3)
  {
    id: 'exp_bishnupur_01',
    artisan_id: 'art_bishnupur_01',
    artisan_name: 'Subhas Kumbhakar',
    artisan_avatar: '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    trust_score: 96,
    title: 'Living Terracotta Temple Tile & Bankura Horse Modeling',
    description: 'Shape the iconic long-eared Bankura horse in five distinct hollow parts on a potter wheel, burnish with river stones, and fire in traditional wood kilns.',
    category: 'Pottery',
    price_inr: 1450,
    duration_mins: 150,
    max_participants: 8,
    lat: 23.0760,
    lng: 87.3190,
    location_name: 'Panchmura Village, Bankura',
    district: 'Bankura',
    state: 'West Bengal',
    cover_image: '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    odop_tag: 'ODOP-WB-BANKURA-HORSE',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_bishnupur_02',
    artisan_id: 'art_bishnupur_02',
    artisan_name: 'Aparna Dey',
    artisan_avatar: '/assets/images/02-Handloom/Weaver_making_saree_Bishnupur.jpg',
    trust_score: 95,
    title: 'Baluchari Silk Jacquard Epic Narrative Weaving',
    description: 'Weave classical scenes from Mahabharata and Ramayana into rich Baluchari silk borders using un-twisted mulberry silk threads on master jacquard looms.',
    category: 'Handloom',
    price_inr: 2100,
    duration_mins: 180,
    max_participants: 6,
    lat: 23.0850,
    lng: 87.3250,
    location_name: 'Bishnupur Silk Guild, Bankura',
    district: 'Bankura',
    state: 'West Bengal',
    cover_image: '/assets/images/02-Handloom/Weaver_making_saree_Bishnupur.jpg',
    odop_tag: 'ODOP-BALUCHARI',
    women_friendly: true,
    elderly_friendly: true
  },
  {
    id: 'exp_bishnupur_03',
    artisan_id: 'art_bishnupur_03',
    artisan_name: 'Nitai Karmakar',
    artisan_avatar: '/assets/images/05-Wood-Pottery/Woodcarving_in_the_Odisha_Crafts_Museum_08.jpg',
    trust_score: 93,
    title: 'Dokra Lost-Wax Bell Metal Casting Masterclass',
    description: 'Learn the 4,000-year-old Harappan lost-wax casting technique. Wrap bees-wax threads over a clay core, pack with river silt, and cast with molten bell metal.',
    category: 'Metalcraft',
    price_inr: 1950,
    duration_mins: 180,
    max_participants: 6,
    lat: 23.0650,
    lng: 87.3050,
    location_name: 'Bikna Dokra Village, Bankura',
    district: 'Bankura',
    state: 'West Bengal',
    cover_image: '/assets/images/05-Wood-Pottery/Woodcarving_in_the_Odisha_Crafts_Museum_08.jpg',
    odop_tag: 'ODOP-DOKRA',
    women_friendly: true,
    elderly_friendly: true
  }
];

// Community Gallery Posts Store
let COMMUNITY_GALLERY = [
  {
    id: 'gal_1',
    title: 'Hand-stitching Kolhapuri chappal strap',
    media_url: '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    media_type: 'image',
    place: 'Kolhapur, Maharashtra',
    artisan_name: 'Santosh Kamble',
    uploader: 'Aarav Sharma (Tourist)',
    likes: 42,
    created_at: '2026-08-28'
  },
  {
    id: 'gal_2',
    title: 'Zari weaving on pit-loom in Pranpur',
    media_url: '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
    media_type: 'image',
    place: 'Chanderi, MP',
    artisan_name: 'Kamla Bai',
    uploader: 'Sunaina Rao (Tourist)',
    likes: 88,
    created_at: '2026-08-29'
  },
  {
    id: 'gal_3',
    title: 'Mukha mask bamboo armature structure',
    media_url: '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
    media_type: 'image',
    place: 'Majuli Island, Assam',
    artisan_name: 'Hemanta Bora',
    uploader: 'Hemanta Bora (Artisan)',
    likes: 64,
    created_at: '2026-08-27'
  },
  {
    id: 'gal_4',
    title: 'Relief undercut carving on Kashmir walnut wood',
    media_url: '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
    media_type: 'image',
    place: 'Srinagar, J&K',
    artisan_name: 'Ghulam Mohammad Zargar',
    uploader: 'Tariq Butt (Artisan)',
    likes: 95,
    created_at: '2026-08-26'
  },
  {
    id: 'gal_5',
    title: 'Bankura Terracotta Horse sculpture firing',
    media_url: '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    media_type: 'image',
    place: 'Bishnupur, West Bengal',
    artisan_name: 'Subhas Kumbhakar',
    uploader: 'Priya Mukherjee (Tourist)',
    likes: 51,
    created_at: '2026-08-25'
  },
  {
    id: 'gal_6',
    title: 'Cane and bamboo basketry demonstration',
    media_url: '/assets/images/04-Bamboo-Cane/Cane_and_Bamboo_handicrafts_of_Assam.jpg',
    media_type: 'image',
    place: 'Majuli Island, Assam',
    artisan_name: 'Biren Kalita',
    uploader: 'Debajit Saikia (Tourist)',
    likes: 39,
    created_at: '2026-08-24'
  }
];

// Get all experiences with filters
experienceRouter.get('/', async (req, res) => {
  try {
    const { category, state, search, women_friendly, elderly_friendly, odop } = req.query;

    let list = [...SEEDED_EXPERIENCES];

    if (category && category !== 'All') {
      list = list.filter(e => e.category.toLowerCase().includes(String(category).toLowerCase()));
    }
    if (state && state !== 'All') {
      list = list.filter(e => e.state.toLowerCase().includes(String(state).toLowerCase()));
    }
    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) || 
        e.district.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        (e.artisan_name && e.artisan_name.toLowerCase().includes(q))
      );
    }
    if (women_friendly === 'true') {
      list = list.filter(e => e.women_friendly);
    }
    if (elderly_friendly === 'true') {
      list = list.filter(e => e.elderly_friendly);
    }
    if (odop === 'true') {
      list = list.filter(e => Boolean(e.odop_tag));
    }

    res.json({ success: true, count: list.length, experiences: list });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Community Gallery endpoint (Lazy loaded & filterable)
experienceRouter.get('/gallery/all', (req, res) => {
  const { place, artisan } = req.query;
  let filtered = [...COMMUNITY_GALLERY];

  if (place && place !== 'All') {
    filtered = filtered.filter(g => g.place.toLowerCase().includes(String(place).toLowerCase()));
  }
  if (artisan && artisan !== 'All') {
    filtered = filtered.filter(g => g.artisan_name.toLowerCase().includes(String(artisan).toLowerCase()));
  }

  res.json({ success: true, count: filtered.length, items: filtered });
});

// Upload to community gallery
experienceRouter.post('/gallery/upload', (req, res) => {
  try {
    const { title, mediaUrl, place, artisanName, uploader } = req.body;
    if (!title || !mediaUrl) {
      return res.status(400).json({ success: false, error: 'Title and media URL are required' });
    }

    const newItem = {
      id: `gal_${Date.now()}`,
      title,
      media_url: mediaUrl,
      media_type: mediaUrl.endsWith('.mp4') ? 'video' : 'image',
      place: place || 'Heritage Craft Cluster, India',
      artisan_name: artisanName || 'Master Craftsman',
      uploader: uploader || 'Verified Traveler',
      likes: 1,
      created_at: new Date().toISOString().split('T')[0]
    };

    COMMUNITY_GALLERY.unshift(newItem);
    res.json({ success: true, item: newItem });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single experience detail + reviews
experienceRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const exp = SEEDED_EXPERIENCES.find(e => e.id === id) || SEEDED_EXPERIENCES[0];
    const reviews = REVIEWS_STORE[exp.id] || [
      {
        id: 'rev_default',
        reviewer_name: 'Kavita Iyer',
        rating: 5,
        comment: 'A transformative craft workshop. Hands-on learning directly from an authentic hereditary artisan.',
        created_at: '2026-08-20T10:00:00Z',
        verified: true,
        photos: []
      }
    ];

    res.json({
      success: true,
      experience: {
        ...exp,
        reviews
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Post a review for an experience (5-star ratings & comments)
experienceRouter.post('/:id/reviews', (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerName, rating, comment, photos } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, error: 'Rating and comment are required' });
    }

    const newReview = {
      id: `rev_${Date.now()}`,
      reviewer_name: reviewerName || 'Verified Traveler',
      rating: Number(rating) || 5,
      comment,
      photos: Array.isArray(photos) ? photos : [],
      verified: true,
      created_at: new Date().toISOString()
    };

    if (!REVIEWS_STORE[id]) {
      REVIEWS_STORE[id] = [];
    }
    REVIEWS_STORE[id].unshift(newReview);

    res.json({ success: true, review: newReview });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Map Clusters
experienceRouter.get('/map/clusters', async (req, res) => {
  try {
    const geoJson = {
      type: 'FeatureCollection',
      features: SEEDED_EXPERIENCES.map(item => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.lng, item.lat]
        },
        properties: {
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price_inr,
          location: `${item.district}, ${item.state}`,
          artisan: item.artisan_name,
          trustScore: item.trust_score,
          image: item.cover_image
        }
      }))
    };

    res.json({ success: true, geoJson, list: SEEDED_EXPERIENCES });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
