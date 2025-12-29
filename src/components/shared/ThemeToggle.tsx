/**
 * ThemeToggle Component
 *
 * Toggles between light, dark, and system theme modes.
 * Persists preference to localStorage via Zustand store.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: Theme;
  label: string;
  icon: typeof Sun;
}

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

interface ThemeToggleProps {
  /** Show as dropdown or cycle button */
  variant?: 'dropdown' | 'cycle';
  /** Additional class names */
  className?: string;
}

export function ThemeToggle({ variant = 'dropdown', className }: ThemeToggleProps) {
  const { theme, setTheme } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = themeOptions.find((opt) => opt.value === theme) || themeOptions[2];
  const CurrentIcon = currentOption.icon;

  // Cycle through themes
  const cycleTheme = () => {
    const currentIndex = themeOptions.findIndex((opt) => opt.value === theme);
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    setTheme(themeOptions[nextIndex].value);
  };

  // Simple cycle button variant
  if (variant === 'cycle') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        className={className}
        aria-label={`Current theme: ${currentOption.label}. Click to change.`}
      >
        <Sun className="size-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // Dropdown variant
  return (
    <div className={cn('relative', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Theme: ${currentOption.label}`}
      >
        <CurrentIcon className="size-4" />
        <span className="hidden sm:inline">{currentOption.label}</span>
        <ChevronDown
          className={cn(
            'size-4 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute end-0 mt-2 w-36 bg-popover border rounded-md shadow-lg z-50 overflow-hidden"
              role="listbox"
              aria-label="Theme options"
            >
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value;

                return (
                  <button
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setTheme(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors',
                      isSelected
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                    )}
                  >
                    <Icon className="size-4" />
                    {option.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeToggle;
