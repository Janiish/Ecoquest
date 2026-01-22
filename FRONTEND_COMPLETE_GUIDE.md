# Frontend Scaffold - Complete Setup & Usage Guide

## 🎯 Overview

The EcoQuest frontend scaffold is a production-ready React + TypeScript application with:
- **15 files** created with complete functionality
- **4 pages** with routing
- **2 reusable components** with proper typing
- **1 custom hook** for API calls
- **Unit tests** with Vitest
- **Mobile-first responsive design** with Tailwind CSS
- **Full TypeScript** with strict mode enabled

## 📋 Quick Navigation

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Components Guide](#components-guide)
- [Pages Explained](#pages-explained)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Styling](#styling)
- [Deployment](#deployment)

---

## Installation

### Prerequisites
```
Node.js v18+ 
npm v9+
```

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env.local
```

### Step 3: Start Development Server
```bash
npm run dev
```

Access the app at **http://localhost:5173**

---

## Project Structure

### Root Level Files
```
frontend/
├── index.html              # Vite entry point
├── package.json            # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite configuration
├── vitest.config.ts       # Test configuration
├── tailwind.config.cjs    # Tailwind setup
├── postcss.config.cjs     # CSS processing
├── .env.example           # Environment template
└── FRONTEND.md            # Detailed documentation
```

### Source Code
```
src/
├── App.tsx                # Router component
├── main.tsx              # Entry point
├── index.css             # Global styles
├── App.css               # App styles
│
├── pages/                # Page components
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Auth page
│   ├── Quests.tsx       # Quest listing
│   └── Profile.tsx      # User profile
│
├── components/           # Reusable components
│   ├── QuestCard.tsx    # Quest display
│   └── ProofUploadModal.tsx # Upload modal
│
├── hooks/               # Custom hooks
│   └── useApi.ts       # API wrapper
│
├── types/              # Type definitions
│   └── index.ts       # Shared interfaces
│
└── __tests__/         # Unit tests
    └── QuestCard.test.tsx
```

---

## Components Guide

### 1. QuestCard Component

**Purpose**: Display a single quest with interaction

**Location**: `src/components/QuestCard.tsx`

**Props**:
```typescript
interface QuestCardProps {
  id: string;                              // Unique quest ID
  title: string;                           // Quest title
  description: string;                     // Quest description
  xp: number;                             // XP reward
  difficulty?: 'easy' | 'medium' | 'hard'; // Difficulty level
  completed?: boolean;                    // Completion status
  onOpenUpload: (questId: string) => void; // Upload callback
}
```

**Usage Example**:
```tsx
import QuestCard from '@/components/QuestCard';

<QuestCard
  id="quest-1"
  title="Plant a Tree"
  description="Plant a tree in your community"
  xp={50}
  difficulty="easy"
  completed={false}
  onOpenUpload={handleUpload}
/>
```

**Features**:
- Color-coded difficulty badges
- Responsive layout
- Completed state indicator
- Submit proof button
- Hover effects

---

### 2. ProofUploadModal Component

**Purpose**: Modal for uploading quest completion proof

**Location**: `src/components/ProofUploadModal.tsx`

**Props**:
```typescript
interface ProofUploadModalProps {
  isOpen: boolean;                          // Modal visibility
  questId: string;                         // Associated quest
  questTitle: string;                      // Display quest name
  onClose: () => void;                     // Close handler
  onSubmit: (data: { file: File; caption: string }) => Promise<void>;
}
```

**Usage Example**:
```tsx
import ProofUploadModal from '@/components/ProofUploadModal';

const [isOpen, setIsOpen] = useState(false);

<ProofUploadModal
  isOpen={isOpen}
  questId="quest-1"
  questTitle="Plant a Tree"
  onClose={() => setIsOpen(false)}
  onSubmit={async (data) => {
    console.log(data.file, data.caption);
    // API call here
  }}
/>
```

**Features**:
- File input with validation
- Caption textarea
- Progress bar with percentage
- Upload simulation
- Error handling
- Close button

---

### 3. useApi Hook

**Purpose**: Generic fetch wrapper with error handling

**Location**: `src/hooks/useApi.ts`

**Type Generic**:
```typescript
const { data, loading, error, get, post } = useApi<YourType>();
```

**Usage Examples**:

**GET Request**:
```tsx
const { data: quests, loading } = useApi<Quest[]>();

useEffect(() => {
  get('/api/quests');
}, []);

if (loading) return <div>Loading...</div>;
return <div>{quests?.map(q => q.title)}</div>;
```

**POST Request**:
```tsx
const { post, loading } = useApi<ApiResponse>();

const handleSubmit = async () => {
  const result = await post('/api/proofs', {
    questId: 'quest-1',
    caption: 'Proof caption'
  });
};
```

**Returns**:
```typescript
{
  data: T | null;                    // Response data
  loading: boolean;                  // Loading state
  error: Error | null;              // Error object
  get: (url: string) => Promise<T>;  // GET method
  post: (url: string, body: unknown) => Promise<T>; // POST method
}
```

---

## Pages Explained

### Home Page (`src/pages/Home.tsx`)

**Route**: `/`

**Features**:
- Hero section with title and CTA
- Feature cards (3 items)
- Secondary call-to-action section
- Gradient background

**Navigation**:
```tsx
<Link to="/quests">Start Your Journey</Link>
<Link to="/login">Get Started</Link>
```

---

### Login Page (`src/pages/Login.tsx`)

**Route**: `/login`

**Form Fields**:
- Email input
- Password input
- Submit button
- Sign-up link

**State**:
- Email (string)
- Password (string)
- Loading indicator

**TODO**: Connect to backend authentication

---

### Quests Page (`src/pages/Quests.tsx`)

**Route**: `/quests`

**Features**:
- Filter buttons (All, Easy, Medium, Hard)
- Quest grid layout
- Mock quest data (4 quests)
- Integration with QuestCard
- Modal for proof upload

**Mock Data Included**:
```typescript
- Plant a Tree (Easy, 50 XP)
- Zero Waste Day (Medium, 100 XP)
- Carbon Neutral Week (Hard, 150 XP)
- Clean Local Beach (Medium, 75 XP)
```

**State Management**:
- Selected quest
- Modal visibility
- Quest list

---

### Profile Page (`src/pages/Profile.tsx`)

**Route**: `/profile`

**Sections**:
- User avatar and info
- Statistics grid (4 cards)
- Recent activity list
- Settings and sign-out buttons

**Statistics Displayed**:
- Total XP
- Level
- Quests Completed
- Impact Score

**Mock User**:
```typescript
{
  username: 'ecowarrior',
  email: 'user@example.com',
  totalXp: 325,
  level: 3,
  avatar: '🌿'
}
```

---

## API Integration

### Backend Proxy

Vite automatically proxies `/api` to `http://localhost:3000`:

```typescript
// This request:
fetch('/api/quests')

// Becomes:
fetch('http://localhost:3000/api/quests')
```

### API Endpoints to Implement

**Health Check**:
```typescript
GET /api/health
→ { status: 'ok', message: '...' }
```

**Fetch Quests**:
```typescript
GET /api/quests
→ { status: 'ok', data: Quest[] }
```

**Submit Proof**:
```typescript
POST /api/proofs
→ { status: 'ok', data: Proof }
```

### Integration Example

```tsx
import { useApi } from '@/hooks/useApi';
import type { Quest } from '@/types';

function QuestList() {
  const { data: quests, loading, error, get } = useApi<Quest[]>();

  useEffect(() => {
    get('/api/quests');
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {quests?.map(quest => (
        <QuestCard key={quest.id} {...quest} />
      ))}
    </div>
  );
}
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test -- --watch

# UI dashboard
npm run test:ui

# With coverage
npm run test -- --coverage
```

### Test File Location

`src/__tests__/QuestCard.test.tsx`

### Test Cases Included

1. **Rendering**: Component renders with props
2. **Props**: All props display correctly
3. **Completed State**: Shows correct button text
4. **Disabled State**: Button disabled when completed
5. **Callback**: onClick fires with correct ID
6. **Styling**: Difficulty colors apply
7. **Border**: Completed border shows

### Writing New Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByText('value')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Styling

### Tailwind CSS Setup

**Config**: `tailwind.config.cjs`

**Color Palette - Eco Green**:
```
eco-50:   #f0fdf4  (Lightest)
eco-100:  #dcfce7
eco-200:  #bbf7d0
eco-300:  #86efac
eco-400:  #4ade80
eco-500:  #22c55e  (Primary)
eco-600:  #16a34a
eco-700:  #15803d
eco-800:  #166534
eco-900:  #145231  (Darkest)
```

### Mobile-First Responsive

```tsx
// Base: Mobile
<div className="px-4 py-2 text-sm">

// Tablet (640px+)
className="md:px-6 md:py-4 md:text-base"

// Desktop (1024px+)
className="lg:px-8 lg:py-6 lg:text-lg"

// Large (1280px+)
className="xl:px-12"
```

### Useful Tailwind Classes

```tsx
// Layout
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Spacing
px-4 py-6 gap-4

// Colors
bg-eco-500 text-eco-900 border-eco-200

// Effects
rounded-lg shadow-md hover:shadow-lg transition-all

// States
hover: focus: active: disabled: opacity-50
```

### PostCSS Processing

Automatic vendor prefixes and optimizations via `postcss.config.cjs`

---

## Development Workflow

### 1. Create a New Component

```bash
touch src/components/MyComponent.tsx
```

```typescript
import React from 'react';

interface MyComponentProps {
  prop: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ prop }) => {
  return <div>{prop}</div>;
};

export default MyComponent;
```

### 2. Add Types

Edit `src/types/index.ts`:

```typescript
export interface MyType {
  id: string;
  name: string;
}
```

### 3. Use in Page

```tsx
import MyComponent from '@/components/MyComponent';
import type { MyType } from '@/types';

export default function MyPage() {
  const [items, setItems] = useState<MyType[]>([]);

  return (
    <div>
      {items.map(item => (
        <MyComponent key={item.id} prop={item.name} />
      ))}
    </div>
  );
}
```

### 4. Write Tests

Create `src/__tests__/MyComponent.test.tsx`

### 5. Deploy

```bash
npm run build
# Output in dist/
```

---

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 5173)

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run Vitest
npm run test:ui      # Vitest UI dashboard

# From root (workspace)
npm run format       # Format all code
npm run type-check   # TypeScript validation
```

---

## Environment Variables

Create `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=EcoQuest
VITE_ENV=development
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Common Tasks

### Add a New Route

1. Create page component in `src/pages/`
2. Import in `App.tsx`
3. Add Route:

```tsx
<Route path="/mypage" element={<MyPage />} />
```

4. Add navigation link:

```tsx
<Link to="/mypage">My Page</Link>
```

### Add a New Component

1. Create in `src/components/`
2. Export properly
3. Import where needed
4. Create tests in `src/__tests__/`

### Connect to Backend

1. Update `.env.local` with correct API URL
2. Use `useApi` hook:

```typescript
const { get, post } = useApi<DataType>();
await get('/api/endpoint');
```

### Style a Component

1. Use Tailwind classes
2. Mobile-first approach
3. Responsive breakpoints (md:, lg:)
4. Custom colors from eco palette

---

## Troubleshooting

### "Module not found" error

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Red squiggles in editor

```
Ctrl+Shift+P → TypeScript: Restart TS Server
```

### Tailwind classes not working

```bash
# Rebuild Tailwind
npm run dev
# Clear browser cache (Ctrl+Shift+Delete)
```

### Port 5173 already in use

Edit `vite.config.ts`:

```typescript
server: {
  port: 3001,
}
```

### Tests failing

```bash
npm run test -- --reporter=verbose
# Check console output
```

---

## Deployment Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] Backend API running
- [ ] Build successful (`npm run build`)
- [ ] No console errors
- [ ] Performance optimized
- [ ] Mobile responsive verified

---

## Next Steps

1. **Backend Connection**: Implement real API calls
2. **Authentication**: Add login/JWT
3. **State Management**: Add Zustand/Redux if needed
4. **More Pages**: Add search, leaderboard, etc.
5. **Form Validation**: Add Zod or Yup
6. **Error Boundaries**: Add React error handling
7. **Analytics**: Add tracking
8. **PWA**: Add service worker

---

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [React Router Docs](https://reactrouter.com)
- [Vitest Docs](https://vitest.dev)

---

**Happy coding! 🌿**
