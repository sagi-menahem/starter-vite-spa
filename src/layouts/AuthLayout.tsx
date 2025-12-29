/**
 * AuthLayout Component
 *
 * Layout wrapper for authentication pages (login, register, forgot password).
 * Centers content and provides a clean, minimal design.
 */

import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { fadeIn } from '@/lib/animations';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Auth page loading fallback
 */
function AuthLoadingFallback() {
  return (
    <div className="w-full max-w-md space-y-6 p-8">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link
            to="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            {DEFAULTS.siteTitle}
          </Link>
        </div>
      </header>

      {/* Main content - centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Suspense fallback={<AuthLoadingFallback />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {DEFAULTS.siteTitle}.{' '}
            {UI_LABELS.footer.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
