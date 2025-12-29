/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { UI_LABELS } from '@/config/site';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error fallback UI component
 */
function ErrorFallback({
  error,
  resetError,
}: {
  error?: Error | null;
  resetError?: () => void;
}) {
  const { serverError } = UI_LABELS.errors;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="size-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="size-8 text-destructive" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold">{serverError.title}</h1>

        {/* Description */}
        <p className="text-muted-foreground mt-2">{serverError.description}</p>

        {/* Error details (development only) */}
        {import.meta.env.DEV && error && (
          <pre className="mt-4 p-4 bg-muted rounded-md text-xs text-start overflow-auto max-h-32">
            {error.message}
          </pre>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {resetError && (
            <Button onClick={resetError} variant="outline">
              <RefreshCw className="me-2 size-4" />
              {serverError.tryAgain}
            </Button>
          )}
          <Button asChild>
            <Link to="/">
              <Home className="me-2 size-4" />
              {serverError.returnHome}
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Route error component for React Router
 */
function RouteErrorBoundary() {
  const error = useRouteError();

  // Handle route errors (404, etc.)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-md"
          >
            <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
            <h2 className="text-2xl font-bold mt-4">
              {UI_LABELS.errors.notFound.title}
            </h2>
            <p className="text-muted-foreground mt-2">
              {UI_LABELS.errors.notFound.description}
            </p>
            <Button asChild className="mt-8">
              <Link to="/">
                <Home className="me-2 size-4" />
                {UI_LABELS.errors.notFound.returnHome}
              </Link>
            </Button>
          </motion.div>
        </div>
      );
    }
  }

  // Handle other errors
  return (
    <ErrorFallback
      error={error instanceof Error ? error : null}
      resetError={() => window.location.reload()}
    />
  );
}

/**
 * Class-based Error Boundary for catching render errors
 */
class ErrorBoundaryClass extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback error={this.state.error} resetError={this.resetError} />
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Export both the class-based boundary and route error boundary
 */
export { ErrorBoundaryClass as ErrorBoundary, RouteErrorBoundary, ErrorFallback };
