/**
 * ToastContainer Component
 *
 * Renders toast notifications from the UI store.
 * Uses Framer Motion for smooth enter/exit animations.
 */

import { UI_LABELS } from '@/config/site';
import { DURATION, EASING, fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui.store';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
} as const;

const iconStyles = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
} as const;

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div
      className="fixed bottom-4 end-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label={UI_LABELS.toast.success}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];
          return (
            <motion.div
              key={toast.id}
              layout
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              transition={{ duration: DURATION.normal, ease: EASING.easeOut }}
              className={cn(
                'flex items-start gap-3 p-4 rounded-lg border shadow-lg pointer-events-auto',
                toastStyles[toast.type]
              )}
              role="alert"
            >
              <Icon className={cn('size-5 shrink-0 mt-0.5', iconStyles[toast.type])} />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label={UI_LABELS.common.close}
              >
                <X className="size-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
