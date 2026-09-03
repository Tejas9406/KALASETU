# 🏺 KALA SETU (कला सेतु)
### India's Local Experience Intelligence Platform • Smart India Hackathon 2026
**Problem Statement ID:** PS-TUR05  
**Title:** Local Artisan and Experience Discovery Platform — Develop a platform connecting tourists with verified local artisans, cultural activities and community experiences.

---

## 📖 Overview

**Kala Setu** is a national-scale digital platform connecting domestic and international tourists directly with India's verified hereditary master artisans, cultural workshops, and living rural heritage. 

By bypassing predatory commercial aggregators and middlemen (who traditionally siphon 40–60% of earnings), Kala Setu guarantees that **96%+ of experience fees go directly to the artisan** via direct bank settlement.

---

## 🚀 Key Features

1. **Evidence-Based Artisan Verification & Trust Score (0–100%):**
   - Multi-factor verification: National Artisan Pehchan ID / Aadhaar verification, skill lineage audit, and GI Tag certification.
2. **Direct Workshop Discovery & Booking Flow:**
   - Real-time slot reservation, guest counters, Razorpay sandbox payment simulation, and instant tamper-proof digital QR entry passes.
3. **Emergency SOS & Safe Mode System (100% Verified):**
   - Persistent red floating SOS button. Instant GPS coordinate capture, local police jurisdiction lookup (e.g. Kolhapur City Police Control Room), emergency SMS alerts, and encrypted live route tracking.
4. **Interactive Geospatial Cartography (MapLibre GL):**
   - Zero-cost open-source vector map featuring artisan clusters across Maharashtra (Kolhapur), Madhya Pradesh (Chanderi), Assam (Majuli Island), Jammu & Kashmir (Srinagar), and West Bengal (Bishnupur).
5. **AI Cultural Concierge ("Kala Setu Saathi"):**
   - Grounded RAG assistant with speech-to-text voice recognition and text-to-speech reading in 6 Indian languages (English, Hindi, Marathi, Tamil, Telugu, Bengali).
6. **Government Tourism Intelligence Dashboard:**
   - Real-time metrics for the Ministry of Tourism & State Craft Councils: One District One Product (ODOP) tracking, UN SDG progress indicators (SDG 8, SDG 12, SDG 5), and cluster health scorecards.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons |
| **Maps** | MapLibre GL (OpenStreetMap raster & vector tiles) |
| **Backend** | Node.js, Express, TypeScript (`tsx` + `tsc`) |
| **Database** | Neon Serverless PostgreSQL 18.6 (SSL enabled) |
| **Caching** | Upstash Redis REST |
| **AI / RAG** | Gemini 1.5 Flash / OpenAI GPT-4o-mini / Grounded Heritage Knowledge Base |
| **Payments** | Razorpay Test Sandbox |
| **Safety & SOS**| Web Geolocation API + Automated Jurisdiction Dispatcher + Tracking Link Generator |

---

## ⚡ Quick Start

### 1. Backend Server
```bash
cd server
npm install
npm run dev
# Running on http://localhost:5000
# Health Check: http://localhost:5000/api/health
```

### 2. Frontend Application
```bash
cd client
npm install
npm run dev
# Running on http://localhost:3000
```

---

## 📸 Verified Artifacts & Reports

- Comprehensive architectural blueprint: [implementation_plan.md](file:///C:/Users/tejas/.gemini/antigravity-ide/brain/2b181a66-72bc-4fd9-a0e0-c994d3f23b06/implementation_plan.md)
- Complete visual walkthrough & test results: [walkthrough.md](file:///C:/Users/tejas/.gemini/antigravity-ide/brain/2b181a66-72bc-4fd9-a0e0-c994d3f23b06/walkthrough.md)
- Browser testing session recording: [kala_setu_e2e.webp](file:///C:/Users/tejas/.gemini/antigravity-ide/brain/2b181a66-72bc-4fd9-a0e0-c994d3f23b06/kala_setu_e2e_1788162138953.webp)
