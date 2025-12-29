/**
 * Environment Configuration
 *
 * Type-safe access to environment variables.
 * All VITE_ prefixed variables are exposed to the client.
 */

// Extend Vite's ImportMetaEnv
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_URL: string;
    readonly VITE_API_BASE_URL: string;
  }
}

/**
 * Environment variables with fallback defaults
 */
export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Vite SPA Starter',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

export type Env = typeof ENV;
