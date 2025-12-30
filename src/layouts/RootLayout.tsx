/**
 * RootLayout Component
 *
 * The root layout wrapper for all pages.
 * Includes global elements like the navbar, footer, and toast container.
 */

import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AccessibilityWidget,
  ToastContainer,
  GlobalLoadingBar,
} from '@/components/shared';
import { DURATION, EASING } from '@/lib/animations';

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

/**
 * Page transition variants
 */
const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION.fast,
      ease: EASING.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.instant,
      ease: EASING.easeIn,
    },
  },
};

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Global loading bar */}
      <GlobalLoadingBar />

      {/* Scroll restoration for SPA navigation */}
      <ScrollRestoration />

      {/* Main content area with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 flex flex-col"
        >
          <Suspense fallback={<PageLoadingFallback />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Global accessibility widget */}
      <AccessibilityWidget position="bottom-end" />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default RootLayout;
