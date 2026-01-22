# 🌿 EcoQuest

An eco-friendly gaming platform built with modern web technologies. EcoQuest combines Node.js, TypeScript, React, and Express to create an engaging platform for sustainable gaming experiences.

## Project Structure

```
EcoQuest/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Express + TypeScript
├── shared/            # Shared types and utilities
├── package.json       # Root workspace configuration
├── tsconfig.json      # Root TypeScript configuration
├── .eslintrc.json     # ESLint configuration
├── .prettierrc         # Prettier configuration
└── .gitignore         # Git ignore rules
```

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)

## Quick Start

### 1. Installation

```bash
# Clone and navigate to the project
cd EcoQuest

# Install dependencies for all workspaces
npm install
```

### 2. Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3000 (Express server)

### 3. Build

Build all packages:

```bash
npm run build
```

### 4. Production

Start the backend in production mode:

```bash
npm run start
```

## Available Scripts

### Root Level Commands

```bash
# Development - runs both frontend and backend
npm run dev

# Build all packages
npm run build

# Start backend server
npm run start

# Lint all TypeScript files
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check

# Type checking
npm run type-check
```

### Frontend Commands

```bash
# Navigate to frontend directory
cd frontend

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint frontend files
npm run lint
```

### Backend Commands

```bash
# Navigate to backend directory
cd backend

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint backend files
npm run lint
```

### Shared Package Commands

```bash
# Navigate to shared directory
cd shared

# Build shared package
npm run build
```

## Dependencies

### Root Dependencies

**Development Dependencies:**
- `typescript` (^5.3.3) - TypeScript compiler
- `eslint` (^8.54.0) - Code linting
- `@typescript-eslint/eslint-plugin` (^6.13.0) - TypeScript ESLint support
- `@typescript-eslint/parser` (^6.13.0) - TypeScript parser for ESLint
- `prettier` (^3.1.0) - Code formatter
- `concurrently` (^8.2.2) - Run multiple commands simultaneously
- `@types/node` (^20.10.0) - Node.js types

### Frontend Dependencies

**Production:**
- `react` (^18.2.0) - React library
- `react-dom` (^18.2.0) - React DOM rendering
- `@ecoquest/shared` - Shared types and utilities

**Development:**
- `vite` (^5.0.8) - Build tool and dev server
- `@vitejs/plugin-react` (^4.2.0) - React plugin for Vite
- `typescript` (^5.3.3)
- `@types/react` (^18.2.37)
- `@types/react-dom` (^18.2.15)
- `tailwindcss` (^3.3.6) - Utility-first CSS framework
- `postcss` (^8.4.31) - CSS post-processor
- `autoprefixer` (^10.4.16) - PostCSS plugin for vendor prefixes
- `@tailwindcss/forms` (^0.5.7) - Tailwind form plugin
- `@tailwindcss/typography` (^0.5.10) - Tailwind typography plugin
- `vite-plugin-compression` (^0.5.1) - Compression plugin for Vite

### Backend Dependencies

**Production:**
- `express` (^4.18.2) - Web framework
- `cors` (^2.8.5) - CORS middleware
- `dotenv` (^16.3.1) - Environment variables
- `@ecoquest/shared` - Shared types and utilities

**Development:**
- `typescript` (^5.3.3)
- `ts-node` (^10.9.2) - Execute TypeScript files directly
- `@types/express` (^4.17.21)
- `@types/node` (^20.10.0)
- `@types/cors` (^2.8.17)

### Shared Package Dependencies

**Development:**
- `typescript` (^5.3.3)

## Configuration Files

### TypeScript (`tsconfig.json`)

- Target: ES2022
- Module: ESNext
- Strict mode enabled
- Path aliases for easy imports
- Project references for monorepo structure

### ESLint (`.eslintrc.json`)

- TypeScript support via @typescript-eslint
- Recommended rules enabled
- Custom rules for code quality
- Ignore patterns for build artifacts

### Prettier (`.prettierrc`)

- Single quotes
- 2-space indentation
- Tab width: 2
- Print width: 100
- Trailing commas for multiline
- LF line endings

