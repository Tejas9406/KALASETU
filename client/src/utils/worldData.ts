import { UniversalLocation } from '../types';

export interface CulturalSourceProvenance {
  tier: number;
  tier_name: string;
  sources: Array<{
    name: string;
    role: string;
    confidence: string;
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
          { id: 'loc_chanderi', name: 'Chanderi (Ashoknagar)', local_name: 'चंदेरी', cluster_type: 'ARTISAN_CLUSTER', lat: 24.7120, lng: 78.1380, highlight: 'Chanderi Zari Silk Pit-Loom Guilds & Pranpur Craft Village' },
          { id: 'loc_bagh', name: 'Bagh (Dhar)', local_name: 'बाग', cluster_type: 'ARTISAN_CLUSTER', lat: 22.3688, lng: 74.7917, highlight: 'Natural Vegetable Alizarin Block Printing' }
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
          { id: 'loc_majuli', name: 'Majuli Island', local_name: 'মাজুলী', cluster_type: 'MIXED', lat: 26.9500, lng: 94.2167, highlight: 'Sankardeva Neo-Vaishnavite Mukha Masks & Raas Leela' },
          { id: 'loc_sualkuchi', name: 'Sualkuchi', local_name: 'শুৱালকুছি', cluster_type: 'ARTISAN_CLUSTER', lat: 26.1744, lng: 91.5739, highlight: 'Golden Muga & White Pat Silk Weaving' }
        ]
      },
      {
        id: 'reg_in_jk',
        code: 'IN-JK',
        name: 'Jammu & Kashmir',
        local_name: 'जम्मू और कश्मीर',
        lat: 33.7782,
        lng: 76.5762,
        localities: [
          { id: 'loc_srinagar', name: 'Srinagar Old City (Zadibal)', local_name: 'سرینگر', cluster_type: 'ARTISAN_CLUSTER', lat: 34.0837, lng: 74.7973, highlight: 'Walnut Wood Carving, Sozni Embroidery & Papier-Mâché' }
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
          { id: 'loc_bishnupur', name: 'Bishnupur (Bankura)', local_name: 'বিষ্ণুপুর', cluster_type: 'ARTISAN_CLUSTER', lat: 23.0760, lng: 87.3190, highlight: 'Bankura Terracotta Horses & Baluchari Silk Weaving' },
          { id: 'loc_purulia', name: 'Purulia', local_name: 'পুরুলিয়া', cluster_type: 'COMMUNITY_HERITAGE', lat: 23.3321, lng: 86.3652, highlight: 'Chhau Martial Mask Dance & Baghmundi Guilds' }
        ]
      },
      {
        id: 'reg_in_nl',
        code: 'IN-NL',
        name: 'Nagaland',
        local_name: 'नागालैंड',
        lat: 26.1584,
        lng: 94.5624,
        localities: [
          { id: 'loc_kisama', name: 'Kisama Heritage Village', local_name: 'किसामा', cluster_type: 'COMMUNITY_HERITAGE', lat: 25.6033, lng: 94.1167, highlight: 'Hornbill Festival of 17 Indigenous Tribes' }
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
    status_label: 'Preview (Sample Curated Traditions Ready)',
    description: 'Kyoto traditional crafts (Kiyomizu-yaki ceramics, Nishijin-ori silk weaving) and Gion community living festivals.',
    lat: 36.2048,
    lng: 138.2529,
    admin_regions: [
      {
        id: 'reg_jp_kyoto',
        code: 'JP-26',
        name: 'Kyoto Prefecture',
        local_name: '京都府',
        lat: 35.0116,
        lng: 135.7681,
        localities: [
          { id: 'loc_higashiyama', name: 'Higashiyama, Kyoto', local_name: '東山区', cluster_type: 'ARTISAN_CLUSTER', lat: 34.9950, lng: 135.7790, highlight: 'Kiyomizu-yaki 400-Year Pottery Kilns' },
          { id: 'loc_nishijin', name: 'Nishijin, Kyoto', local_name: '西陣', cluster_type: 'ARTISAN_CLUSTER', lat: 35.0310, lng: 135.7480, highlight: 'Nishijin-ori Kinran Silk Jacquard Weaving' },
          { id: 'loc_gion', name: 'Gion District', local_name: '祇園', cluster_type: 'COMMUNITY_HERITAGE', lat: 35.0037, lng: 135.7770, highlight: 'Gion Matsuri Yamaboko Intangible Float Rituals' }
        ]
      },
      {
        id: 'reg_jp_ishikawa',
        code: 'JP-17',
        name: 'Ishikawa Prefecture',
        local_name: '石川県',
        lat: 36.5947,
        lng: 136.6256,
        localities: [
          { id: 'loc_kanazawa', name: 'Kanazawa', local_name: '金沢市', cluster_type: 'ARTISAN_CLUSTER', lat: 36.5613, lng: 136.6562, highlight: 'Kanazawa Haku Gold Leaf Beating & Wajima Urushi Lacquer' }
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
    status_label: 'Preview (Sample Curated Traditions Ready)',
    description: 'Veneto glassblowing and Florentine vegetable-tanned cuoietto leathercraft guilds with historic bottegas.',
    lat: 41.8719,
    lng: 12.5674,
    admin_regions: [
      {
        id: 'reg_it_veneto',
        code: 'IT-34',
        name: 'Veneto',
        local_name: 'Veneto',
        lat: 45.4408,
        lng: 12.3155,
        localities: [
          { id: 'loc_murano', name: 'Murano Island, Venice', local_name: 'Murano', cluster_type: 'ARTISAN_CLUSTER', lat: 45.4586, lng: 12.3564, highlight: 'Murano Blown Glass, Millefiori & Calcedonio Master Furnaces' },
          { id: 'loc_burano', name: 'Burano Island, Venice', local_name: 'Burano', cluster_type: 'MIXED', lat: 45.4854, lng: 12.4167, highlight: 'Merletto di Burano Needle-Lace & Festa della Madonna' }
        ]
      },
      {
        id: 'reg_it_toscana',
        code: 'IT-52',
        name: 'Tuscany',
        local_name: 'Toscana',
        lat: 43.7696,
        lng: 11.2558,
        localities: [
          { id: 'loc_florence_oltrarno', name: 'Oltrarno, Florence', local_name: 'Oltrarno', cluster_type: 'ARTISAN_CLUSTER', lat: 43.7667, lng: 11.2483, highlight: 'Cuoietto Florentine Leather Guilds & Gold-Leaf Marbling' },
          { id: 'loc_siena', name: 'Siena', local_name: 'Siena', cluster_type: 'COMMUNITY_HERITAGE', lat: 43.3188, lng: 11.3308, highlight: 'Palio di Siena Contrada Medieval Pageantry' }
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
    status_label: 'Coming Soon (Partner Guild Ingestion Phase)',
    description: 'Bahia Capoeira Angola community rodas and Amazonian indigenous seed and palm fiber weaving.',
    lat: -14.2350,
    lng: -51.9253,
    admin_regions: [
      {
        id: 'reg_br_bahia',
        code: 'BR-BA',
        name: 'Bahia',
        local_name: 'Bahia',
        lat: -12.9777,
        lng: -38.5016,
        localities: [
          { id: 'loc_salvador', name: 'Pelourinho, Salvador', local_name: 'Salvador', cluster_type: 'COMMUNITY_HERITAGE', lat: -12.9714, lng: -38.5108, highlight: 'Afro-Brazilian Capoeira Roda & Berimbau Woodcraft' }
        ]
      }
    ]
  },
  {
    id: 'cnt_mx',
    name: 'Mexico',
    local_name: 'México',
    code: 'MX',
    flag_emoji: '🇲🇽',
    coverage_status: 'COMING_SOON',
    status_label: 'Coming Soon (Partner Guild Ingestion Phase)',
    description: 'Oaxaca Zapotec natural cochineal wool tapetes, Barro Negro clay, and Día de los Muertos living community altars.',
    lat: 23.6345,
    lng: -102.5528,
    admin_regions: [
      {
        id: 'reg_mx_oaxaca',
        code: 'MX-OAX',
        name: 'Oaxaca',
        local_name: 'Oaxaca',
        lat: 17.0732,
        lng: -96.7266,
        localities: [
          { id: 'loc_teotitlan', name: 'Teotitlán del Valle', local_name: 'Teotitlán', cluster_type: 'ARTISAN_CLUSTER', lat: 17.0272, lng: -96.5200, highlight: 'Zapotec Natural Cochineal & Indigo Loom Weaving' },
          { id: 'loc_coyotepec', name: 'San Bartolo Coyotepec', local_name: 'Coyotepec', cluster_type: 'ARTISAN_CLUSTER', lat: 16.9536, lng: -96.7083, highlight: 'Barro Negro Burnished Black Clay Pottery' }
        ]
      }
    ]
  }
];

export const CULTURAL_SOURCES_PROVENANCE: CulturalSourceProvenance[] = [
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
