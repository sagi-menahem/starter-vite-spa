/**
 * GlobalLoadingBar Component
 *
 * Displays a loading indicator at the top of the viewport
 * when globalLoading is true in the UI store.
 */

import { UI_LABELS } from '@/config/site';
import { DURATION, EASING } from '@/lib/animations';
import { useUIStore } from '@/stores/ui.store';
import { AnimatePresence, motion } from 'framer-motion';

export function GlobalLoadingBar() {
  const { globalLoading } = useUIStore();

  return (
    <AnimatePresence>
      {globalLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.slow, ease: EASING.smooth }}
          className="fixed top-0 inset-x-0 z-50 h-1 bg-primary origin-left"
          role="progressbar"
          aria-label={UI_LABELS.common.loading}
        >
          {/* Animated shimmer effect */}
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GlobalLoadingBar;
