# PLANNING.md - Starter Vite SPA Template

> **Template #3 in the Master Ecosystem**
> A high-performance Single Page Application template optimized for complex dashboards and client-side state management.

---

## Table of Contents

1. [DNA Consistency Audit](#1-dna-consistency-audit)
2. [Technical Architecture](#2-technical-architecture)
3. [Production Essentials](#3-production-essentials)
4. [File Structure](#4-file-structure)
5. [Action Plan](#5-action-plan)
6. [Shared DNA Files](#6-shared-dna-files)

---

## 1. DNA Consistency Audit

### 1.1 Configuration Structure (`src/config/site.ts`)

Port the exact configuration pattern from `starter-next-saas`:

```typescript
// SITE_CONFIG - Global settings with RTL support
export const SITE_CONFIG = {
  direction: 'ltr' as 'ltr' | 'rtl',
  language: 'en',
  locale: 'en-US',
} as const;

export const isRTL = () => SITE_CONFIG.direction === 'rtl';

// UI_LABELS - Hierarchical structure (NO hardcoded strings in components)
export const UI_LABELS = {
  form: { /* labels, placeholders, messages */ },
  validation: { /* error messages */ },
  accessibility: { /* a11y widget labels */ },
  nav: { /* navigation labels */ },
  auth: { /* authentication flow labels */ },
  common: { /* shared labels */ },
  dashboard: { /* dashboard-specific labels */ },
  settings: { /* settings page labels */ },
  errors: { /* error page content */ },
} as const;

// DEFAULTS - Fallback content
export const DEFAULTS = {
  siteTitle: 'Vite SPA Starter',
  siteDescription: 'High-performance SPA template',
  // ... additional defaults
} as const;
```

**Key Rules:**
- All UI text MUST come from `UI_LABELS`
- No hardcoded strings in components
- `DEFAULTS` provides fallback values

---

### 1.2 Animation System (`src/lib/animations.ts`)

Port the complete Framer Motion library:

```typescript
// EASING CURVES
export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94],    // General animations
  snappy: [0.76, 0, 0.24, 1],          // Quick interactions
  premium: [0.43, 0.13, 0.23, 0.96],   // Luxury feel
  easeOut: [0, 0, 0.2, 1],             // Entry animations
  easeIn: [0.4, 0, 1, 1],              // Exit animations
} as const;

// DURATION VALUES (seconds)
export const DURATION = {
  instant: 0.15,    // Micro-interactions
  fast: 0.3,        // Button hovers
  medium: 0.5,      // Standard reveals
  normal: 0.6,      // Default duration
  slow: 0.8,        // Slower reveals
  dramatic: 1.2,    // Hero entrances
} as const;

// SPRING PHYSICS
export const SPRING = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  bouncy: { type: 'spring', stiffness: 300, damping: 20 },
  gentle: { type: 'spring', stiffness: 100, damping: 30 },
  smooth: { type: 'spring', stiffness: 200, damping: 25 },
} as const;

// ANIMATION VARIANTS
// - fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleUp
// - staggerContainer, staggerContainerFast, staggerContainerSlow, staggerItem
// - hoverScale, hoverLift
// - viewportOnce, viewportAlways, viewportHalf
```

---

### 1.3 AI Development Guidelines

**Strict Rules to Enforce:**

| Rule | Description |
|------|-------------|
| No Hardcoded Strings | All UI text from `UI_LABELS` or CMS |
| Logical Properties | Use `ms-*`, `me-*`, `ps-*`, `pe-*` for RTL |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>` |
| TypeScript Interfaces | All props must have typed interfaces |
| Component Structure | Standard template with JSDoc comments |
| Image Dimensions | Explicit `width` and `height` for CLS prevention |

**Component Template:**
```tsx
/**
 * ComponentName
 * Brief description
 */
'use client'; // Only if needed (for this SPA, most will be client)

import { motion } from 'framer-motion';
import { UI_LABELS, SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';

interface ComponentNameProps {
  /** Description */
  title: string;
  /** Optional with default */
  showIcon?: boolean;
}

export function ComponentName({ title, showIcon = true }: ComponentNameProps) {
  const isRTL = SITE_CONFIG.direction === 'rtl';

  return (
    <section id="component-id" className="py-20">
      {/* Implementation */}
    </section>
  );
}

export default ComponentName;
```

---

### 1.4 Global Styles (`src/styles/globals.css`)

Port Tailwind v4 theme tokens:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme {
  /* Primary Colors */
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);

  /* Background & Surface */
  --color-background: oklch(1 0 0);
  --color-background-alt: oklch(0.97 0 0);
  --color-surface: oklch(1 0 0);
  --color-surface-elevated: oklch(0.97 0 0);

  /* Text */
  --color-foreground: oklch(0.145 0 0);
  --color-muted: oklch(0.556 0 0);

  /* Borders */
  --color-border: oklch(0.922 0 0);
  --color-border-hover: oklch(0.85 0 0);

  /* Status */
  --color-success: oklch(0.65 0.15 145);
  --color-error: oklch(0.577 0.245 27.325);
  --color-warning: oklch(0.75 0.15 85);

  /* Border Radius Scale */
  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* Dark Mode */
.dark {
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
  /* ... inverted values */
}

/* Accessibility Classes */
.a11y-grayscale { filter: grayscale(100%); }
.a11y-contrast { filter: contrast(150%); }
.a11y-large-text { font-size: 120%; }
.a11y-links a { text-decoration: underline !important; }
.a11y-reduce-motion * {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}

/* Custom Scrollbars */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-background-alt);
}
```

---

## 2. Technical Architecture

### 2.1 Core Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Build Tool | Vite | 6.x |
| Framework | React | 19.x |
| Language | TypeScript | 5.x |
| Routing | React Router | 7.x (latest) |
| State | Zustand | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | Latest |
| Components | shadcn/ui | Latest |
| Forms | React Hook Form + Zod | Latest |
| HTTP | Axios | 1.x |
| Meta Tags | react-helmet-async | Latest |

---

### 2.2 Routing Architecture

**Centralized Route Configuration:**

```typescript
// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy-loaded route components
const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Route definitions with metadata
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public routes
      { index: true, element: <Home />, meta: { title: 'Home' } },
      { path: 'login', element: <Login />, meta: { title: 'Login' } },
      { path: 'register', element: <Register />, meta: { title: 'Register' } },

      // Protected routes (wrapped with AuthGuard)
      {
        path: 'dashboard',
        element: <AuthGuard><DashboardLayout /></AuthGuard>,
        children: [
          { index: true, element: <Dashboard />, meta: { title: 'Dashboard' } },
          { path: 'settings', element: <Settings />, meta: { title: 'Settings' } },
          { path: 'settings/profile', element: <Profile /> },
          { path: 'settings/billing', element: <Billing /> },
        ],
      },

      // Catch-all
      { path: '*', element: <NotFound /> },
    ],
  },
] as const;

export const router = createBrowserRouter(routes);
```

**Route Guards:**

```typescript
// src/components/guards/AuthGuard.tsx
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

---

### 2.3 State Management (Zustand)

**Store Architecture:**

```
src/stores/
├── auth.store.ts      # Authentication state
├── ui.store.ts        # UI state (sidebar, modals, theme)
├── user.store.ts      # User preferences
└── index.ts           # Combined store exports
```

**Auth Store:**

```typescript
// src/stores/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      refreshToken: async () => { /* implementation */ },
      clearError: () => set({ error: null }),
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
```

**UI Store:**

```typescript
// src/stores/ui.store.ts
interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  activeModal: string | null;
  globalLoading: boolean;
  toasts: Toast[];
}

interface UIActions {
  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setGlobalLoading: (loading: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      // State
      theme: 'system',
      sidebarOpen: true,
      sidebarCollapsed: false,
      activeModal: null,
      globalLoading: false,
      toasts: [],

      // Actions
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      // ... other actions
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
```

**User Preferences Store:**

```typescript
// src/stores/user.store.ts
interface UserPreferences {
  language: string;
  direction: 'ltr' | 'rtl';
  accessibility: {
    grayscale: boolean;
    contrast: boolean;
    largeText: boolean;
    underlineLinks: boolean;
    reduceMotion: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}
```

---

### 2.4 API Layer

**Axios Configuration:**

```typescript
// src/lib/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { useUIStore } from '@/stores/ui.store';

// Create instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - JWT injection
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Error handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await useAuthStore.getState().refreshToken();
        return api(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || 'An error occurred';
    useUIStore.getState().addToast({
      type: 'error',
      message: errorMessage,
    });

    return Promise.reject(error);
  }
);
```

**API Service Pattern:**

```typescript
// src/lib/api/services/auth.service.ts
import { api } from '../client';

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: RegisterDTO) =>
    api.post('/auth/register', data),

  logout: () =>
    api.post('/auth/logout'),

  refreshToken: () =>
    api.post('/auth/refresh'),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// src/lib/api/services/user.service.ts
export const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: UpdateProfileDTO) => api.patch('/user/profile', data),
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
```

---

### 2.5 UI Components (shadcn/ui)

**Installation Strategy:**

1. Initialize shadcn/ui with Tailwind v4 configuration
2. Install base components needed for the starter
3. Configure path aliases to match our folder structure

**Required Base Components:**

| Category | Components |
|----------|------------|
| Layout | Sidebar, Card, Separator, Sheet |
| Forms | Button, Input, Label, Textarea, Select, Checkbox, Switch, Form |
| Feedback | Alert, Toast, Skeleton, Progress, Spinner |
| Overlay | Dialog, Dropdown Menu, Popover, Tooltip |
| Navigation | Tabs, Breadcrumb, Pagination |
| Data Display | Avatar, Badge, Table |

**Custom Components to Create:**

| Component | Purpose |
|-----------|---------|
| `AccessibilityWidget` | A11y toggles (port from Astro/Next) |
| `AnimatedSection` | Scroll-triggered animations |
| `ErrorBoundary` | Global error catching |
| `LoadingScreen` | Full-page loading state |
| `GlobalLoadingBar` | Top progress bar |
| `ThemeToggle` | Light/dark/system toggle |

---

## 3. Production Essentials

### 3.1 Error Boundaries

**Global Error Boundary:**

```typescript
// src/components/error/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { UI_LABELS } from '@/config/site';

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
    console.error('Error caught:', error, errorInfo);
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

**404 Page:**

```typescript
// src/pages/NotFound.tsx
export function NotFound() {
  const { notFound: labels } = UI_LABELS.errors;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-muted">404</h1>
        <h2 className="text-2xl font-semibold mt-4">{labels.heading}</h2>
        <p className="text-muted mt-2">{labels.description}</p>
        <Link to="/" className="btn-primary mt-8 inline-block">
          {labels.returnHome}
        </Link>
      </div>
    </div>
  );
}
```

---

### 3.2 Loading States

**Skeleton Components:**

```typescript
// Reuse shadcn/ui Skeleton with custom variants
export function CardSkeleton() {
  return (
    <div className="card p-6">
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
```

**Global Loading Bar:**

```typescript
// src/components/ui/GlobalLoadingBar.tsx
import { useUIStore } from '@/stores/ui.store';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalLoadingBar() {
  const globalLoading = useUIStore((s) => s.globalLoading);

  return (
    <AnimatePresence>
      {globalLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
}
```

---

### 3.3 SEO/Meta Management

**React Helmet Async Setup:**

```typescript
// src/main.tsx
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);

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

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
```

---

### 3.4 PWA Configuration

**Manifest:**

```json
// public/manifest.json
{
  "name": "Vite SPA Starter",
  "short_name": "ViteSPA",
  "description": "High-performance SPA template",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

**Vite PWA Plugin Configuration:**

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: false, // Use our custom manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## 4. File Structure

```
starter-vite-spa/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── manifest.json
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       └── icon-maskable.png
│
├── src/
│   ├── main.tsx                    # App entry point
│   ├── App.tsx                     # Root component
│   ├── vite-env.d.ts               # Vite types
│   │
│   ├── config/
│   │   ├── site.ts                 # UI_LABELS, DEFAULTS, SITE_CONFIG
│   │   └── env.ts                  # Environment variables typing
│   │
│   ├── routes/
│   │   ├── index.tsx               # Route configuration
│   │   └── guards/
│   │       ├── AuthGuard.tsx       # Protected route wrapper
│   │       └── GuestGuard.tsx      # Redirect if authenticated
│   │
│   ├── pages/
│   │   ├── Home.tsx                # Landing page
│   │   ├── Login.tsx               # Login page
│   │   ├── Register.tsx            # Registration page
│   │   ├── ForgotPassword.tsx      # Password recovery
│   │   ├── NotFound.tsx            # 404 page
│   │   └── dashboard/
│   │       ├── Dashboard.tsx       # Main dashboard
│   │       ├── Settings.tsx        # Settings hub
│   │       ├── Profile.tsx         # Profile settings
│   │       └── Billing.tsx         # Billing settings
│   │
│   ├── layouts/
│   │   ├── RootLayout.tsx          # Base layout (header, footer)
│   │   ├── AuthLayout.tsx          # Auth pages layout
│   │   └── DashboardLayout.tsx     # Dashboard sidebar layout
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...
│   │   │
│   │   ├── shared/
│   │   │   ├── SEO.tsx             # Meta tags component
│   │   │   ├── Logo.tsx            # Brand logo
│   │   │   ├── ThemeToggle.tsx     # Dark mode toggle
│   │   │   ├── AccessibilityWidget.tsx  # A11y controls
│   │   │   └── AnimatedSection.tsx # Scroll animations
│   │   │
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx          # Top navigation
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── Sidebar.tsx         # Dashboard sidebar
│   │   │   └── Breadcrumbs.tsx     # Page breadcrumbs
│   │   │
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx       # Login form
│   │   │   ├── RegisterForm.tsx    # Registration form
│   │   │   ├── ProfileForm.tsx     # Profile edit form
│   │   │   └── ContactForm.tsx     # Contact form
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx       # Dashboard stat cards
│   │   │   ├── RecentActivity.tsx  # Activity feed
│   │   │   └── QuickActions.tsx    # Action shortcuts
│   │   │
│   │   └── error/
│   │       ├── ErrorBoundary.tsx   # Error catching
│   │       └── ErrorFallback.tsx   # Error display
│   │
│   ├── stores/
│   │   ├── index.ts                # Store exports
│   │   ├── auth.store.ts           # Authentication state
│   │   ├── ui.store.ts             # UI state (theme, sidebar)
│   │   └── user.store.ts           # User preferences
│   │
│   ├── lib/
│   │   ├── utils.ts                # cn() and utilities
│   │   ├── animations.ts           # Framer Motion variants
│   │   └── api/
│   │       ├── client.ts           # Axios instance
│   │       └── services/
│   │           ├── auth.service.ts
│   │           └── user.service.ts
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts         # Navigation scroll tracking
│   │   ├── useMediaQuery.ts        # Responsive breakpoints
│   │   ├── useDebounce.ts          # Debounced values
│   │   └── useLocalStorage.ts      # Persisted state
│   │
│   ├── types/
│   │   ├── index.ts                # Shared types
│   │   ├── auth.types.ts           # Auth-related types
│   │   └── api.types.ts            # API response types
│   │
│   └── styles/
│       └── globals.css             # Tailwind + theme tokens
│
├── docs/
│   └── AI_DEVELOPMENT_GUIDELINES.md  # Coding standards
│
├── .env.example                    # Environment template
├── .gitignore
├── index.html                      # HTML entry
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts              # Tailwind v4 config (if needed)
├── postcss.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

---

## 5. Action Plan

### Step 1: Initialize Project

```bash
# Create Vite project with React + TypeScript
npm create vite@latest starter-vite-spa -- --template react-ts

# Navigate to project
cd starter-vite-spa

# Initialize git (optional)
git init
```

### Step 2: Install Core Dependencies

```bash
# Routing
npm install react-router-dom

# State Management
npm install zustand immer

# Styling
npm install -D tailwindcss@next @tailwindcss/vite postcss autoprefixer

# Animations
npm install framer-motion

# HTTP Client
npm install axios

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Meta Tags
npm install react-helmet-async

# Icons
npm install lucide-react

# Utilities
npm install clsx tailwind-merge
```

### Step 3: Install Dev Dependencies

```bash
# ESLint & Prettier
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier eslint-plugin-react-hooks

# PWA (optional)
npm install -D vite-plugin-pwa workbox-window
```

### Step 4: Initialize Tailwind CSS v4

```bash
# Initialize Tailwind (creates postcss.config.js)
npx tailwindcss init -p

# Create globals.css with @import 'tailwindcss'
```

### Step 5: Setup shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Install required components
npx shadcn@latest add button input label card skeleton dialog
npx shadcn@latest add dropdown-menu popover tooltip toast
npx shadcn@latest add tabs avatar badge separator
npx shadcn@latest add form select checkbox switch textarea
npx shadcn@latest add sidebar breadcrumb pagination progress
```

### Step 6: Create Folder Structure

```bash
# Create directory structure
mkdir -p src/{config,routes/guards,pages/dashboard,layouts}
mkdir -p src/components/{ui,shared,navigation,forms,dashboard,error}
mkdir -p src/{stores,lib/api/services,hooks,types,styles}
mkdir -p public/icons docs
```

### Step 7: Port Shared DNA Files

```bash
# Files to copy/adapt from reference projects:
# 1. src/config/site.ts (from starter-next-saas)
# 2. src/lib/animations.ts (from starter-next-saas)
# 3. src/lib/utils.ts (cn function)
# 4. src/styles/globals.css (theme tokens)
# 5. docs/AI_DEVELOPMENT_GUIDELINES.md (adapt for SPA)
```

### Step 8: Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
});
```

### Step 9: Setup TypeScript Paths

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Step 10: Create Environment Files

```bash
# .env.example
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME="Vite SPA Starter"
VITE_APP_URL=http://localhost:3000
```

---

## 6. Shared DNA Files

### Files to Port Directly

| Source | Destination | Modifications |
|--------|-------------|---------------|
| `starter-next-saas/src/config/site.ts` | `src/config/site.ts` | Remove Next.js specific entries |
| `starter-next-saas/src/lib/animations.ts` | `src/lib/animations.ts` | None - fully compatible |
| `starter-next-saas/src/lib/utils.ts` | `src/lib/utils.ts` | None - fully compatible |
| `starter-next-saas/src/app/globals.css` | `src/styles/globals.css` | Adapt import paths |
| `starter-next-saas/docs/AI_DEVELOPMENT_GUIDELINES.md` | `docs/AI_DEVELOPMENT_GUIDELINES.md` | Update for SPA context |

### Files to Adapt

| Source Component | Target Component | Changes Needed |
|------------------|------------------|----------------|
| `AccessibilityBtn.tsx` | `AccessibilityWidget.tsx` | Remove client directive |
| `AnimatedSection.tsx` | `AnimatedSection.tsx` | Remove client directive |
| `Navbar.tsx` | `Navbar.tsx` | Use React Router `Link` |
| `Footer.tsx` | `Footer.tsx` | Use React Router `Link` |

---

## Summary

This planning document establishes the complete architecture for `starter-vite-spa`, the third template in the master ecosystem. The template maintains:

1. **DNA Consistency** - Same UI_LABELS, DEFAULTS, animations, and styling tokens
2. **RTL Support** - Logical properties and direction-aware components
3. **Accessibility** - A11y widget, semantic HTML, ARIA attributes
4. **Type Safety** - Full TypeScript with strict interfaces
5. **Production Ready** - Error boundaries, loading states, SEO, PWA

The SPA-specific additions include:
- Zustand for client-side state management
- React Router for SPA routing
- Axios with interceptors for API communication
- React Helmet for meta tag management

All implementation follows the AI Development Guidelines established in the previous templates.
