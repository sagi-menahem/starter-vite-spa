/**
 * Application Entry Point
 *
 * Sets up React, providers, and renders the app.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/globals.css';

// Initialize theme from localStorage or system preference
function initializeTheme() {
  const stored = localStorage.getItem('ui-storage');
  let theme = 'system';

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      theme = parsed.state?.theme || 'system';
    } catch {
      // Ignore parse errors
    }
  }

  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

// Initialize theme before render
initializeTheme();

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
