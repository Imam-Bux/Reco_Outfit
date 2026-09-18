import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { seedAdmin } from './modules/admin/seed.js';
import adminRoutes from './modules/admin/routes.js';

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',');

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      await seedAdmin();
      isConnected = true;
    } catch (err) {
      console.error('Database connection failed:', err.message);
      return res.status(503).json({ success: false, message: 'Service temporarily unavailable' });
    }
  }
  next();
});

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'RecoOutfit backend is running' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    success: false,
    message: isProd ? 'Server error' : err.message || 'Server error',
  });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;