/**
 * useAccessibility Hook
 *
 * Manages accessibility preferences with localStorage persistence.
 * Applies CSS classes to the document root for accessibility features.
 */

import { useState, useEffect, useCallback } from 'react';

export interface AccessibilitySettings {
  grayscale: boolean;
  contrast: boolean;
  largeText: boolean;
  links: boolean;
  reduceMotion: boolean;
}

const STORAGE_KEY = 'a11y-settings';

const defaultSettings: AccessibilitySettings = {
  grayscale: false,
  contrast: false,
  largeText: false,
  links: false,
  reduceMotion: false,
};

/**
 * Maps setting keys to CSS class names
 */
const classMap: Record<keyof AccessibilitySettings, string> = {
  grayscale: 'a11y-grayscale',
  contrast: 'a11y-contrast',
  largeText: 'a11y-large-text',
  links: 'a11y-links',
  reduceMotion: 'a11y-reduce-motion',
};

/**
 * Load settings from localStorage
 */
function loadSettings(): AccessibilitySettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch {
    // Ignore parse errors
  }
  return defaultSettings;
}

/**
 * Save settings to localStorage
 */
function saveSettings(settings: AccessibilitySettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Apply settings to document root
 */
function applySettings(settings: AccessibilitySettings): void {
  const root = document.documentElement;

  Object.entries(classMap).forEach(([key, className]) => {
    const setting = key as keyof AccessibilitySettings;
    if (settings[setting]) {
      root.classList.add(className);
    } else {
      root.classList.remove(className);
    }
  });
}

/**
 * Custom hook for managing accessibility settings
 */
export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);

  // Apply settings on mount and when they change
  useEffect(() => {
    applySettings(settings);
    saveSettings(settings);
  }, [settings]);

  // Toggle a specific setting
  const toggle = useCallback((key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Reset all settings to defaults
  const resetAll = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  // Check if any setting is active
  const hasActiveSettings = Object.values(settings).some(Boolean);

  return {
    settings,
    toggle,
    resetAll,
    hasActiveSettings,
  };
}

export default useAccessibility;
