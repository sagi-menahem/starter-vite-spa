# AI Development Guidelines for starter-vite-spa

This document provides coding standards and patterns for AI-assisted development with this Vite SPA template.

---

## 1. Architecture Overview

### Tech Stack
- **Build Tool**: Vite 6 (ESBuild + Rollup)
- **Framework**: React 19 + TypeScript
- **Routing**: React Router 7 (Client-side SPA)
- **State Management**: Zustand 5 (with persist & immer middleware)
- **UI**: shadcn/ui + Tailwind CSS 4 + Framer Motion
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios with interceptors
- **SEO**: react-helmet-async

### Application Structure
```
src/
├── config/          # Site configuration (UI_LABELS, DEFAULTS, env)
├── routes/          # React Router configuration
│   └── guards/      # Route protection components
├── pages/           # Page components (routed)
│   └── dashboard/   # Dashboard pages
├── layouts/         # Layout wrappers
├── components/      # Reusable components
│   ├── ui/          # shadcn/ui primitives
│   ├── shared/      # Cross-feature components
│   ├── navigation/  # Nav components
│   ├── forms/       # Form components
│   ├── dashboard/   # Dashboard-specific components
│   └── error/       # Error handling components
├── stores/          # Zustand stores
├── lib/             # Utilities and helpers
│   └── api/         # API client and services
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── styles/          # Global styles
```

### Rendering Model
This is a **Single Page Application (SPA)** - all rendering happens on the client:

| Component Type | Use Case |
|----------------|----------|
| **React Components** | All UI (default) |
| **Lazy Loading** | Route-based code splitting |
| **Zustand Stores** | Global state management |
| **React Router** | Client-side navigation |

---

## 2. Content Separation Rules

### CRITICAL: No Hardcoded Strings

All UI text MUST come from one of these sources:

1. **`src/config/site.ts`** - UI Labels (buttons, form labels, validation messages)
2. **API Response** - Dynamic content from backend
3. **`DEFAULTS`** - Fallbacks when API content is empty

```typescript
// ❌ BAD - Hardcoded string
<button>Submit</button>

// ✅ GOOD - From config
import { UI_LABELS } from '@/config/site';
<button>{UI_LABELS.form.submitButton}</button>

// ✅ GOOD - From API with fallback
<h1>{apiData?.heroHeadline || DEFAULTS.heroHeadline}</h1>
```

### Config Structure
```typescript
// src/config/site.ts
export const SITE_CONFIG = {
  direction: 'ltr',    // 'ltr' | 'rtl'
  language: 'en',
  locale: 'en-US',
};

export const UI_LABELS = {
  form: { ... },       // Form labels, placeholders
  validation: { ... }, // Error messages
  auth: { ... },       // Auth-related text
  nav: { ... },        // Navigation labels
  dashboard: { ... },  // Dashboard labels
  errors: { ... },     // Error page content
  // ... organized by feature
};

export const DEFAULTS = {
  siteTitle: '...',
  siteDescription: '...',
  // Fallbacks for API content
};
```

---

## 3. Component Standards

### File Structure
```
src/components/
├── ui/          # shadcn/ui base components (avoid editing)
├── shared/      # Reusable components:
│   ├── ThemeToggle.tsx      # Light/Dark/System theme switcher
│   ├── AccessibilityWidget.tsx  # Floating a11y menu
│   ├── ToastContainer.tsx   # Toast notifications renderer
│   ├── SEO.tsx              # react-helmet-async wrapper
│   └── GlobalLoadingBar.tsx # Top loading indicator
├── navigation/  # Navigation components:
│   ├── Navbar.tsx           # Public page header
│   └── Footer.tsx           # Site-wide footer
├── forms/       # LoginForm, RegisterForm, ContactForm
├── dashboard/   # Dashboard-specific components
└── error/       # ErrorBoundary, ErrorFallback
```

### Component Template
```tsx
/**
 * ComponentName
 * Brief description of what this component does
 */

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import { UI_LABELS, DEFAULTS, SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  /** Description of prop */
  title?: string;
  /** Optional className override */
  className?: string;
}

export function ComponentName({
  title = DEFAULTS.siteTitle,
  className,
}: ComponentNameProps) {
  const isRTL = SITE_CONFIG.direction === 'rtl';

  return (
    <section
      id="section-id"
      className={cn('py-20 md:py-28', className)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={staggerItem}>
            {title}
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}

export default ComponentName;
```

---

## 4. State Management (Zustand)

### Store Organization
```
src/stores/
├── index.ts           # Re-exports all stores
├── auth.store.ts      # Authentication state
├── ui.store.ts        # UI state (theme, sidebar, modals)
└── user.store.ts      # User preferences
```

