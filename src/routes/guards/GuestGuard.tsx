/**
 * GuestGuard Component
 *
 * Protects routes that should only be accessible to unauthenticated users.
 * Redirects authenticated users to the dashboard.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { Skeleton } from '@/components/ui/skeleton';

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * Loading screen shown while checking auth state
 */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-4 p-8">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  // Show loading screen while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to dashboard (or intended destination) if already authenticated
  if (isAuthenticated) {
    // Check if there's a saved location to redirect to
    const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

export default GuestGuard;
