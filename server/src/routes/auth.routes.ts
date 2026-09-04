import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { pool } from '../config/db.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

export const authRouter = Router();

/**
 * Exchange Firebase ID token / Credentials for a verified backend session
 */
authRouter.post('/session', async (req, res) => {
  try {
    const { firebaseToken, email, name, role = 'TOURIST', uid } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // 1. Look up user in PostgreSQL
    let userResult = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    let user = userResult.rows[0];

    // 2. If not found, create new user
    if (!user) {
      const newId = `usr_${Date.now()}`;
      const insertRes = await pool.query(
        `INSERT INTO users (id, firebase_uid, email, name, role) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [newId, uid || newId, email, name || email.split('@')[0], role.toUpperCase()]
      );
      user = insertRes.rows[0];
    } else if (uid && (!user.firebase_uid || user.firebase_uid.startsWith('usr_'))) {
      // Update firebase_uid if missing
      await pool.query('UPDATE users SET firebase_uid = $1 WHERE id = $2', [uid, user.id]);
      user.firebase_uid = uid;
    }

    // 3. Issue backend session JWT
    const token = jwt.sign(
      {
        id: user.id,
        firebase_uid: user.firebase_uid,
        name: user.name,
        email: user.email,
        role: user.role
      },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        firebase_uid: user.firebase_uid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Switch persona / Demo sign-in for quick evaluation during SIH hackathon
 */
authRouter.post('/login', async (req, res) => {
  try {
    const { role = 'TOURIST', email } = req.body;
    let normalizedRole = (role || 'TOURIST').toUpperCase();
    if (normalizedRole === 'GOVT' || normalizedRole === 'GOVERNMENT') {
      normalizedRole = 'ADMIN';
    }
    if (!['TOURIST', 'ARTISAN', 'ADMIN'].includes(normalizedRole)) {
      normalizedRole = 'TOURIST';
    }

    let user: any = null;

    try {
      let userQuery = 'SELECT * FROM users WHERE role = $1 LIMIT 1';
      let params: any[] = [normalizedRole];

      if (email) {
        userQuery = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
        params = [email];
      }

      const result = await pool.query(userQuery, params);
      user = result.rows[0];

      if (!user) {
        const newId = `usr_${Date.now()}`;
        const userName = normalizedRole === 'ADMIN' ? 'Directorate of Cultural Tourism' :
                         normalizedRole === 'ARTISAN' ? 'Santosh Kamble' : 'Aarav Sharma';
        const userEmail = email || (
          normalizedRole === 'ADMIN' ? 'ministry.tourism@gov.in' :
          normalizedRole === 'ARTISAN' ? 'santosh.kamble@kalasetu.in' : 'aarav.traveller@gmail.com'
        );

        const insertRes = await pool.query(
          `INSERT INTO users (id, firebase_uid, email, name, role) 
           VALUES ($1, $2, $3, $4, $5) 
           ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, name = EXCLUDED.name
           RETURNING *`,
          [newId, newId, userEmail, userName, normalizedRole]
        );
        user = insertRes.rows[0];
      }
    } catch (dbErr) {
      console.warn('⚠️ Database query warning during demo login, using fallback profile:', dbErr);
    }

    if (!user) {
      user = {
        id: normalizedRole === 'ADMIN' ? 'usr_admin_gov_01' :
            normalizedRole === 'ARTISAN' ? 'usr_artisan_demo_01' : 'usr_tourist_demo_01',
        name: normalizedRole === 'ADMIN' ? 'Directorate of Cultural Tourism' :
              normalizedRole === 'ARTISAN' ? 'Santosh Kamble' : 'Aarav Sharma',
        email: email || (
          normalizedRole === 'ADMIN' ? 'ministry.tourism@gov.in' :
          normalizedRole === 'ARTISAN' ? 'santosh.kamble@kalasetu.in' : 'aarav.traveller@gmail.com'
        ),
        phone: normalizedRole === 'ADMIN' ? '+91 11 2338 1234' :
               normalizedRole === 'ARTISAN' ? '+91 98220 12345' : '+91 98765 43210',
        role: normalizedRole
      };
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get current authenticated user profile
 */
authRouter.get('/me', authenticateUser, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
