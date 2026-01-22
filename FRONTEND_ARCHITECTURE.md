# EcoQuest Frontend Architecture

## Component Hierarchy

```
App (Router)
├── Navigation Bar
│   └── Links: Home, Quests, Profile, Login
├── Routes
│   ├── "/" → Home
│   │   ├── Hero Section
│   │   ├── Features (3x Card)
│   │   └── CTA Section
│   │
│   ├── "/login" → Login
│   │   └── LoginForm
│   │       ├── Email Input
│   │       ├── Password Input
│   │       └── Submit Button
│   │
│   ├── "/quests" → Quests
│   │   ├── Filter Buttons
│   │   ├── Quest Grid
│   │   │   └── QuestCard (multiple)
│   │   │       ├── Title
│   │   │       ├── Description
│   │   │       ├── Difficulty Badge
│   │   │       ├── XP Badge
│   │   │       └── Submit Button
│   │   └── ProofUploadModal
│   │       ├── File Input
│   │       ├── Caption Input
│   │       ├── Progress Bar
│   │       ├── Submit Button
│   │       └── Cancel Button
│   │
│   └── "/profile" → Profile
│       ├── User Avatar
│       ├── User Info
│       ├── Statistics (4x Cards)
│       ├── Recent Activity List
│       └── Action Buttons
│
└── Footer
```

## Data Flow Diagram

```
User Interaction
    ↓
Component State (useState)
    ↓
Event Handlers
    ↓
useApi Hook
    ↓
Fetch Request
    ↓
Backend API
    ↓
Response Processing
    ↓
State Update
    ↓
Component Re-render
```

## File Structure Tree

```
frontend/
├── src/
│   ├── components/
│   │   ├── QuestCard.tsx          (Props: id, title, description, xp, difficulty, completed, onOpenUpload)
│   │   └── ProofUploadModal.tsx   (Props: isOpen, questId, questTitle, onClose, onSubmit)
│   │
│   ├── hooks/
│   │   └── useApi.ts             (Generic: <T>, Returns: data, loading, error, get(), post())
│   │
│   ├── pages/
│   │   ├── Home.tsx              (Landing page with features)
│   │   ├── Login.tsx             (Auth form)
│   │   ├── Quests.tsx            (Quest listing with modal)
│   │   └── Profile.tsx           (User profile)
│   │
│   ├── types/
│   │   └── index.ts              (Quest, Proof, User, ApiResponse<T>)
│   │
│   ├── __tests__/
│   │   └── QuestCard.test.tsx    (6+ test cases)
│   │
│   ├── App.tsx                    (Main router)
│   ├── main.tsx                   (Entry point)
│   ├── index.css                  (Global styles)
│   └── App.css                    (App styles)
│
├── index.html                     (Vite entry)
├── vite.config.ts                 (Vite configuration)
├── vitest.config.ts               (Test configuration)
├── tailwind.config.cjs            (Tailwind configuration)
├── postcss.config.cjs             (PostCSS configuration)
├── tsconfig.json                  (TypeScript configuration)
├── package.json                   (Dependencies & scripts)
├── .env.example                   (Environment variables)
├── FRONTEND.md                    (Detailed documentation)
└── .prettierrc                    (Inherited from root)
```

## Type System Architecture

```
ApiResponse<T>
├── status: 'ok' | 'error'
├── data?: T
└── message?: string

Quest
├── id: string
├── title: string
├── description: string
├── xp: number
├── difficulty: 'easy' | 'medium' | 'hard'
├── category: string
├── completed: boolean
├── createdAt: Date
└── updatedAt: Date

Proof
├── id: string
├── questId: string
├── fileUrl: string
├── caption: string
├── uploadedAt: Date
└── verified: boolean

User
├── id: string
├── username: string
├── email: string
├── totalXp: number
├── level: number
└── avatar?: string
```

## Styling Architecture

```
Base Styles (index.css)
    ↓
Tailwind Config
    ├── Theme
    │   ├── Colors (eco-palette)
    │   ├── Breakpoints (sm, md, lg, xl)
    │   └── Extend
    │
    └── Plugins
        ├── @tailwindcss/forms
        └── @tailwindcss/typography

Component Styles
    ├── Utility classes (Tailwind)
    ├── Responsive classes (mobile-first)
    ├── State classes (hover, focus, disabled)
    └── Custom CSS (App.css)
```

## API Integration Layer

```
useApi<T> Hook
    ├── State Management
    │   ├── data: T | null
    │   ├── loading: boolean
    │   └── error: Error | null
    │
    ├── Methods
    │   ├── get(url): Promise<T>
    │   │   ├── Sets loading = true
    │   │   ├── Fetch GET request
    │   │   ├── Parse JSON
    │   │   ├── Update state
    │   │   └── Returns data
    │   │
    │   └── post(url, body): Promise<T>
    │       ├── Sets loading = true
    │       ├── Fetch POST request
    │       ├── Send JSON body
    │       ├── Parse response
    │       ├── Update state
    │       └── Returns data
    │
    └── Error Handling
        ├── HTTP errors
        ├── Network errors
        └── Parse errors
```

## Component Props Flow

```
App
  └── Router
       ├── Home (no props)
       ├── Login (no props)
       ├── Quests
       │   └── QuestCard (multiple)
       │       └── onOpenUpload → setSelectedQuest
       │           └── ProofUploadModal
       │               ├── questId
       │               ├── questTitle
       │               ├── onClose
       │               └── onSubmit
       └── Profile (no props)
```

## State Management Pattern

```
Local Component State (useState)
    ├── Modal visibility
    ├── Form inputs
    ├── Selected items
    └── UI states

Custom Hook State (useApi)
    ├── API response data
    ├── Loading indicators
    └── Error handling

Mock Data
    └── Fallback for demo mode
```

## Responsive Breakpoints

```
Mobile (default)
    └── 320px - 640px

Tablet (md:)
    └── 640px - 1024px

Desktop (lg:)
    └── 1024px - 1280px

Large Desktop (xl:)
    └── 1280px+
```

## Testing Architecture

```
Vitest
    ├── Config: vitest.config.ts
    ├── Environment: jsdom
    ├── Setup: globals enabled
    │
    └── Tests
        ├── QuestCard.test.tsx
        │   ├── Rendering tests
        │   ├── Props validation
        │   ├── Event tests
        │   ├── State tests
        │   └── Styling tests
        │
        └── Future test files
            ├── Components tests
            ├── Hooks tests
            ├── Integration tests
            └── E2E tests
```

## Build Pipeline

```
TypeScript Source
    ├── tsc (Type checking)
    ├── ESLint (Linting)
    └── Prettier (Formatting)

Vite Build
    ├── React plugin
    ├── Tailwind preprocessing
    ├── Code splitting
    ├── Asset optimization
    ├── Minification (Terser)
    └── Gzip compression

Output
    └── dist/
        ├── index.html
        ├── assets/
        │   ├── main.[hash].js
        │   ├── main.[hash].css
        │   └── [other assets]
        └── .gz files
```

## Development Server

```
Vite Dev Server (port 5173)
    ├── Hot Module Replacement (HMR)
    ├── Instant feedback
    ├── Source maps
    │
    └── Proxies
        └── /api → http://localhost:3000
```

---

This architecture provides a scalable, type-safe, and well-organized structure for the EcoQuest frontend application.
