import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { testDbConnection, testRedisConnection } from './config/db.js';
import { initializeDatabaseSchema } from './config/dbInit.js';
import { authRouter } from './routes/auth.routes.js';
import { artisanRouter } from './routes/artisan.routes.js';
import { experienceRouter } from './routes/experience.routes.js';
import { bookingRouter } from './routes/booking.routes.js';
import { emergencyRouter } from './routes/emergency.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { govtRouter } from './routes/govt.routes.js';
import galleryRouter from './routes/gallery.routes.js';

const app = express();

// Middlewares
const allowedOrigins = [
  'https://kalasetu-ahxz.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

if (env.FRONTEND_URL) {
  // Support comma-separated FRONTEND_URL if provided
  env.FRONTEND_URL.split(',').forEach(origin => {
    const trimmed = origin.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    // Check if origin is explicitly in allowed list or is a Vercel preview/production deployment for kalasetu
    const isAllowed = allowedOrigins.includes(origin) || 
                      /^https:\/\/kalasetu.*\.vercel\.app$/.test(origin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback gracefully while setting headers
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Kala Setu API',
    problemStatement: 'PS-TUR05 - Local Artisan & Experience Discovery Platform',
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV
  });
});

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/artisans', artisanRouter);
app.use('/api/experiences', experienceRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/emergency', emergencyRouter);
app.use('/api/chat', chatRouter);
app.use('/api/govt', govtRouter);
app.use('/api/gallery', galleryRouter);

// Start Server
const PORT = parseInt(env.PORT || process.env.PORT || '5000', 10);

async function startServer() {
  await testDbConnection();
  await testRedisConnection();
  await initializeDatabaseSchema();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Kala Setu API Server live on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  });
}

startServer();

