import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';

dotenv.config();

import authRoutes from './routes/auth.routes.js';
import oauthRoutes from './routes/oauth.routes.js';
import deploymentRoutes from './routes/deployment.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

/* =========================
   FIXED CORS CONFIG (UPDATED)
========================= */

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // set in Vercel env
  'https://jellyfishai-d81cidjyn-vaishnavi252-ais-projects.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* ========================= */

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const connectDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'jellyfishai'
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDatabase();

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'JellyfishAI Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/deployments', deploymentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`
  });
});

app.use((err, req, res, next) => {
  console.error('❌ Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: true,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Only start the server when NOT running on Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log('\n================================');
    console.log('🚀 JellyfishAI Backend Server');
    console.log('================================');
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🤖 AI Routes: /api/ai/generate, /api/ai/correct, /api/ai/battle`);
    console.log('================================\n');
  });

  process.on('SIGINT', async () => {
    console.log('\n⏸️ Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
  });
}

// Export Express app for Vercel
export default app;