### Store Pattern
```typescript
// src/stores/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(email, password);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => set({ user }),
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
```

### Usage in Components
```typescript
// Reading state
const { user, isAuthenticated } = useAuthStore();

// Calling actions
const { login, logout } = useAuthStore();

// Selecting specific state (optimized)
const user = useAuthStore((state) => state.user);
```

---

## 5. Routing (React Router 7)

### Route Configuration
```typescript
// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public routes
      { index: true, element: <Home /> },

      // Guest-only routes (redirect if authenticated)
      {
        path: 'login',
        element: <GuestGuard><Login /></GuestGuard>,
      },

      // Protected routes
      {
        path: 'dashboard',
        element: <AuthGuard><DashboardLayout /></AuthGuard>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'settings', element: <Settings /> },
        ],
      },

      // Catch-all 404
      { path: '*', element: <NotFound /> },
    ],
  },
]);
```

### Route Guards
```typescript
// src/routes/guards/AuthGuard.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

### Navigation
```typescript
// Using Link component
import { Link } from 'react-router-dom';
<Link to="/dashboard">Dashboard</Link>

// Programmatic navigation
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard');
```

---

## 6. API Layer (Axios)

### Client Configuration
```typescript
// src/lib/api/client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { ENV } from '@/config/env';

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Service Pattern
```typescript
// src/lib/api/services/user.service.ts
import { api } from '../client';
import type { User, UpdateProfileDTO } from '@/types';

export const userService = {
  getProfile: () =>
    api.get<User>('/user/profile'),

  updateProfile: (data: UpdateProfileDTO) =>
    api.patch<User>('/user/profile', data),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
```

---

## 7. Styling Guidelines

### Tailwind CSS 4 + Logical Properties

**Always use logical properties for RTL support:**

```tsx
// ❌ BAD - Physical properties
<div className="ml-4 pr-2 text-left">

// ✅ GOOD - Logical properties
<div className="ms-4 pe-2 text-start">
```

| Physical | Logical | Description |
|----------|---------|-------------|
| `ml-*` | `ms-*` | Margin start |
| `mr-*` | `me-*` | Margin end |
| `pl-*` | `ps-*` | Padding start |
| `pr-*` | `pe-*` | Padding end |
| `left-*` | `start-*` | Position start |
| `right-*` | `end-*` | Position end |
| `text-left` | `text-start` | Text alignment |
| `text-right` | `text-end` | Text alignment |

### Theme Tokens
Use CSS variables from `globals.css`:
```css
/* Available tokens */
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring
--card, --card-foreground
--popover, --popover-foreground
```

---

## 8. Animation System

### Centralized Animations
All animations are defined in `src/lib/animations.ts`:

```typescript
import {
  // Timing
  EASING,        // { smooth, snappy, premium, easeOut, easeIn }
  DURATION,      // { instant, fast, medium, normal, slow, dramatic }
  SPRING,        // { snappy, bouncy, gentle, smooth }

  // Variants
  fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight,
  scaleUp,
  staggerContainer, staggerItem,
  hoverScale, hoverLift,

  // Viewport options
  viewportOnce,   // { once: true, amount: 0.2 }
  viewportAlways,
  viewportHalf,
} from '@/lib/animations';
```

### Usage Pattern
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
>
  <motion.h2 variants={staggerItem}>Title</motion.h2>
  <motion.p variants={staggerItem}>Description</motion.p>
</motion.div>
```

---

## 9. SEO with react-helmet-async

### SEO Component
```typescript
// src/components/shared/SEO.tsx
import { Helmet } from 'react-helmet-async';
import { DEFAULTS, SITE_CONFIG } from '@/config/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description = DEFAULTS.siteDescription,
  image,
  noindex = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${DEFAULTS.siteTitle}`
    : DEFAULTS.siteTitle;

  return (
    <Helmet>
      <html lang={SITE_CONFIG.language} dir={SITE_CONFIG.direction} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
```

### Usage in Pages
```tsx
// src/pages/Home.tsx
import { SEO } from '@/components/shared/SEO';

export default function Home() {
  return (
    <>
      <SEO title="Home" description="Welcome to our app" />
      {/* Page content */}
    </>
  );
}
```

---

## 10. Toast Notifications

### Toast System
Toasts are managed via `useUIStore` and rendered by `ToastContainer` in `RootLayout`:

```typescript
// Adding a toast
const { addToast } = useUIStore();

addToast({
  type: 'success', // 'success' | 'error' | 'warning' | 'info'
  message: UI_LABELS.settings.profileUpdated,
  duration: 5000, // Optional, defaults to 5000ms
});
```

