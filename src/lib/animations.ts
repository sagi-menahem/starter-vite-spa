/**
 * Animation Utilities
 *
 * Reusable Framer Motion animation variants and configurations.
 * Import these in components to maintain consistent animations across the site.
 */

import type { Variants, Transition } from 'framer-motion';

/**
 * Premium easing curves for smooth, professional animations
 */
export const EASING = {
  /** Smooth ease for general purpose animations */
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  /** Snappy ease for quick interactions */
  snappy: [0.76, 0, 0.24, 1] as const,
  /** Premium luxury feel - slow start, fast middle, soft landing */
  premium: [0.43, 0.13, 0.23, 0.96] as const,
  /** Ease out for elements entering */
  easeOut: [0, 0, 0.2, 1] as const,
  /** Ease in for elements leaving */
  easeIn: [0.4, 0, 1, 1] as const,
} as const;

/**
 * Standardized duration values (in seconds)
 */
export const DURATION = {
  /** Micro-interactions, quick feedback */
  instant: 0.15,
  /** Fast transitions, button hovers */
  fast: 0.3,
  /** Standard reveals, most UI animations */
  medium: 0.5,
  /** Default animation duration */
  normal: 0.6,
  /** Slower, more dramatic reveals */
  slow: 0.8,
  /** Hero entrances, page transitions */
  dramatic: 1.2,
} as const;

/**
 * Spring physics configurations
 */
export const SPRING = {
  /** Quick, responsive spring */
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as const,
  /** Bouncy, playful spring */
  bouncy: { type: 'spring', stiffness: 300, damping: 20 } as const,
  /** Gentle, smooth spring */
  gentle: { type: 'spring', stiffness: 100, damping: 30 } as const,
  /** Balanced, natural feeling */
  smooth: { type: 'spring', stiffness: 200, damping: 25 } as const,
} as const;

/**
 * Default transition preset
 */
export const defaultTransition: Transition = {
  duration: DURATION.normal,
  ease: EASING.premium,
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Fade in animation - simple opacity transition
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.medium, ease: EASING.smooth },
  },
};

/**
 * Fade in from below - element rises up while fading in
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.premium,
    },
  },
};

/**
 * Fade in from above - element drops down while fading in
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.premium,
    },
  },
};

/**
 * Fade in from left - element slides in from the start side
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.premium,
    },
  },
};

/**
 * Fade in from right - element slides in from the end side
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.premium,
    },
  },
};

/**
 * Scale up - element grows while fading in
 */
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASING.smooth,
    },
  },
};

/**
 * Stagger container - use as parent for staggered children
 * Children should use individual animation variants
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger container with faster stagger
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger container with slower, more dramatic stagger
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Item variant for use inside stagger containers
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASING.premium,
    },
  },
};

// ============================================================================
// HOVER & INTERACTION VARIANTS
// ============================================================================

/**
 * Scale on hover - subtle lift effect
 */
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

/**
 * Lift on hover - rises up with shadow
 */
export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: { y: -4 },
  tap: { y: 0 },
};

// ============================================================================
// VIEWPORT ANIMATION OPTIONS
// ============================================================================

/**
 * Default viewport options for scroll-triggered animations
 * Use with motion components: whileInView="visible" viewport={viewportOnce}
 */
export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;

/**
 * Viewport options that trigger every time element enters view
 */
export const viewportAlways = {
  once: false,
  amount: 0.2,
} as const;

/**
 * Viewport options with higher threshold (more of element must be visible)
 */
export const viewportHalf = {
  once: true,
  amount: 0.5,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Creates a custom delay for staggered animations
 * @param index - The index of the item in the list
 * @param baseDelay - Base delay in seconds (default: 0.1)
 * @returns Delay in seconds
 */
export const getStaggerDelay = (index: number, baseDelay = 0.1): number => {
  return index * baseDelay;
};

/**
 * Creates a fade-in-up variant with custom delay
 * @param delay - Delay in seconds
 * @returns Variants object
 */
export const fadeInUpWithDelay = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.premium,
      delay,
    },
  },
});
