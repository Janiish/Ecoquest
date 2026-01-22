# EcoQuest Backend API

TypeScript Express backend with Firebase authentication, MongoDB, Redis leaderboards, and Socket.io realtime updates.

## 🏗️ Architecture

```
backend/
├── src/
│   ├── server.ts                 # Express app & HTTP server setup
│   ├── socket.ts                 # Socket.io initialization
│   ├── middleware/
│   │   └── auth.ts               # Firebase token verification
│   ├── models/
│   │   ├── User.ts               # User schema & interface
│   │   ├── Quest.ts              # Quest schema
│   │   └── Proof.ts              # Proof submission schema
│   ├── routes/
│   │   ├── index.ts              # Route aggregator
│   │   ├── auth.ts               # Authentication endpoints
│   │   ├── quests.ts             # Quest CRUD
│   │   ├── proofs.ts             # Proof submission & listing
│   │   └── leaderboard.ts        # Leaderboard endpoints
│   ├── services/
│   │   ├── points.ts             # XP awarding, badge logic
│   │   └── leaderboard.ts        # Redis leaderboard ops
│   ├── config/
│   │   ├── firebase.ts           # Firebase Admin SDK
│   │   └── cloudinary.ts         # Cloudinary config
│   └── tests/
│       └── basic.test.ts         # Health & version tests
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json
├── Dockerfile
└── .github/workflows/ci.yml      # CI/CD pipeline
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd backend
cp .env.example .env
```

Update `.env` with:
- `MONGO_URI`: MongoDB Atlas connection string
- `REDIS_URL`: Redis Cloud or local Redis URL
- `CLOUDINARY_URL`: Cloudinary API credentials
- `FIREBASE_*`: Firebase Admin SDK credentials from service account JSON

### 2. Install & Run

```bash
npm install
npm run dev
```

Server starts on `PORT=3000` (configurable).

### 3. Verify Health

```bash
curl http://localhost:3000/api/health
# { "status": "ok", "message": "EcoQuest Backend is running!" }

curl http://localhost:3000/api/version
# { "name": "EcoQuest Backend", "version": "1.0.0" }
```

## 🔐 Authentication

All protected routes require:
```
Authorization: Bearer <Firebase-ID-Token>
```

Firebase tokens are verified server-side and attached to `req.user`:
```typescript
{
  uid: string;
  email?: string;
  name?: string;
}
```

## 📡 API Endpoints

### Health & Info
- `GET /api/health` - Server status
- `GET /api/version` - API version

### Auth
- `POST /api/auth/session` - Verify token and return user record (protected)

### Quests
- `GET /api/quests` - List active quests (filters: `?category=&difficulty=`)
- `GET /api/quests/:id` - Get quest detail
- `POST /api/quests` - Create quest (protected, admin only)
- `PUT /api/quests/:id` - Update quest (protected, admin only)
- `DELETE /api/quests/:id` - Soft delete quest (protected, admin only)

### Proofs
- `POST /api/proofs` - Submit proof with file upload (protected)
  - Multipart form-data: `file`, `questId`, `caption?`
  - Uploads to Cloudinary, awards XP, emits socket event
- `GET /api/proofs?userUid=<uid>` - List user proofs (protected)

### Leaderboard
- `GET /api/leaderboard/global` - Top 10 global users
- `GET /api/leaderboard/local?city=<city>` - Top 10 in city

## ⚡ Realtime Events (Socket.io)

### Subscribe
```javascript
socket.emit('subscribe:leaderboard', { type: 'global' });
socket.emit('subscribe:leaderboard', { type: 'local', city: 'San Francisco' });
```

### Listen
```javascript
socket.on('leaderboard:update', (data) => {
  // { leaderboard: [{ rank, uid, name, xp, city }, ...] }
});

socket.on('proof:submitted', (data) => {
  // { userUid, questId, mediaUrl, caption }
});
```

## 🎯 Key Services

### Points Service (`services/points.ts`)

**awardPointsForProof(userUid, questId)**
- Increments user XP based on quest value
- Checks badge thresholds (100, 300, 600 XP)
- Updates streak (increments if yesterday, resets if >1 day gap)
- Syncs user to Redis leaderboards
- Emits socket events

**Badge Thresholds:**
- 100 XP: "First Step"
- 300 XP: "Tree Friend"
- 600 XP: "Eco Champion"

### Leaderboard Service (`services/leaderboard.ts`)

**syncUserToRedis(userUid, xp, city?)**
- Updates Redis sorted sets `leaderboard:global` and `leaderboard:city:<city>`

**getTopGlobal(limit=10)**
- Returns top users by XP globally

**getTopLocal(city, limit=10)**
- Returns top users by XP in a specific city

## 📦 Dependencies

- **express** - HTTP framework
- **mongoose** - MongoDB ODM
- **redis** - Leaderboard & caching
- **socket.io** - Realtime updates
- **firebase-admin** - Token verification
- **cloudinary** - Media storage
- **multer** - File upload handling
- **dotenv** - Environment config
- **cors** - CORS middleware

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:ui       # Vitest UI
npm run lint          # ESLint
```

## 🐳 Docker

```bash
docker build -t ecoquest-backend .
docker run -e MONGO_URI=... -e REDIS_URL=... -p 3000:3000 ecoquest-backend
```

## 📝 Verification Checklist

- [ ] Server starts: `npm run dev` → listening on PORT 3000
- [ ] Health endpoint: `curl http://localhost:3000/api/health` → 200
- [ ] Quests list: `curl http://localhost:3000/api/quests` → returns []
- [ ] Proof upload: POST to `/api/proofs` with auth header + file
- [ ] Points awarded: Verify user XP incremented in MongoDB
- [ ] Leaderboard: Verify Redis sorted set updated and top 10 returned
- [ ] Socket events: Connect client, verify `leaderboard:update` received

## 📚 File Reference

| File | Purpose |
|------|---------|
| [src/server.ts](src/server.ts) | Express app, DB/Redis init |
| [src/socket.ts](src/socket.ts) | Socket.io server |
| [middleware/auth.ts](src/middleware/auth.ts) | Firebase verification |
| [models/User.ts](src/models/User.ts) | User schema |
| [models/Quest.ts](src/models/Quest.ts) | Quest schema |
| [models/Proof.ts](src/models/Proof.ts) | Proof submission schema |
| [routes/quests.ts](src/routes/quests.ts) | Quest endpoints |
| [routes/proofs.ts](src/routes/proofs.ts) | Proof upload endpoint |
| [services/points.ts](src/services/points.ts) | XP & badge logic |
| [services/leaderboard.ts](src/services/leaderboard.ts) | Redis leaderboard |

## 🔧 TODO / Future

- [ ] Role-based access control (RBAC) for admin endpoints
- [ ] Proof verification system (human/ML review)
- [ ] Notification service (email/push on achievement)
- [ ] Analytics dashboard
- [ ] API rate limiting
- [ ] Request validation schemas (Zod/Joi)

## 📄 License

EcoQuest Backend - 2024