### Vite (`frontend/vite.config.ts`)

- React plugin enabled
- Gzip compression
- Development proxy to backend
- Path aliases for clean imports
- Terser minification

### Tailwind CSS (`frontend/tailwind.config.cjs`)

- Custom color palette (eco-green)
- Form and typography plugins
- Extended theme configuration

## Environment Variables

### Backend (`.env`)

```
PORT=3000
NODE_ENV=development
```

Copy `.env.example` to `.env` to get started:

```bash
cp backend/.env.example backend/.env
```

## IDE Setup

### VS Code Extensions

Recommended extensions for development:

- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)
- **TypeScript Vue Plugin** (Vue.volar)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.enablePromptUseWorkspaceTypeScriptSdk": true
}
```

## API Endpoints

### Health Check

```bash
GET http://localhost:3000/api/health
```

Response:
```json
{
  "status": "ok",
  "message": "EcoQuest Backend is running!"
}
```

### Version

```bash
GET http://localhost:3000/api/version
```

Response:
```json
{
  "version": "1.0.0",
  "name": "EcoQuest Backend"
}
```

## Development Workflow

1. **Code Changes**: Make changes in frontend/src or backend/src
2. **Linting**: Run `npm run lint:fix` to auto-fix issues
3. **Formatting**: Run `npm run format` to format code
4. **Testing**: Run your tests (add test setup as needed)
5. **Building**: Run `npm run build` before deployment
6. **Type Checking**: Run `npm run type-check` to verify types

## Monorepo Structure

This project uses npm workspaces for monorepo management:

- **Frontend** (`frontend/package.json`): React application
- **Backend** (`backend/package.json`): Express server
- **Shared** (`shared/package.json`): Shared utilities and types

### Adding Dependencies

**To root:**
```bash
npm install <package> -w
```

**To specific workspace:**
```bash
npm install <package> -w frontend
npm install <package> -w backend
npm install <package> -w shared
```

**Dev dependency:**
```bash
npm install <package> -w frontend -D
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is in use:

```bash
# Frontend (change port in vite.config.ts)
# Backend (set PORT=3001 in .env)
```

### Module Not Found

Ensure all dependencies are installed:

```bash
npm install
```

Clear cache and reinstall:

```bash
rm -rf node_modules
npm install
```

### TypeScript Errors

Run type checking:

```bash
npm run type-check
```

Update TypeScript:

```bash
npm install -D typescript@latest
```

## Next Steps

1. **Add Routes**: Create API routes in `backend/src/routes`
2. **Add Pages**: Create React pages in `frontend/src/pages`
3. **Add Styles**: Customize Tailwind CSS in `frontend/tailwind.config.cjs`
4. **Add Database**: Integrate a database (MongoDB, PostgreSQL, etc.)
5. **Add Tests**: Set up Jest or Vitest for testing
6. **Add Authentication**: Implement user authentication

## Deployment

### Local Development with Podman or Docker

Run the entire stack locally using Podman or Docker Compose:

```bash
# Install Podman (recommended) or Docker:
# Podman: https://podman.io/getting-started/installation
# Docker: https://www.docker.com/products/docker-desktop

# Copy environment template
cp .env.example .env

# Edit .env with your credentials (Firebase, MongoDB, Redis, Cloudinary)

# Run deployment script (Linux/macOS)
chmod +x scripts/local-deploy.sh
./scripts/local-deploy.sh

# Or on Windows (PowerShell)
.\scripts\local-deploy.ps1

# Or manually with compose
podman-compose up --build -d
# or
docker-compose up --build -d

# View logs
podman-compose logs -f
# or
docker-compose logs -f

# Stop services
podman-compose down
# or
docker-compose down
```

**Note**: The deployment scripts automatically detect whether you have Podman or Docker installed and use the appropriate commands.

Services will be available at:
- **Frontend**: http://localhost
- **Backend**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017
- **Redis**: redis://localhost:6379

### GitHub Actions CI/CD Setup

The project includes automated CI/CD pipelines. Set up these GitHub Secrets:

#### Required Secrets

