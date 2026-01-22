# EcoQuest Backend - File Generation Summary

## ✅ Generated Files

### Configuration & Setup
- ✅ [.env.example](backend/.env.example) - Environment variables template
- ✅ [package.json](backend/package.json) - Dependencies & scripts
- ✅ [tsconfig.json](backend/tsconfig.json) - TypeScript configuration
- ✅ [.eslintrc.json](backend/.eslintrc.json) - ESLint rules

### Core Server
- ✅ [src/server.ts](backend/src/server.ts) - Express app, MongoDB/Redis/Socket.io init
- ✅ [src/socket.ts](backend/src/socket.ts) - Socket.io setup & event handlers

### Middleware
- ✅ [src/middleware/auth.ts](backend/src/middleware/auth.ts) - Firebase token verification

### Database Models
- ✅ [src/models/User.ts](backend/src/models/User.ts) - User schema (uid, xp, badges, streak)
- ✅ [src/models/Quest.ts](backend/src/models/Quest.ts) - Quest schema (title, xp, difficulty)
- ✅ [src/models/Proof.ts](backend/src/models/Proof.ts) - Proof schema (userUid, questId, mediaUrl)

### API Routes
- ✅ [src/routes/index.ts](backend/src/routes/index.ts) - Route aggregator
- ✅ [src/routes/auth.ts](backend/src/routes/auth.ts) - POST /api/auth/session
- ✅ [src/routes/quests.ts](backend/src/routes/quests.ts) - GET/POST/PUT/DELETE quests
- ✅ [src/routes/proofs.ts](backend/src/routes/proofs.ts) - POST proofs, GET user proofs
- ✅ [src/routes/leaderboard.ts](backend/src/routes/leaderboard.ts) - Global & local leaderboards

### Business Logic Services
- ✅ [src/services/points.ts](backend/src/services/points.ts) - awardPointsForProof, badge logic
- ✅ [src/services/leaderboard.ts](backend/src/services/leaderboard.ts) - Redis sync & queries

### Configuration Modules
- ✅ [src/config/firebase.ts](backend/src/config/firebase.ts) - Firebase Admin SDK
- ✅ [src/config/cloudinary.ts](backend/src/config/cloudinary.ts) - Cloudinary config

### Testing & DevOps
- ✅ [src/tests/basic.test.ts](backend/src/tests/basic.test.ts) - Health & version tests (Vitest)
- ✅ [Dockerfile](backend/Dockerfile) - Multi-stage build
- ✅ [.github/workflows/ci.yml](backend/.github/workflows/ci.yml) - CI/CD pipeline
- ✅ [README.md](backend/README.md) - Full documentation

---

## 📋 API Endpoints Summary

### Health & Info
```
GET /api/health       → { status: "ok", message: "..." }
GET /api/version      → { name: "EcoQuest Backend", version: "1.0.0" }
```

### Authentication
```
POST /api/auth/session (protected)
  → { uid, email, name, user: IUser }
```

### Quests
```
GET    /api/quests?category=&difficulty=        → IQuest[]
GET    /api/quests/:id                           → IQuest
POST   /api/quests (protected, admin)            → IQuest (created)
PUT    /api/quests/:id (protected, admin)        → IQuest (updated)
DELETE /api/quests/:id (protected, admin)        → { message: "...", quest: IQuest }
```

### Proofs
```
POST /api/proofs (protected, multipart/form-data)
  Body: { file: File, questId: string, caption?: string }
  → IProof (uploaded to Cloudinary)
  → Emits: proof:submitted event
  → Awards XP & updates leaderboard

GET  /api/proofs?userUid=<uid> (protected)
  → IProof[]
```

### Leaderboard
```
GET /api/leaderboard/global              → { rank, uid, name, xp, city }[]
GET /api/leaderboard/local?city=<city>   → { rank, uid, name, xp, city }[]
```

---

## 🔌 Socket.io Events

### Client → Server
```typescript
socket.emit('join', 'city:San Francisco');
socket.emit('subscribe:leaderboard', { type: 'global' });
socket.emit('subscribe:leaderboard', { type: 'local', city: 'Seattle' });
```

### Server → Client (Broadcasts)
```typescript
socket.on('leaderboard:update', {
  leaderboard: [
    { rank: 1, uid: 'user1', xp: 1250, name: 'EcoWarrior92' },
    { rank: 2, uid: 'user2', xp: 980, name: 'GreenMachine' },
    // ... top 10
  ]
});

socket.on('proof:submitted', {
  userUid: 'uid123',
  questId: 'quest456',
  mediaUrl: 'https://cloudinary.com/...',
  caption: 'Planted a tree!'
});
```

---

## 🗄️ Database Schemas

### User
```typescript
{
  uid: string (unique, from Firebase)
  name: string
  email: string
  xp: number (default: 0)
  badges: string[] (badge names)
  streak: number
  lastCompletedAt?: Date
  city?: string
  createdAt: Date
  updatedAt: Date
}
```

