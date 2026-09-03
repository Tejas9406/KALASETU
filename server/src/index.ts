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

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

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

// Start Server
const PORT = parseInt(env.PORT, 10) || 5000;

async function startServer() {
  await testDbConnection();
  await testRedisConnection();
  await initializeDatabaseSchema();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Kala Setu API Server live on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  });
}

startServer();

