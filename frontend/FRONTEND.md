# Frontend Scaffold Documentation

## Overview

The EcoQuest frontend is a React + TypeScript application built with Vite, featuring a responsive design with Tailwind CSS. This document covers the project structure, key components, and usage patterns.

## Project Structure

```
frontend/src/
├── __tests__/              # Unit tests
│   └── QuestCard.test.tsx
├── components/             # Reusable React components
│   ├── QuestCard.tsx       # Quest display card
│   └── ProofUploadModal.tsx # File upload modal
├── hooks/                  # Custom React hooks
│   └── useApi.ts          # API fetch wrapper
├── pages/                  # Page components
│   ├── Home.tsx           # Landing page
│   ├── Login.tsx          # Authentication page
│   ├── Quests.tsx         # Quests listing
│   └── Profile.tsx        # User profile
├── types/                  # TypeScript type definitions
│   └── index.ts           # Shared types
├── App.tsx                # Main router component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Key Components

### QuestCard Component

A reusable card component for displaying quest information.

```typescript
<QuestCard
  id="quest-1"
  title="Plant a Tree"
  description="Plant a tree in your community"
  xp={50}
  difficulty="easy"
  completed={false}
  onOpenUpload={(questId) => handleUpload(questId)}
/>
```

**Props:**
- `id` (string) - Unique quest identifier
- `title` (string) - Quest title
- `description` (string) - Quest description
- `xp` (number) - XP reward
- `difficulty` (optional) - 'easy', 'medium', or 'hard'
- `completed` (optional) - Whether quest is completed
- `onOpenUpload` (function) - Callback for proof submission

### ProofUploadModal Component

Modal for uploading quest completion proof.

```typescript
<ProofUploadModal
  isOpen={true}
  questId="quest-1"
  questTitle="Plant a Tree"
  onClose={() => setIsOpen(false)}
  onSubmit={async (data) => {
    // Handle file upload
    console.log(data.file, data.caption);
  }}
/>
```

**Props:**
- `isOpen` (boolean) - Controls modal visibility
- `questId` (string) - Associated quest ID
- `questTitle` (string) - Display quest title
- `onClose` (function) - Close handler
- `onSubmit` (function) - Submit handler with file and caption

### useApi Hook

Custom hook for API calls with built-in loading and error states.

```typescript
const { data, loading, error, get, post } = useApi<QuestType>();

// GET request
const quests = await get('/api/quests');

// POST request
const result = await post('/api/proofs', { 
  questId: '1', 
  caption: 'Completed!' 
});
```

**Returns:**
- `data` (T | null) - Response data
- `loading` (boolean) - Loading state
- `error` (Error | null) - Error object
- `get(url)` - Async GET method
- `post(url, body)` - Async POST method

## Pages

### Home.tsx

Landing page with hero section and features overview. No authentication required.

### Login.tsx

Login form with email and password fields. TODO: Integrate with backend authentication.

### Quests.tsx

Main quest listing page with:
- Quest grid display
- Filter buttons
- Upload modal integration
- Mock quest data

### Profile.tsx

User profile page showing:
- User information
- Statistics (XP, Level, Impact Score)
- Recent activity
- Account management

## Type Definitions

Located in `types/index.ts`:

```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Proof {
  id: string;
  questId: string;
  fileUrl: string;
  caption: string;
  uploadedAt: Date;
  verified: boolean;
}

interface User {
  id: string;
  username: string;
  email: string;
  totalXp: number;
  level: number;
  avatar?: string;
}
```

## Styling

### Tailwind CSS Configuration

Custom eco-friendly color palette:

```javascript
colors: {
  eco: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Primary brand color
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
  }
}
```

### Mobile-First Responsive Design

All components use mobile-first breakpoints:

```typescript
// Mobile by default
<div className="px-4 py-2 text-sm">

// Tablet and up
className="md:px-6 md:py-4 md:text-base"

// Desktop and up
className="lg:grid-cols-3 lg:px-8"
```

## Testing

### Running Tests

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# View test UI
npm run test:ui
```

### Test Example (QuestCard)

```typescript
describe('QuestCard', () => {
  it('renders quest information correctly', () => {
    render(<QuestCard {...props} />);
    expect(screen.getByText('Plant a Tree')).toBeInTheDocument();
  });

  it('calls onOpenUpload when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuestCard {...props} />);
    await user.click(screen.getByRole('button'));
    expect(mockOnOpenUpload).toHaveBeenCalled();
  });
});
```

## Routing

The app uses React Router v6 with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page |
| `/login` | Login | Authentication |
| `/quests` | Quests | Quest listing |
| `/profile` | Profile | User profile |
| `*` | 404 | Fallback page |

## Development Workflow

1. **Create a new component:**
   ```bash
   touch src/components/MyComponent.tsx
   ```

2. **Add TypeScript types:**
   ```typescript
   // src/types/index.ts
   export interface MyType {
     // ...
   }
   ```

3. **Use custom hooks:**
   ```typescript
   import { useApi } from '../hooks/useApi';
   const { data, loading } = useApi<MyType>();
   ```

4. **Style with Tailwind:**
   ```jsx
   <div className="rounded-lg bg-eco-50 p-4">
     {/* Mobile-first responsive layout */}
   </div>
   ```

5. **Write tests:**
   ```bash
   touch src/__tests__/MyComponent.test.tsx
   npm run test
   ```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

## Environment Variables

Create a `.env.local` file in the frontend root:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=EcoQuest
```

## Best Practices

1. **Component Organization**: Group related components in folders
2. **Type Safety**: Always use TypeScript types for props
3. **Mobile First**: Design mobile experience first, then enhance
4. **Accessibility**: Use semantic HTML and ARIA attributes
5. **Testing**: Aim for high component test coverage
6. **Performance**: Use React.memo for expensive components
7. **Code Splitting**: Use lazy loading for routes

## Common Issues

### Red squiggly lines in imports

Run TypeScript reload:
```bash
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Tailwind classes not applying

Clear cache and rebuild:
```bash
rm -rf node_modules .next dist
npm install
npm run dev
```

### Port 5173 already in use

Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001,
}
```

## Next Steps

- [ ] Integrate with backend API endpoints
- [ ] Add authentication (JWT/OAuth)
- [ ] Implement form validation with Zod or Yup
- [ ] Add error boundary components
- [ ] Set up analytics tracking
- [ ] Add PWA support
- [ ] Implement state management (Zustand/Redux)
- [ ] Add animations (Framer Motion)
