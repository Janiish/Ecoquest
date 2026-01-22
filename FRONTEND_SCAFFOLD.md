# Frontend Scaffold Summary

## ✅ What's Included

### Component Structure
- **QuestCard.tsx** - Reusable quest display component with difficulty badges and submission button
- **ProofUploadModal.tsx** - Modal for file upload with progress tracking and caption input
- **useApi.ts** - Custom TypeScript hook for GET/POST requests with error handling

### Page Components
- **Home.tsx** - Landing page with hero section and feature showcase
- **Login.tsx** - Authentication form (todo: backend integration)
- **Quests.tsx** - Quest listing grid with filters and mock data
- **Profile.tsx** - User profile with statistics and recent activity

### Type System
- **types/index.ts** - Shared TypeScript interfaces:
  - `Quest` - Quest data structure
  - `Proof` - Proof submission data
  - `User` - User profile data
  - `ApiResponse` - Generic API response wrapper

### Routing & Navigation
- React Router v6 with routes: `/`, `/login`, `/quests`, `/profile`
- Global navigation bar with responsive design
- 404 fallback page
- Footer with branding

### Testing
- **QuestCard.test.tsx** - Vitest unit tests covering:
  - Component rendering
  - Button interactions
  - Completed state
  - Difficulty colors
  - Callback functions
- Vitest configuration with jsdom environment
- Test utilities: @testing-library/react, @testing-library/user-event

### Styling & UI
- Tailwind CSS with custom eco-green color palette
- Mobile-first responsive design
- Form plugins (@tailwindcss/forms)
- Typography plugin (@tailwindcss/typography)
- PostCSS configuration for production builds

### Development Tools
- Vite config with React plugin
- Dev proxy to backend at http://localhost:3000/api
- Path aliases for cleaner imports (@/, @shared/)
- Source maps in development

## 📁 File Structure

```
frontend/
├── src/
│   ├── __tests__/
│   │   └── QuestCard.test.tsx
│   ├── components/
│   │   ├── QuestCard.tsx
│   │   └── ProofUploadModal.tsx
│   ├── hooks/
│   │   └── useApi.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Quests.tsx
│   │   └── Profile.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── FRONTEND.md                # Detailed frontend documentation
├── index.html                 # Vite entry point
├── package.json              # Dependencies & scripts
├── postcss.config.cjs        # PostCSS configuration
├── tailwind.config.cjs       # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite build config
└── vitest.config.ts          # Test configuration
```

## 🎨 Design Features

- **Custom Color Palette**: Eco-friendly green shades (eco-50 through eco-900)
- **Responsive Layout**: Mobile-first approach with md: and lg: breakpoints
- **Interactive Components**: Hover effects, transitions, and loading states
- **Accessibility**: Semantic HTML and ARIA attributes
- **Type Safety**: Full TypeScript coverage

## 🚀 Quick Start

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
# Frontend: http://localhost:5173
# Backend proxy: /api -> http://localhost:3000
```

### Run tests
```bash
npm run test           # Run all tests
npm run test:ui        # View test UI
```

### Build for production
```bash
npm run build
```

## 📋 Dependencies Added

**Production:**
- `react-router-dom` (^6.20.0) - Client-side routing

**Development:**
- `@testing-library/react` (^14.1.0) - Component testing
- `@testing-library/jest-dom` (^6.1.5) - DOM matchers
- `@testing-library/user-event` (^14.5.1) - User interaction simulation
- `vitest` (^1.0.0) - Test runner
- `@vitest/ui` (^1.0.0) - Test UI dashboard

## 🔗 API Integration Points

### Health Check
```typescript
const { data } = useApi<ApiResponse>();
await get('/api/health');
```

### Fetch Quests
```typescript
const { data: quests } = useApi<Quest[]>();
await get('/api/quests');
```

### Submit Proof
```typescript
const { post } = useApi<ApiResponse>();
await post('/api/proofs', {
  questId: 'quest-1',
  caption: 'Proof caption',
  file: File
});
```

## 📖 Component Examples

### Using QuestCard
```tsx
<QuestCard
  id="quest-1"
  title="Plant a Tree"
  description="Plant a tree in your community"
  xp={50}
  difficulty="easy"
  completed={false}
  onOpenUpload={handleOpenUpload}
/>
```

### Using ProofUploadModal
```tsx
<ProofUploadModal
  isOpen={isModalOpen}
  questId={selectedQuest.id}
  questTitle={selectedQuest.title}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleSubmitProof}
/>
```

### Using useApi Hook
```tsx
function MyComponent() {
  const { data, loading, error, get } = useApi<Quest[]>();

  useEffect(() => {
    get('/api/quests');
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.map(q => q.title)}</div>;
}
```

## 🧪 Testing Examples

```bash
# Run specific test file
npm run test -- QuestCard.test.tsx

# Run tests in watch mode
npm run test -- --watch

# View test coverage
npm run test -- --coverage
```

## 📝 Next Steps

1. **Backend Integration**: Connect to `/api` endpoints
2. **Authentication**: Implement login/JWT
3. **State Management**: Add Zustand or Redux
4. **Error Handling**: Add error boundaries
5. **Form Validation**: Add Zod or Yup
6. **Performance**: Add React.memo for expensive renders
7. **Analytics**: Integrate tracking
8. **PWA**: Add service worker support

See [FRONTEND.md](./FRONTEND.md) for detailed documentation.
