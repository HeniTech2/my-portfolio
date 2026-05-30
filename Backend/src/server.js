import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(helmet());

// Body parsing with size limit to avoid large payload abuse
app.use(express.json({ limit: '100kb' }));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS: restrict in production using ALLOWED_ORIGIN env var
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));

// Apply rate limiter to API routes
app.use('/api', apiLimiter, contactRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});