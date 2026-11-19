import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/database.js';
import productRoutes from './src/routes/products.js';
import collectionRoutes from './src/routes/collections.js';
import cartRoutes from './src/routes/cart.js';
import userRoutes from './src/routes/users.js';
import orderRoutes from './src/routes/orders.js';
import blogRoutes from './src/routes/blog.js';
import paymentRoutes from './src/routes/payments.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