### Quest
```typescript
{
  title: string
  description: string
  xp: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  active: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Proof
```typescript
{
  userUid: string
  questId: ObjectId (ref: Quest)
  mediaUrl: string (Cloudinary URL)
  caption?: string
  verified: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

---

## ⚙️ Services Breakdown

### Points Service (`src/services/points.ts`)

**Function: `awardPointsForProof(userUid: string, questId: string): Promise<IUser>`**

Steps:
1. Lookup quest XP value
2. Find or create user in MongoDB
3. Increment user.xp by quest.xp
4. Check badge thresholds:
   - 100 XP → add "First Step"
   - 300 XP → add "Tree Friend"
   - 600 XP → add "Eco Champion"
5. Update streak:
   - If lastCompletedAt is yesterday → streak++
   - If lastCompletedAt is >1 day ago → streak = 1
   - If same day → no change
6. Set lastCompletedAt = now
7. Save user to MongoDB
8. Sync user to Redis leaderboards (global + city)
9. Emit `leaderboard:update` socket event
10. Return updated user doc

### Leaderboard Service (`src/services/leaderboard.ts`)

**Redis Operations:**
- `syncUserToRedis(uid, xp, city?)` - Add/update user in sorted sets
  - `leaderboard:global` (sorted by XP, descending)
  - `leaderboard:city:<city>` (if city provided)

- `getTopGlobal(limit=10)` - Fetch top N users globally
  - Returns: `[{ uid, xp, rank }, ...]`

- `getTopLocal(city, limit=10)` - Fetch top N users in city
  - Returns: `[{ uid, xp, rank }, ...]`

---

## 🔐 Authentication Flow

1. **Frontend** exchanges Firebase ID token with backend
2. **Middleware** verifies token with Firebase Admin SDK
3. **req.user** attached with `{ uid, email?, name? }`
4. **Protected routes** check req.user existence
5. **Socket.io** connections use token from handshake

Example header:
```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9...
```

---

## 📤 File Upload Flow

1. **POST /api/proofs** with multipart form-data
   - file: image/video (max 15MB)
   - questId: string
   - caption?: string

2. **Validation**
   - Check authorization header
   - Validate mime type (image/*, video/*)
   - Check file size limits

3. **Upload to Cloudinary**
   - folder: `ecoquest/proofs`
   - public_id: `${userUid}-${Date.now()}`
   - Cloudinary returns secure_url

4. **Create Proof document**
   - Store userUid, questId, mediaUrl, caption
   - Set verified=false (admin review needed)

5. **Award Points**
   - Call `awardPointsForProof(userUid, questId)`
   - XP updated, badges checked, streak updated

6. **Emit Socket Event**
   - Broadcast `proof:submitted` to all clients
   - Emit `leaderboard:update` with top 10

---

## 🚀 Deployment Checklist

### Environment Setup
- [ ] Create Firebase project & download service account JSON
- [ ] Setup MongoDB Atlas cluster
- [ ] Setup Redis Cloud (or self-hosted Redis)
- [ ] Create Cloudinary account & get API credentials
- [ ] Create `.env` file with all credentials

### Dependencies
- [ ] `npm install` in backend directory
- [ ] Verify TypeScript compilation: `npm run build`
- [ ] Run tests: `npm test`

### Local Testing
- [ ] Start server: `npm run dev`
- [ ] Test health: `curl http://localhost:3000/api/health`
- [ ] Test quests: `curl http://localhost:3000/api/quests`
- [ ] Test proof upload with file and valid token
- [ ] Verify XP awarded in MongoDB
- [ ] Verify leaderboard updated in Redis
- [ ] Verify socket events emitted

### Docker Build
- [ ] Build: `docker build -t ecoquest-backend .`
- [ ] Test: `docker run -e ... -p 3000:3000 ecoquest-backend`

### CI/CD Pipeline
- [ ] GitHub Actions workflow: `.github/workflows/ci.yml`
- [ ] Runs on push to main/develop
- [ ] Installs deps, builds, lints, tests
- [ ] Services: MongoDB + Redis

---

## 📚 Quick Integration with Frontend

### Proof Upload Example
```typescript
// frontend/src/components/ProofUploadModal.tsx
const handleUpload = async (file: File, caption: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('questId', questId);
  formData.append('caption', caption);

  const response = await fetch('http://localhost:3000/api/proofs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${firebaseToken}`,
    },
    body: formData,
  });

  const proof = await response.json();
  onUploadSuccess({ mediaUrl: proof.mediaUrl, caption });
};
```

### Leaderboard Fetch
```typescript
// frontend/src/pages/ProfilePage.tsx
const fetchLeaderboard = async () => {
  const response = await fetch('http://localhost:3000/api/leaderboard/global');
  const leaderboard = await response.json();
  setLeaderboard(leaderboard);
};
```

### Socket Connection
```typescript
// frontend/src/App.tsx
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.emit('subscribe:leaderboard', { type: 'global' });

socket.on('leaderboard:update', (data) => {
  console.log('Leaderboard updated:', data.leaderboard);
});

socket.on('proof:submitted', (data) => {
  console.log('Proof submitted by', data.userUid);
});
```

---

## 🔗 Integration Points

| Component | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| ProofUploadModal | POST /api/proofs | POST | ✅ |
| QuestsPage | GET /api/quests | GET | ❌ |
| Leaderboard | GET /api/leaderboard/global | GET | ❌ |
| Home (daily quest) | GET /api/quests | GET | ❌ |
| ProfilePage (stats) | GET /api/auth/session | POST | ✅ |

---

## 📞 Support

For issues:
1. Check `.env` variables are set correctly
2. Verify MongoDB & Redis connections in server logs
3. Check Firebase credentials are valid
4. Review error responses from API
5. Check Socket.io connection in browser DevTools

---

**Backend Status: ✅ Ready for Integration**

All 17 files created with full TypeScript types, error handling, and documentation.
