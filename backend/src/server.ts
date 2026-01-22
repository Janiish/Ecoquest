import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { initSocket } from './socket';
import { initRedis } from './services/leaderboard';
import apiRoutes from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoquest';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Health endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'EcoQuest Backend is running!' });
});

// Version endpoint
app.get('/api/version', (req: Request, res: Response) => {
  res.json({ name: 'EcoQuest Backend', version: '1.0.0' });
});

// Mount API routes
app.use('/api', apiRoutes);

// Create HTTP server and Socket.io
const server = createServer(app);
export const io = initSocket(server);

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Initialize Redis
const setupRedis = async () => {
  try {
    await initRedis(REDIS_URL);
    console.log('Redis initialized');
  } catch (error) {
    console.error('Redis initialization failed:', error);
    process.exit(1);
  }
};

// Start server
const start = async () => {
  await connectMongoDB();
  await setupRedis();

  server.listen(PORT, () => {
    console.log(`🚀 EcoQuest Backend listening on port ${PORT}`);
  });
};

start();

export default app;
