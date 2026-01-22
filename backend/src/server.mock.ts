// Mock server for local development without external dependencies
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Mock data
const mockUsers = new Map();
const mockQuests = [
  {
    _id: '1',
    title: 'Plant a Tree',
    description: 'Plant a tree in your local area and help fight climate change',
    xp: 50,
    category: 'nature',
    difficulty: 'easy',
    active: true,
  },
  {
    _id: '2',
    title: 'Use Public Transport',
    description: 'Take public transport instead of driving for a week',
    xp: 30,
    category: 'transport',
    difficulty: 'medium',
    active: true,
  },
  {
    _id: '3',
    title: 'Zero Waste Week',
    description: 'Try to produce zero waste for an entire week',
    xp: 100,
    category: 'lifestyle',
    difficulty: 'hard',
    active: true,
  },
];
const mockProofs = [];
const mockLeaderboard = [
  { rank: 1, uid: 'user1', name: 'Alex Green', xp: 450, city: 'San Francisco' },
  { rank: 2, uid: 'user2', name: 'Jordan Eco', xp: 380, city: 'Portland' },
  { rank: 3, uid: 'user3', name: 'Sam Nature', xp: 320, city: 'Seattle' },
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'EcoQuest Mock Server Running',
    mode: 'development',
    timestamp: new Date().toISOString(),
  });
});

// Version info
app.get('/api/version', (req, res) => {
  res.json({ 
    name: 'EcoQuest Backend (Mock)', 
    version: '1.0.0',
    mode: 'development',
  });
});

// Auth - Mock session
app.post('/api/auth/session', (req, res) => {
  const { uid, email, name } = req.body;
  
  if (!mockUsers.has(uid)) {
    mockUsers.set(uid, {
      uid,
      email: email || `${uid}@example.com`,
      name: name || 'User',
      xp: 0,
      badges: [],
      streak: 0,
      city: 'Mock City',
    });
  }
  
  res.json({ 
    message: 'Session created',
    user: mockUsers.get(uid),
  });
});

// Quests - List
app.get('/api/quests', (req, res) => {
  const { category, difficulty } = req.query;
  let filtered = [...mockQuests];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(q => q.category === category);
  }
  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  res.json(filtered);
});

// Quests - Get by ID
app.get('/api/quests/:id', (req, res) => {
  const quest = mockQuests.find(q => q._id === req.params.id);
  if (!quest) {
    return res.status(404).json({ error: 'Quest not found' });
  }
  res.json(quest);
});

// Quests - Create (mock)
app.post('/api/quests', (req, res) => {
  const newQuest = {
    _id: String(mockQuests.length + 1),
    ...req.body,
    active: true,
  };
  mockQuests.push(newQuest);
  res.status(201).json(newQuest);
});

// Proofs - Submit (mock)
app.post('/api/proofs', (req, res) => {
  const { userUid, questId, caption } = req.body;
  
  const proof = {
    _id: String(mockProofs.length + 1),
    userUid: userUid || 'mock-user',
    questId,
    mediaUrl: 'https://via.placeholder.com/400x300?text=Mock+Proof',
    caption: caption || '',
    verified: false,
    createdAt: new Date(),
  };
  
  mockProofs.push(proof);
  
  // Award mock XP
  if (mockUsers.has(userUid)) {
    const user = mockUsers.get(userUid);
    const quest = mockQuests.find(q => q._id === questId);
    if (quest) {
      user.xp += quest.xp;
      user.streak += 1;
      
      // Check badges
      if (user.xp >= 100 && !user.badges.includes('First Step')) {
        user.badges.push('First Step');
      }
      if (user.xp >= 300 && !user.badges.includes('Tree Friend')) {
        user.badges.push('Tree Friend');
      }
    }
  }
  
  res.status(201).json(proof);
});

// Proofs - List
app.get('/api/proofs', (req, res) => {
  const { userUid } = req.query;
  let filtered = [...mockProofs];
  
  if (userUid) {
    filtered = filtered.filter(p => p.userUid === userUid);
  }
  
  res.json(filtered);
});

// Leaderboard - Global
app.get('/api/leaderboard/global', (req, res) => {
  // Add any users from mockUsers to leaderboard
  const dynamicLeaderboard = [...mockLeaderboard];
  mockUsers.forEach(user => {
    if (!dynamicLeaderboard.find(u => u.uid === user.uid)) {
      dynamicLeaderboard.push({
        rank: dynamicLeaderboard.length + 1,
        uid: user.uid,
        name: user.name,
        xp: user.xp,
        city: user.city,
      });
    }
  });
  
  // Sort by XP
  dynamicLeaderboard.sort((a, b) => b.xp - a.xp);
  dynamicLeaderboard.forEach((user, idx) => user.rank = idx + 1);
  
  res.json(dynamicLeaderboard.slice(0, 10));
});

// Leaderboard - Local
app.get('/api/leaderboard/local', (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City parameter required' });
  }
  
  const filtered = mockLeaderboard.filter(u => u.city === city);
  res.json(filtered);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 EcoQuest Mock Backend');
  console.log('========================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log('✅ Mode: Development (Mock)');
  console.log('');
  console.log('📝 Available endpoints:');
  console.log('  GET  /api/health');
  console.log('  GET  /api/version');
  console.log('  POST /api/auth/session');
  console.log('  GET  /api/quests');
  console.log('  GET  /api/quests/:id');
  console.log('  POST /api/quests');
  console.log('  POST /api/proofs');
  console.log('  GET  /api/proofs');
  console.log('  GET  /api/leaderboard/global');
  console.log('  GET  /api/leaderboard/local');
  console.log('');
  console.log('⚠️  Note: Using mock data (no Firebase/MongoDB/Redis)');
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Remove the export to prevent module loading issues
// export default app;
