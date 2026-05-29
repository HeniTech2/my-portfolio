import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});