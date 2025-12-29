/**
 * GlobalLoadingBar Component
 *
 * Displays a loading indicator at the top of the viewport
 * when globalLoading is true in the UI store.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/ui.store';
import { DURATION, EASING } from '@/lib/animations';

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
          aria-label="Loading"
        >
          {/* Animated shimmer effect */}
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GlobalLoadingBar;
