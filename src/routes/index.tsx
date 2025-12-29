/**
 * Route Configuration
 *
 * Centralized routing configuration using React Router 7.
 * All routes are defined here with lazy loading for code splitting.
 */

import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Layouts
import { RootLayout } from '@/layouts/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Guards
import { AuthGuard } from '@/routes/guards/AuthGuard';
import { GuestGuard } from '@/routes/guards/GuestGuard';

// Error Boundary
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Settings = lazy(() => import('@/pages/dashboard/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/**
 * Application routes
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // ========================================
      // PUBLIC ROUTES
      // ========================================
      {
        index: true,
        element: <Home />,
      },

      // ========================================
      // AUTH ROUTES (Guest only - redirect if authenticated)
      // ========================================
      {
        element: (
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        ),
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          // Add more auth routes here:
          // { path: 'forgot-password', element: <ForgotPassword /> },
          // { path: 'reset-password', element: <ResetPassword /> },
        ],
      },

      // ========================================
      // PROTECTED ROUTES (Auth required)
      // ========================================
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          // Add more dashboard routes here:
          // { path: 'profile', element: <Profile /> },
          // { path: 'billing', element: <Billing /> },
        ],
      },

      // ========================================
      // CATCH-ALL (404)
      // ========================================
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

/**
 * Route metadata for SEO and navigation
 * Can be extended with breadcrumbs, permissions, etc.
 */
export const routeMeta = {
  home: { path: '/', title: 'Home' },
  login: { path: '/login', title: 'Login' },
  register: { path: '/register', title: 'Register' },
  dashboard: { path: '/dashboard', title: 'Dashboard' },
  settings: { path: '/dashboard/settings', title: 'Settings' },
} as const;

export type RoutePath = (typeof routeMeta)[keyof typeof routeMeta]['path'];