### Toast Types
| Type | Use Case |
|------|----------|
| `success` | Action completed successfully |
| `error` | Error occurred |
| `warning` | Caution or potential issue |
| `info` | General information |

---

## 11. Global Loading State

### GlobalLoadingBar
Displays a loading indicator at the top of the viewport:

```typescript
const { setGlobalLoading } = useUIStore();

// Show loading bar during API calls
setGlobalLoading(true);
try {
  await api.post('/data');
} finally {
  setGlobalLoading(false);
}
```

The `GlobalLoadingBar` component in `RootLayout` automatically reflects this state.

---

## 12. PWA Support

### Manifest File
The app includes `public/manifest.json` for PWA support:
- App name and description
- Theme color matching your primary color
- Icons for home screen installation

### Adding PWA Icons
Place icons in `public/icons/`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

---

## 13. Error Handling

### Error Boundary
```typescript
// src/components/error/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

---

## 14. Accessibility Requirements

### Semantic HTML
```tsx
// ✅ Use semantic elements
<header>...</header>
<nav>...</nav>
<main>...</main>
<section id="features">...</section>
<article>...</article>
<footer>...</footer>
```

### ARIA Attributes
```tsx
// Interactive elements
<button
  aria-expanded={isOpen}
  aria-controls="panel-id"
  aria-label={UI_LABELS.nav.toggleMenu}
>

// Form fields
<input
  aria-invalid={!!error}
  aria-describedby={error ? 'error-id' : undefined}
/>
```

### Accessibility CSS Classes
Available in `globals.css`:
```css
.a11y-grayscale   /* 100% grayscale filter */
.a11y-contrast    /* 150% contrast */
.a11y-large-text  /* 120% font size */
.a11y-links       /* Underline all links */
.a11y-reduce-motion /* Disable animations */
```

---

## 15. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.tsx`, `ContactForm.tsx` |
| Hooks | camelCase with `use` prefix | `useScrollSpy.ts` |
| Utilities | camelCase | `utils.ts`, `animations.ts` |
| Config | camelCase | `site.ts`, `env.ts` |
| Pages | PascalCase | `Home.tsx`, `Dashboard.tsx` |
| Stores | camelCase with `.store` suffix | `auth.store.ts` |
| Services | camelCase with `.service` suffix | `user.service.ts` |
| Types | camelCase with `.types` suffix | `auth.types.ts` |

---

## 16. Common Tasks

### Add a New Page
1. Create component in `src/pages/PageName.tsx`
2. Add route in `src/routes/index.tsx`
3. Add SEO component with title/description
4. If protected, wrap with `AuthGuard`

### Add a New Store
1. Create `src/stores/name.store.ts`
2. Define interface for state and actions
3. Use persist middleware if state should survive refresh
4. Export from `src/stores/index.ts`

### Add a New API Service
1. Create `src/lib/api/services/name.service.ts`
2. Define methods using the `api` client
3. Add TypeScript types for request/response

### Add a Navigation Link
1. Update `Navbar.tsx` with new `<Link>`
2. Use logical route paths (`/dashboard`, not external)

### Change Theme Colors
1. Edit CSS variables in `src/styles/globals.css`
2. Update both `:root` (light) and `.dark` themes
3. Use OKLCH color format for consistency

---

## 17. Environment Variables

```env
# App
VITE_APP_NAME="Vite SPA Starter"
VITE_APP_URL=http://localhost:3000

# API
VITE_API_BASE_URL=http://localhost:8000/api

# Optional
# VITE_GA_TRACKING_ID=
```

All `VITE_` prefixed variables are exposed to the client.

---

## Summary

1. **No hardcoded strings** - Use `UI_LABELS` or API data with `DEFAULTS` fallback
2. **Logical CSS properties** - Use `ms-`, `me-`, `ps-`, `pe-` for RTL support
3. **Centralized animations** - Import from `@/lib/animations`
4. **Zustand for state** - Organize by domain (auth, ui, user)
5. **React Router for navigation** - Use guards for protection
6. **Axios for API** - Use service pattern with typed responses
7. **Type everything** - Interfaces for all props and API data
8. **Semantic HTML** - Use proper elements
9. **Accessibility** - ARIA attributes, keyboard support
10. **Toast notifications** - Use `addToast` from `useUIStore`
11. **Global loading** - Use `setGlobalLoading` for async operations
12. **SEO component** - Use `<SEO />` wrapper on every page

Following these guidelines ensures consistency, maintainability, and AI-assisted code generation compatibility.
