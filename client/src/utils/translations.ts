export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  discover: string;
  artisans: string;
  mapView: string;
  myBookings: string;
  gallery: string;
  registerArtisan: string;
  govtDashboard: string;
  searchPlaceholder: string;
  exploreExperiences: string;
  exploreCategories: string;
  featuredExperiences: string;
  livingHeritageMap: string;
  meetMasterArtisans: string;
  verifiedArtisan: string;
  womenLed: string;
  elderlyFriendly: string;
  giTagCertified: string;
  trustScore: string;
  bookExperience: string;
  bookNow: string;
  perPerson: string;
  duration: string;
  helpAndSupport: string;
  helpSupportDesc: string;
  writeReview: string;
  reviewsTitle: string;
  showSteps: string;
  aiSaathiTooltip: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: "KALA SETU",
    brandTagline: "Discover India's Living Heritage",
    discover: "Discover",
    artisans: "Master Artisans",
    mapView: "Heritage Map",
    myBookings: "My Bookings",
    gallery: "Community Gallery",
    registerArtisan: "Join as Artisan",
    govtDashboard: "Govt Intelligence",
    searchPlaceholder: "Search traditional crafts, workshops, or cities...",
    exploreExperiences: "Explore Experiences",
    exploreCategories: "Explore by Craft Tradition",
    featuredExperiences: "Featured Hands-On Experiences",
    livingHeritageMap: "Discover Living Heritage Nearby",
    meetMasterArtisans: "Meet the Custodians of Craft",
    verifiedArtisan: "Verified Artisan",
    womenLed: "Women-Led Collective",
    elderlyFriendly: "Senior & Family Friendly",
    giTagCertified: "GI Tag Certified",
    trustScore: "Trust Score",
    bookExperience: "Book Workshop",
    bookNow: "Book Now",
    perPerson: "per artisan seat",
    duration: "Duration",
    helpAndSupport: "Help & Support",
    helpSupportDesc: "Instant assistance, grievance escalation, and direct helplines.",
    writeReview: "Write a Review",
    reviewsTitle: "Artisan Workshop Reviews",
    showSteps: "Show Steps (Interactive Guide)",
    aiSaathiTooltip: "Kala Setu Saathi (AI Guide)"
  },
  hi: {
    brandName: "कला सेतु",
    brandTagline: "भारत की जीवंत विरासत का अनुभव करें",
    discover: "एक्सप्लोर करें",
    artisans: "मास्टर कारीगर",
    mapView: "विरासत मैप",
    myBookings: "मेरी बुकिंग",
    gallery: "क्राफ्ट गैलरी",
    registerArtisan: "कारीगर बनें",
    govtDashboard: "सरकारी डैशबोर्ड",
    searchPlaceholder: "हस्तशिल्प, कार्यशालाएं या शहर सर्च करें...",
    exploreExperiences: "अनुभव देखें",
    exploreCategories: "शिल्प परंपरा के अनुसार चुनें",
    featuredExperiences: "लोकप्रिय हस्तशिल्प कार्यशालाएं",
    livingHeritageMap: "आस-पास के कारीगरों को खोजें",
    meetMasterArtisans: "हमारे मास्टर कारीगरों से मिलें",
    verifiedArtisan: "सत्यापित कारीगर",
    womenLed: "महिला-नेतृत्व समूह",
    elderlyFriendly: "परिवार एवं बुजुर्गों के अनुकूल",
    giTagCertified: "जीआई टैग प्रमाणित",
    trustScore: "विश्वास स्कोर",
    bookExperience: "कार्यशाला बुक करें",
    bookNow: "अभी बुक करें",
    perPerson: "प्रति व्यक्ति",
    duration: "समय",
    helpAndSupport: "हेल्प & सपोर्ट",
    helpSupportDesc: "त्वरित सहायता, शिकायत निवारण और हेल्पलाइन नंबर।",
    writeReview: "रिव्यू लिखें",
    reviewsTitle: "पर्यटकों के अनुभव और रेटिंग",
    showSteps: "स्टेप्स देखें (गाइड)",
    aiSaathiTooltip: "कला सेतु साथी (AI गाइड)"
  },
  mr: {
    brandName: "कला सेतू",
    brandTagline: "भारताच्या जिवंत वारशाचा अनुभव घ्या",
    discover: "एक्सप्लोअर करा",
    artisans: "मास्टर कारागीर",
    mapView: "वारसा नकाशा",
    myBookings: "माझे बुकिंग",
    gallery: "हस्तकला गॅलरी",
    registerArtisan: "कारागीर नोंदणी",
    govtDashboard: "शासकीय डॅशबोर्ड",
    searchPlaceholder: "हस्तकला, कार्यशाळा किंवा शहरे सर्च करा...",
    exploreExperiences: "अनुभव पाहा",
    exploreCategories: "हस्तकला प्रकारानुसार निवडा",
    featuredExperiences: "विशेष हस्तकला कार्यशाळा",
    livingHeritageMap: "जवळपासचे कारागीर शोधा",
    meetMasterArtisans: "वारसा जपणारे कारागीर",
    verifiedArtisan: "प्रमाणित कारागीर",
    womenLed: "महिला बचत गट",
    elderlyFriendly: "ज्येष्ठांसाठी सुलभ",
    giTagCertified: "जीआय टॅग प्रमाणित",
    trustScore: "विश्वास निर्देशांक",
    bookExperience: "कार्यशाळा बुक करा",
    bookNow: "आता बुक करा",
    perPerson: "प्रति व्यक्ती",
    duration: "कालावधी",
    helpAndSupport: "मदत आणि सपोर्ट",
    helpSupportDesc: "त्वरित मदत, तक्रार निवारण आणि थेट हेल्पलाइन.",
    writeReview: "अभिप्राय नोंदवा",
    reviewsTitle: "पर्यटकांचे अभिप्राय आणि रेटिंग",
    showSteps: "मार्गदर्शन पायऱ्या पाहा",
    aiSaathiTooltip: "कला सेतू साथी (AI मार्गदर्शक)"
  },
  ta: {
    brandName: "கலா சேது",
    brandTagline: "இந்தியாவின் பாரம்பரிய கைவினை அனுபவங்கள்",
    discover: "ஆராயுங்கள்",
    artisans: "கைவினைஞர்கள்",
    mapView: "வரைபடம்",
    myBookings: "முன்பதிவுகள்",
    gallery: "புகைப்படங்கள்",
    registerArtisan: "கைவினைஞர் பதிவு",
    govtDashboard: "அரசு கண்காணிப்பு",
    searchPlaceholder: "பாரம்பரிய கலைகளைத் தேடுங்கள்...",
    exploreExperiences: "அனுபவங்கள்",
    exploreCategories: "வகைகள்",
    featuredExperiences: "சிறப்பு அனுபவங்கள்",
    livingHeritageMap: "அருகிலுள்ள கைவினைஞர்கள்",
    meetMasterArtisans: "முக்கிய கைவினைஞர்கள்",
    verifiedArtisan: "சரிபார்க்கப்பட்ட கைவினைஞர்",
    womenLed: "பெண்கள் தலைமையிலானது",
    elderlyFriendly: "முதியோர்க்கு உகந்தது",
    giTagCertified: "ஜிஐ சான்றிதழ்",
    trustScore: "நம்பகத்தன்மை",
    bookExperience: "முன்பதிவு செய்",
    bookNow: "இப்போது பதிவு செய்",
    perPerson: "ஒருவருக்கு",
    duration: "நேரம்",
    helpAndSupport: "உதவி & ஆதரவு",
    helpSupportDesc: "உடனடி உதவி மற்றும் அவசர எண்கள்.",
    writeReview: "கருத்து எழுதுங்கள்",
    reviewsTitle: "மதிப்பீடுகள் மற்றும் கருத்துக்கள்",
    showSteps: "வழிகாட்டுதல் படிகள்",
    aiSaathiTooltip: "கலா சேது சாதி (AI உதவியாளர்)"
  },
  te: {
    brandName: "కళా సేతు",
    brandTagline: "భారతీయ సజీవ వారసత్వాన్ని అన్వేషించండి",
    discover: "అన్వేషించండి",
    artisans: "చేతివృత్తుల కళాకారులు",
    mapView: "వారసత్వ పటం",
    myBookings: "నా బుకింగ్స్",
    gallery: "కళా గ్యాలరీ",
    registerArtisan: "కళాకారుడిగా చేరండి",
    govtDashboard: "ప్రభుత్వ విశ్లేషణ",
    searchPlaceholder: "కళలు, వర్క్‌షాప్‌లను వెతకండి...",
    exploreExperiences: "అనుభవాలు",
    exploreCategories: "చేతివృత్తుల వర్గాలు",
    featuredExperiences: "ప్రత్యేక వర్క్‌షాప్‌లు",
    livingHeritageMap: "సమీపంలోని కళాకారులు",
    meetMasterArtisans: "మాస్టర్ కళాకారులు",
    verifiedArtisan: "ధృవీకరించబడిన కళాకారుడు",
    womenLed: "మహిళా నేతృత్వ గ్రూప్",
    elderlyFriendly: "కుటుంబ & వృద్ధుల అనుకూలం",
    giTagCertified: "GI ట్యాగ్ సర్టిఫైడ్",
    trustScore: "విశ్వసనీయత స్కోర్",
    bookExperience: "వర్క్‌షాప్ బుక్ చేయండి",
    bookNow: "ఇప్పుడే బుక్ చేయండి",
    perPerson: "వ్యక్తికి",
    duration: "సమయం",
    helpAndSupport: "సహాయం & మద్దతు",
    helpSupportDesc: "తక్షణ సహాయం మరియు హెల్ప్‌లైన్ నంబర్లు.",
    writeReview: "రివ్యూ రాయండి",
    reviewsTitle: "యాత్రికుల సమీక్షలు",
    showSteps: "దశల వారీ గైడ్",
    aiSaathiTooltip: "కళా సేతు సాథీ (AI గైడ్)"
  },
  bn: {
    brandName: "কলা সেতু",
    brandTagline: "ভারতের ঐতিহ্যবাহী লোকশিল্পের সন্ধান করুন",
    discover: "এক্সপ্লোর করুন",
    artisans: "মাস্টার কারিগর",
    mapView: "হেরিটেজ ম্যাপ",
    myBookings: "আমার বুকিং",
    gallery: "শিল্প গ্যালারি",
    registerArtisan: "কারিগর নিবন্ধন",
    govtDashboard: "সরকারি ড্যাশবোর্ড",
    searchPlaceholder: "ঐতিহ্যবাহী কারুশিল্প ও কর্মশালা খুঁজুন...",
    exploreExperiences: "অভিজ্ঞতা দেখুন",
    exploreCategories: "শিল্পের ধরন অনুযায়ী খুঁজুন",
    featuredExperiences: "জনপ্রিয় ঐতিহ্যবাহী কর্মশালা",
    livingHeritageMap: "নিকটবর্তী কারিগর খুঁজুন",
    meetMasterArtisans: "আমাদের কারিগরদের সাথে পরিচিত হন",
    verifiedArtisan: "যাচাইকৃত কারিগর",
    womenLed: "মহিলা পরিচালিত গোষ্ঠী",
    elderlyFriendly: "পরিবার ও প্রবীণ বান্ধব",
    giTagCertified: "জিআই ট্যাগ প্রাপ্ত",
    trustScore: "বিশ্বাস স্কোর",
    bookExperience: "কর্মশালা বুক করুন",
    bookNow: "এখনই বুক করুন",
    perPerson: "জনপ্রতি",
    duration: "সময়সীমা",
    helpAndSupport: "সহায়তা ও সাপোর্ট",
    helpSupportDesc: "জরুরি সহায়তা, অভিযোগ ও সরাসরি হেল্পলাইন নম্বর।",
    writeReview: "মতামত লিখুন",
    reviewsTitle: "পর্যটকদের অভিজ্ঞতা ও রেটিং",
    showSteps: "গাইড দেখুন (ধাপসমূহ)",
    aiSaathiTooltip: "কলা সেতু সাথী (AI গাইড)"
  }
};
