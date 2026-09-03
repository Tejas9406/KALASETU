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

    // Seed initial admin user if not exists
    await client.query(`
      INSERT INTO users (id, firebase_uid, email, name, phone, role)
      VALUES 
        ('usr_admin_gov_01', 'gov_admin_root_sih', 'ministry.tourism@gov.in', 'Directorate of Cultural Tourism', '+91 11 2338 1234', 'ADMIN'),
        ('usr_artisan_demo_01', 'demo_artisan_sih', 'santosh.kamble@kalasetu.in', 'Santosh Kamble', '+91 98220 12345', 'ARTISAN')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('✅ PostgreSQL Schema and Government RBAC successfully initialized.');
  } catch (err) {
    console.error('⚠️ Schema initialization warning:', err);
  } finally {
    client.release();
  }
}