**Container Registry (GitHub Container Registry)**:
- `GITHUB_TOKEN` - Auto-provided by GitHub Actions

**Vercel (Frontend Deployment)**:
- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - Run `vercel link` locally to get ID
- `VERCEL_PROJECT_ID` - Run `vercel link` locally to get ID

**Render (Backend Deployment)**:
- `RENDER_API_KEY` - Get from https://dashboard.render.com/u/settings#api-keys
- `RENDER_SERVICE_ID` - Your service ID from Render dashboard

**Alternative: Railway (Backend)**:
- `RAILWAY_TOKEN` - Get from https://railway.app/account/tokens
- `RAILWAY_PROJECT_ID` - Your project ID from Railway

**Application Secrets**:
- `MONGO_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection URL
- `CLOUDINARY_URL` - Cloudinary API URL
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- `FIREBASE_PRIVATE_KEY` - Firebase service account private key
- `VITE_API_BASE_URL` - Backend URL (e.g., https://ecoquest-api.onrender.com)
- `VITE_FIREBASE_API_KEY` - Firebase web API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `BACKEND_URL` - Backend URL for health checks
- `FRONTEND_URL` - Frontend URL for health checks

#### CI/CD Workflow

The CI pipeline automatically:
1. **On Pull Request**: Runs tests, linting, type-checking, and builds
2. **On Push to Main**:
   - Builds and pushes Docker images to GitHub Container Registry
   - Deploys frontend to Vercel
   - Deploys backend to Render/Railway
   - Runs health checks

#### Manual Deployment

Trigger a deployment manually:
```bash
# Via GitHub CLI
gh workflow run ci.yml

# Or push to main branch
git push origin main
```

#### Rollback

To rollback to a previous version:

```bash
# Find previous image tag
docker pull ghcr.io/<your-username>/ecoquest-backend:main-<commit-sha>

# Update Render service to use previous image
curl -X POST "https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "ghcr.io/<your-username>/ecoquest-backend:main-<old-commit-sha>"}'

# Or via Render dashboard: Services → Deploy → Select previous deploy
```

### Production Deployment Guides

#### Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Link project (first time only)
cd frontend
vercel link

# Deploy to production
vercel --prod
```

Configuration is in [`deploy/vercel.json`](deploy/vercel.json).

#### Render (Backend)

1. Create new Web Service in Render dashboard
2. Connect GitHub repository
3. Use Docker deployment
4. Set Dockerfile path: `backend/Dockerfile`
5. Add environment variables from `.env.example`
6. Deploy

Configuration example in [`deploy/render-service.yaml`](deploy/render-service.yaml).

#### Docker Registry (GitHub Container Registry)

Images are automatically pushed to:
- Frontend: `ghcr.io/<your-username>/ecoquest-frontend:latest`
- Backend: `ghcr.io/<your-username>/ecoquest-backend:latest`

Pull manually:
```bash
docker pull ghcr.io/<your-username>/ecoquest-frontend:latest
docker pull ghcr.io/<your-username>/ecoquest-backend:latest
```

### Deployment Verification Checklist

✅ **Local Deployment**:
- [ ] Run `./scripts/local-deploy.sh` (or `.ps1` on Windows)
- [ ] `docker-compose ps` shows all services healthy
- [ ] `curl http://localhost:3000/api/health` returns `{"status":"ok"}`
- [ ] `curl http://localhost/` returns frontend HTML

✅ **CI Pipeline**:
- [ ] Push branch → GitHub Actions runs successfully
- [ ] `build-and-test` job passes (lint, type-check, tests, builds)
- [ ] `docker-build-and-push` job builds and pushes images

✅ **Production Deployment**:
- [ ] Frontend deployed to Vercel: `curl https://<your-app>.vercel.app/` returns 200
- [ ] Backend deployed to Render: `curl https://<your-service>.onrender.com/api/health` returns `{"status":"ok"}`
- [ ] Docker images present in registry (check https://github.com/<username>?tab=packages)
- [ ] Environment variables configured in deployment platforms
- [ ] Database connections working (check logs)

## License

ISC

---

Built with ❤️ for the EcoQuest project
