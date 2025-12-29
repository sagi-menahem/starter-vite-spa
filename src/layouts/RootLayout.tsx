/**
 * RootLayout Component
 *
 * The root layout wrapper for all pages.
 * Includes global elements like the navbar, footer, and toast container.
 */

import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AccessibilityWidget,
  ToastContainer,
  GlobalLoadingBar,
} from '@/components/shared';

/**
 * Page loading fallback
 */
function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-8" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

export function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Global loading bar */}
      <GlobalLoadingBar />

      {/* Scroll restoration for SPA navigation */}
      <ScrollRestoration />

      {/* Main content area with suspense for lazy-loaded routes */}
      <Suspense fallback={<PageLoadingFallback />}>
        <Outlet />
      </Suspense>

      {/* Global accessibility widget */}
      <AccessibilityWidget position="bottom-end" />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default RootLayout;
