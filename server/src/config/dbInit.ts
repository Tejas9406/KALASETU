import { pool } from './db.js';

export async function initializeDatabaseSchema() {
  const client = await pool.connect();
  try {
    console.log('🔄 Initializing PostgreSQL Schema for Kala Setu...');

    // 1. Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        firebase_uid VARCHAR(128) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        phone VARCHAR(32),
        role VARCHAR(32) NOT NULL DEFAULT 'TOURIST', -- 'TOURIST', 'ARTISAN', 'ADMIN'
        avatar_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE users ADD COLUMN IF NOT EXISTS firebase_uid VARCHAR(128);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
    `);

    // 2. Artisan Verification Applications (Evidence-Based, O/o DC Handicrafts & Privacy Compliant)
    await client.query(`
      CREATE TABLE IF NOT EXISTS artisan_verification_applications (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
        artisan_name VARCHAR(255) NOT NULL,
        phone VARCHAR(32) NOT NULL,
        craft_type VARCHAR(255) NOT NULL,
        craft_cluster VARCHAR(255) NOT NULL,
        district VARCHAR(128) NOT NULL,
        state VARCHAR(128) NOT NULL,
        years_experience INT NOT NULL DEFAULT 1,
        pehchan_card_number VARCHAR(64),
        gi_authorized_user_no VARCHAR(64),
        award_category VARCHAR(64) DEFAULT 'NONE', -- 'NONE', 'STATE_AWARD', 'NATIONAL_AWARD', 'SHILP_GURU'
        id_proof_type VARCHAR(64) NOT NULL,       -- 'PEHCHAN_CARD', 'MASKED_AADHAAR', 'VOTER_ID', 'GUILD_CERTIFICATE'
        id_proof_storage_key TEXT NOT NULL,       -- Secure private storage reference
        evidence_photos JSONB NOT NULL DEFAULT '[]'::jsonb,
        evidence_video_key TEXT,
        status VARCHAR(32) NOT NULL DEFAULT 'PENDING_REVIEW', -- 'PENDING_REVIEW', 'NEEDS_CORRECTION', 'VERIFIED', 'REJECTED'
        trust_score INT DEFAULT 60,               -- Evidence-based calculated score
        reviewer_id VARCHAR(64) REFERENCES users(id),
        review_notes TEXT,
        rejection_reason TEXT,
        submitted_at TIMESTAMPTZ DEFAULT NOW(),
        reviewed_at TIMESTAMPTZ
      );
    `);

    // 3. Verification Audit Trail
    await client.query(`
      CREATE TABLE IF NOT EXISTS artisan_audit_logs (
        id VARCHAR(64) PRIMARY KEY,
        application_id VARCHAR(64) REFERENCES artisan_verification_applications(id) ON DELETE CASCADE,
        actor_id VARCHAR(64) REFERENCES users(id),
        action VARCHAR(64) NOT NULL, -- 'SUBMITTED', 'CORRECTION_REQUESTED', 'APPROVED', 'REJECTED'
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 4. Artisan Profiles (Publicly discoverable master artisans)
    await client.query(`
      CREATE TABLE IF NOT EXISTS artisan_profiles (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) UNIQUE REFERENCES users(id),
        application_id VARCHAR(64) REFERENCES artisan_verification_applications(id),
        artisan_name VARCHAR(255) NOT NULL,
        craft_type VARCHAR(255) NOT NULL,
        years_experience INT NOT NULL,
        trust_score INT DEFAULT 95,
        gi_certified BOOLEAN DEFAULT false,
        women_led BOOLEAN DEFAULT false,
        elderly_friendly BOOLEAN DEFAULT true,
        id_verified BOOLEAN DEFAULT true,
        skill_verified BOOLEAN DEFAULT true,
        lat NUMERIC(9,6) NOT NULL,
        lng NUMERIC(9,6) NOT NULL,
        location_name VARCHAR(255) NOT NULL,
        district VARCHAR(128) NOT NULL,
        state VARCHAR(128) NOT NULL,
        photo_url TEXT NOT NULL,
        bio TEXT NOT NULL,
        story TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 5. Global Countries & Universal Location Hierarchy (Section 9.1 & 12.4)
    await client.query(`
      CREATE TABLE IF NOT EXISTS countries (
        id VARCHAR(8) PRIMARY KEY,
        code VARCHAR(4) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        local_name VARCHAR(128),
        flag_emoji VARCHAR(16),
        coverage_status VARCHAR(32) NOT NULL DEFAULT 'AVAILABLE', -- 'AVAILABLE', 'PREVIEW', 'COMING_SOON'
        default_lat NUMERIC(9,6),
        default_lng NUMERIC(9,6)
      );

      CREATE TABLE IF NOT EXISTS admin_regions (
        id VARCHAR(64) PRIMARY KEY,
        country_id VARCHAR(8) REFERENCES countries(id) ON DELETE CASCADE,
        code VARCHAR(16) NOT NULL,
        name VARCHAR(128) NOT NULL,
        local_name VARCHAR(128),
        admin_level VARCHAR(32) NOT NULL DEFAULT 'ADMIN_LEVEL_1', -- 'ADMIN_LEVEL_1', 'ADMIN_LEVEL_2'
        parent_id VARCHAR(64),
        lat NUMERIC(9,6),
        lng NUMERIC(9,6)
      );

      CREATE TABLE IF NOT EXISTS localities (
        id VARCHAR(64) PRIMARY KEY,
        region_id VARCHAR(64) REFERENCES admin_regions(id) ON DELETE CASCADE,
        name VARCHAR(128) NOT NULL,
        local_name VARCHAR(128),
        cluster_type VARCHAR(64) NOT NULL DEFAULT 'MIXED', -- 'ARTISAN_CLUSTER', 'COMMUNITY_HERITAGE', 'MIXED'
        lat NUMERIC(9,6) NOT NULL,
        lng NUMERIC(9,6) NOT NULL
      );
    `);

    // 6. Cultural Sources (Tier 1-5 Source-Awareness, Section 9.3)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cultural_sources (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        source_type VARCHAR(64) NOT NULL, -- 'OFFICIAL_GOVT', 'UNESCO', 'ACADEMIC_INSTITUTION', 'COMMUNITY_ELDER', 'CURATED_ARCHIVE'
        tier INT NOT NULL DEFAULT 1,       -- Tier 1 (Official) to Tier 5 (Curated)
        source_url TEXT,
        license VARCHAR(64) NOT NULL DEFAULT 'CC-BY-SA 4.0',
        confidence_score NUMERIC(5,2) DEFAULT 0.95,
        contributor VARCHAR(255),
        last_verified TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 7. Crafts & Techniques (Artisan Intelligence Domain, Section 12.2)
    await client.query(`
      CREATE TABLE IF NOT EXISTS crafts (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(64) NOT NULL,
        origin_region VARCHAR(128) NOT NULL,
        materials JSONB NOT NULL DEFAULT '[]'::jsonb,
        gi_status VARCHAR(64) DEFAULT 'NONE',
        description TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS craft_techniques (
        id VARCHAR(64) PRIMARY KEY,
        craft_id VARCHAR(64) REFERENCES crafts(id) ON DELETE CASCADE,
        technique_name VARCHAR(255) NOT NULL,
        kinematic_profile JSONB DEFAULT '{}'::jsonb,
        difficulty_level VARCHAR(32) DEFAULT 'INTERMEDIATE',
        preservation_status VARCHAR(64) DEFAULT 'ENDANGERED'
      );
    `);

    // 8. Communities & Cultural Experiences (Community Domain, Section 12.3)
    await client.query(`
      CREATE TABLE IF NOT EXISTS communities (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        locality_id VARCHAR(64),
        tradition_summary TEXT NOT NULL,
        population_custodians INT DEFAULT 1000,
        contact_guidelines TEXT
      );

      CREATE TABLE IF NOT EXISTS community_experiences (
        id VARCHAR(64) PRIMARY KEY,
        community_id VARCHAR(64) REFERENCES communities(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        tradition_name VARCHAR(255) NOT NULL,
        category VARCHAR(64) NOT NULL,
        description TEXT NOT NULL,
        season VARCHAR(128) NOT NULL,
        lat NUMERIC(9,6) NOT NULL,
        lng NUMERIC(9,6) NOT NULL,
        capacity_daily INT DEFAULT 20,
        price_inr INT NOT NULL DEFAULT 0,
        duration_mins INT NOT NULL DEFAULT 120,
        cover_image TEXT,
        respect_rules JSONB DEFAULT '[]'::jsonb,
        significance TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 9. AI Telemetry & Reasoning Logs (Section 16.1 & 16.2)
    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_telemetry_logs (
        id VARCHAR(64) PRIMARY KEY,
        domain_type VARCHAR(32) NOT NULL, -- 'ARTISAN' or 'COMMUNITY'
        user_query TEXT NOT NULL,
        agent_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
        latency_ms INT DEFAULT 150,
        confidence NUMERIC(5,2) DEFAULT 0.95,
        model_provider VARCHAR(64) DEFAULT 'Groq/Llama-3.3-70B',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed Initial Countries (Global Expansion, Section 9.2)
    await client.query(`
      INSERT INTO countries (id, code, name, local_name, flag_emoji, coverage_status, default_lat, default_lng)
      VALUES 
        ('cnt_in', 'IN', 'India', 'भारत', '🇮🇳', 'AVAILABLE', 20.5937, 78.9629),
        ('cnt_jp', 'JP', 'Japan', '日本', '🇯🇵', 'PREVIEW', 35.6762, 139.6503),
        ('cnt_it', 'IT', 'Italy', 'Italia', '🇮🇹', 'PREVIEW', 41.8719, 12.5674),
        ('cnt_br', 'BR', 'Brazil', 'Brasil', '🇧🇷', 'COMING_SOON', -14.2350, -51.9253),
        ('cnt_mx', 'MX', 'Mexico', 'México', '🇲🇽', 'COMING_SOON', 23.6345, -102.5528)
      ON CONFLICT (id) DO NOTHING;
    `);

    // Seed Initial Admin Regions
    await client.query(`
      INSERT INTO admin_regions (id, country_id, code, name, local_name, admin_level, lat, lng)
      VALUES
        ('reg_in_mh', 'cnt_in', 'IN-MH', 'Maharashtra', 'महाराष्ट्र', 'ADMIN_LEVEL_1', 19.7515, 75.7139),
        ('reg_in_mp', 'cnt_in', 'IN-MP', 'Madhya Pradesh', 'मध्य प्रदेश', 'ADMIN_LEVEL_1', 22.9734, 78.6569),
        ('reg_in_as', 'cnt_in', 'IN-AS', 'Assam', 'অসম', 'ADMIN_LEVEL_1', 26.2006, 92.9376),
        ('reg_in_jk', 'cnt_in', 'IN-JK', 'Jammu & Kashmir', 'جموں و کشمیر', 'ADMIN_LEVEL_1', 33.7782, 76.5762),
        ('reg_in_wb', 'cnt_in', 'IN-WB', 'West Bengal', 'পশ্চিমবঙ্গ', 'ADMIN_LEVEL_1', 22.9868, 87.8550),
        ('reg_jp_kt', 'cnt_jp', 'JP-26', 'Kyoto Prefecture', '京都府', 'ADMIN_LEVEL_1', 35.0116, 135.7681),
        ('reg_it_tc', 'cnt_it', 'IT-52', 'Tuscany', 'Toscana', 'ADMIN_LEVEL_1', 43.7711, 11.2486)
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('✅ PostgreSQL Schema, Dual-Domain Tables, and Global Hierarchy successfully initialized.');
  } catch (err) {
    console.error('⚠️ Schema initialization warning:', err);
  } finally {
    client.release();
  }
}
