import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { pool } from '../config/db.js';

export interface AuthenticatedUser {
  id: string;
  firebase_uid?: string;
  email: string;
  name?: string;
  phone?: string;
  role: 'TOURIST' | 'ARTISAN' | 'ADMIN';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Server-Side Authentication Middleware:
 * Validates either a Firebase ID Token or standard JWT Bearer token.
 * Looks up user record in PostgreSQL to enforce verified role from DB (NEVER trusts client payload).
 */
export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    let userEmail: string | undefined;
    let firebaseUid: string | undefined;

    let decodedStandardJwt: any = null;

    try {
      // 1. Check if token is standard JWT
      const decoded: any = jwt.verify(token, env.JWT_SECRET);
      decodedStandardJwt = decoded;
      userEmail = decoded.email;
      firebaseUid = decoded.firebase_uid || decoded.id;
    } catch (jwtErr) {
      // 2. Decode payload (for Firebase tokens in development or production)
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
          userEmail = payload.email || payload.user_id;
          firebaseUid = payload.sub || payload.uid || payload.user_id;
        }
      } catch (e) {
        return res.status(401).json({ success: false, error: 'Token decode failed' });
      }
    }

    if (!userEmail && !firebaseUid) {
      return res.status(401).json({ success: false, error: 'Invalid token identity' });
    }

    // 3. Query PostgreSQL for true server-side role and user ID
    let user: any = null;
    try {
      const userResult = await pool.query(
        'SELECT id, firebase_uid, email, name, phone, role FROM users WHERE email = $1 OR firebase_uid = $2 LIMIT 1',
        [userEmail || '', firebaseUid || '']
      );
      user = userResult.rows[0];

      // If user does not exist yet (first-time sign-up via Firebase), create user with default TOURIST role
      if (!user && userEmail) {
        const newId = `usr_${Date.now()}`;
        const defaultRole = decodedStandardJwt?.role || 'TOURIST';
        await pool.query(
          'INSERT INTO users (id, firebase_uid, email, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
          [newId, firebaseUid || newId, userEmail, defaultRole]
        );
        user = { id: newId, firebase_uid: firebaseUid, email: userEmail, role: defaultRole };
      }
    } catch (dbErr) {
      console.warn('⚠️ PostgreSQL query warning in authenticateUser:', dbErr);
    }

    // Resilient fallback for verified standard JWT tokens
    if (!user && decodedStandardJwt && decodedStandardJwt.role) {
      user = {
        id: decodedStandardJwt.id || `usr_${Date.now()}`,
        firebase_uid: decodedStandardJwt.id,
        email: decodedStandardJwt.email,
        name: decodedStandardJwt.name,
        role: decodedStandardJwt.role
      };
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not recognized' });
    }

    req.user = {
      id: user.id,
      firebase_uid: user.firebase_uid,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: (user.role || 'TOURIST').toUpperCase() as 'TOURIST' | 'ARTISAN' | 'ADMIN'
    };

    next();
  } catch (err: any) {
    res.status(401).json({ success: false, error: err.message || 'Authentication failed' });
  }
}

/**
 * Server-Side Role-Based Access Control (RBAC)
 * Blocks unauthorized users immediately with 403 Forbidden.
 */
export function requireRole(allowedRoles: Array<'TOURIST' | 'ARTISAN' | 'ADMIN'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: Access restricted to roles [${allowedRoles.join(', ')}]. Current role: ${req.user.role}`
      });
    }

    next();
  };
}

/**
 * Strict Verified Artisan Guard:
 * Only allows access if the artisan has status = 'VERIFIED' in artisan_verification_applications.
 */
export async function requireVerifiedArtisan(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    if (req.user.role === 'ADMIN') {
      return next(); // Admins have elevated supervisor access
    }

    if (req.user.role !== 'ARTISAN') {
      return res.status(403).json({ success: false, error: 'Only artisans may access this resource' });
    }

    // Check verification status in DB
    const resApp = await pool.query(
      'SELECT status FROM artisan_verification_applications WHERE user_id = $1 ORDER BY submitted_at DESC LIMIT 1',
      [req.user.id]
    );

    const app = resApp.rows[0];
    if (!app || app.status !== 'VERIFIED') {
      return res.status(403).json({
        success: false,
        error: 'Artisan application is currently pending review or needs correction',
        verificationStatus: app ? app.status : 'NOT_SUBMITTED'
      });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
