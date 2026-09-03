import pg from 'pg';
import { Redis } from '@upstash/redis';
import { env } from './env.js';

const { Pool } = pg;

// PostgreSQL Neon Connection Pool with SSL
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Upstash Redis Client
export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN
});

// Database initialization check & helper
export async function testDbConnection() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Connected to Neon PostgreSQL at:', res.rows[0].now);
    return true;
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err);
    return false;
  }
}

export async function testRedisConnection() {
  try {
    const pong = await redis.ping();
    console.log('✅ Connected to Upstash Redis, ping response:', pong);
    return true;
  } catch (err) {
    console.warn('⚠️ Upstash Redis ping warning (fallback memory cache active):', err);
    return false;
  }
}
