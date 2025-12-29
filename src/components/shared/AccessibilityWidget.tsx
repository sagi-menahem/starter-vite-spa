/**
 * AccessibilityWidget Component
 *
 * Floating accessibility menu with toggle options for:
 * - Grayscale mode
 * - High contrast mode
 * - Large text mode
 * - Highlight links mode
 * - Reduce motion mode
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  X,
  Eye,
  Contrast,
  Type,
  Link2,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { UI_LABELS } from '@/config/site';
import { useAccessibility, type AccessibilitySettings } from '@/hooks/useAccessibility';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { scaleUp } from '@/lib/animations';

/**
 * Toggle option configuration
 */
interface ToggleOption {
  key: keyof AccessibilitySettings;
  label: string;
  icon: typeof Eye;
  description: string;
}

const toggleOptions: ToggleOption[] = [
  {
    key: 'grayscale',
    label: UI_LABELS.accessibility.toggles.grayscale,
    icon: Eye,
    description: 'Remove colors from the page',
  },
  {
    key: 'contrast',
    label: UI_LABELS.accessibility.toggles.contrast,
    icon: Contrast,
    description: 'Increase color contrast',
  },
  {
    key: 'largeText',
    label: UI_LABELS.accessibility.toggles.largeText,
    icon: Type,
    description: 'Increase text size by 20%',
  },
  {
    key: 'links',
    label: UI_LABELS.accessibility.toggles.links,
    icon: Link2,
    description: 'Underline all links',
  },
  {
    key: 'reduceMotion',
    label: UI_LABELS.accessibility.toggles.reduceMotion,
    icon: Zap,
    description: 'Disable animations',
  },
];

interface AccessibilityWidgetProps {
  /** Position of the widget */
  position?: 'bottom-start' | 'bottom-end';
  /** Additional class names */
  className?: string;
}

export function AccessibilityWidget({
  position = 'bottom-end',
  className,
}: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, toggle, resetAll, hasActiveSettings } = useAccessibility();

  const positionClasses = {
    'bottom-start': 'bottom-4 start-4',
    'bottom-end': 'bottom-4 end-4',
  };

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      {/* Menu panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={cn(
                'absolute mb-2 w-72 bg-popover border rounded-lg shadow-xl overflow-hidden',
                position === 'bottom-end' ? 'end-0 bottom-full' : 'start-0 bottom-full'
              )}
              role="dialog"
              aria-label={UI_LABELS.accessibility.title}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                  <Accessibility className="size-5 text-primary" />
                  <h2 className="font-semibold">{UI_LABELS.accessibility.title}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setIsOpen(false)}
                  aria-label={UI_LABELS.accessibility.closeLabel}
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Toggle options */}
              <div className="p-2 space-y-1">
                {toggleOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = settings[option.key];

                  return (
                    <button
                      key={option.key}
                      onClick={() => toggle(option.key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      )}
                      role="switch"
                      aria-checked={isActive}
                      aria-label={option.label}
                    >
                      <div
                        className={cn(
                          'size-8 rounded-md flex items-center justify-center transition-colors',
                          isActive ? 'bg-primary-foreground/20' : 'bg-muted'
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 text-start">
                        <div className="font-medium">{option.label}</div>
                        <div
                          className={cn(
                            'text-xs',
                            isActive
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {option.description}
                        </div>
                      </div>
                      {/* Toggle indicator */}
                      <div
                        className={cn(
                          'size-5 rounded-full border-2 flex items-center justify-center transition-colors',
                          isActive
                            ? 'border-primary-foreground bg-primary-foreground'
                            : 'border-muted-foreground'
                        )}
                      >
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="size-2 rounded-full bg-primary"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer with reset button */}
              {hasActiveSettings && (
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAll}
                    className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="size-4" />
                    {UI_LABELS.accessibility.resetAll}
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <Button
        variant="default"
        size="icon"
        className={cn(
          'size-12 rounded-full shadow-lg',
          hasActiveSettings && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={UI_LABELS.accessibility.buttonLabel}
      >
        <Accessibility className="size-5" />
        {/* Active indicator badge */}
        {hasActiveSettings && (
          <span className="absolute -top-1 -end-1 size-4 bg-destructive rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            {Object.values(settings).filter(Boolean).length}
          </span>
        )}
      </Button>
    </div>
  );
}

export default AccessibilityWidget;
