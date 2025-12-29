/**
 * Site Configuration
 *
 * Global settings that affect the entire site behavior.
 * Change these values to configure language, direction, and other global settings.
 */
export const SITE_CONFIG = {
  /**
   * Language direction: 'ltr' for English/European languages, 'rtl' for Hebrew/Arabic
   * This affects:
   * - HTML dir attribute
   * - Tailwind logical properties (ms-, me-, ps-, pe-)
   * - Component layouts that need directional awareness
   */
  direction: 'ltr' as 'ltr' | 'rtl',

  /**
   * Language code for the HTML lang attribute
   * Examples: 'en', 'he', 'ar', 'fr', 'de'
   */
  language: 'en',

  /**
   * Locale for date formatting and other locale-aware features
   * Examples: 'en-US', 'he-IL', 'ar-SA'
   */
  locale: 'en-US',
} as const;

/**
 * Helper to check if site is in RTL mode
 */
export const isRTL = () => SITE_CONFIG.direction === 'rtl';

/**
 * UI Labels and Constants
 *
 * This file contains all hardcoded UI text.
 * Modify these values to change the language or wording of the UI.
 * For CMS-editable content, use API or local data files.
 */
export const UI_LABELS = {
  // Contact Form
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'How can we help you?',
    submitButton: 'Send Message',
    submitting: 'Sending...',
    successMessage: "Message sent successfully! We'll get back to you soon.",
    errorMessage: 'Something went wrong. Please try again later.',
    tryAgain: 'Try again',
  },

  // Form Validation
  validation: {
    nameRequired: 'Name must be at least 2 characters',
    emailInvalid: 'Please enter a valid email address',
    messageRequired: 'Message must be at least 10 characters',
    passwordRequired: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
  },

  // Accessibility Menu
  accessibility: {
    title: 'Accessibility',
    buttonLabel: 'Accessibility options',
    closeLabel: 'Close accessibility menu',
    resetAll: 'Reset All',
    toggles: {
      grayscale: 'Grayscale',
      contrast: 'High Contrast',
      largeText: 'Large Text',
      links: 'Highlight Links',
      reduceMotion: 'Reduce Motion',
    },
  },

  // Navigation
  nav: {
    toggleMenu: 'Toggle menu',
    scrollToTop: 'Scroll to top',
    login: 'Log in',
    logout: 'Log out',
    dashboard: 'Dashboard',
    settings: 'Settings',
    home: 'Home',
  },

  // Auth
  auth: {
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to your account',
    registerTitle: 'Create an account',
    registerSubtitle: 'Get started with your free account',
    forgotPasswordTitle: 'Reset your password',
    forgotPasswordSubtitle: "Enter your email and we'll send you a reset link",
    emailLabel: 'Email',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm password',
    loginButton: 'Sign in',
    registerButton: 'Create account',
    resetButton: 'Send reset link',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    orContinueWith: 'Or continue with',
    checkEmail: 'Check your email for a confirmation link.',
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    noResults: 'No results found',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    confirm: 'Confirm',
    close: 'Close',
  },

  // Dashboard
  dashboard: {
    welcome: 'Welcome back',
    overview: 'Overview',
    recentActivity: 'Recent Activity',
    noActivity: 'No recent activity',
  },

  // Settings
  settings: {
    title: 'Settings',
    profile: 'Profile',
    billing: 'Billing',
    team: 'Team',
    notifications: 'Notifications',
    updateProfile: 'Update profile',
    profileUpdated: 'Profile updated successfully',
  },

  // Billing
  billing: {
    currentPlan: 'Current Plan',
    manageBilling: 'Manage Billing',
    upgradeNow: 'Upgrade Now',
    cancelSubscription: 'Cancel Subscription',
    paymentMethod: 'Payment Method',
    billingHistory: 'Billing History',
  },

  // Posts Section (fallbacks if API empty)
  posts: {
    emptyState: 'No posts yet. Check back later.',
    createPost: 'Create a Post',
    readMore: 'Read more',
    publishedOn: 'Published on',
  },

  // Lightbox
  lightbox: {
    close: 'Close lightbox',
    previous: 'Previous image',
    next: 'Next image',
  },

  // Error Pages
  errors: {
    notFound: {
      title: 'Page Not Found',
      heading: '404',
      description: "Oops! The page you're looking for doesn't exist or has been moved.",
      returnHome: 'Return Home',
    },
    serverError: {
      title: 'Something Went Wrong',
      heading: 'Error',
      description: "We're sorry, but something unexpected happened. Please try again.",
      tryAgain: 'Try Again',
      returnHome: 'Return Home',
    },
  },

  // Gallery
  gallery: {
    noResults: 'No projects found in this category.',
  },

  // Footer
  footer: {
    features: 'Features',
    faq: 'FAQ',
    contact: 'Contact',
    admin: 'Admin',
    allRightsReserved: 'All rights reserved.',
  },

  // Toast notifications
  toast: {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
  },
} as const;

/**
 * Default values for content
 * Used as fallbacks when API data is empty
 */
export const DEFAULTS = {
  // Site
  siteTitle: 'Vite SPA Starter',
  siteDescription: 'A modern high-performance SPA template with Vite, React 19, and Zustand',

  // Hero Section
  heroHeadline: 'Build Powerful SPAs Faster',
  heroSubheadline:
    'A production-ready Vite + React template with state management, routing, and everything you need to launch.',
  heroCtaText: 'Get Started',
  heroSecondaryCtaText: 'View Demo',
  heroSecondaryCtaLink: '#features',
  trustBadgeText: 'Trusted by developers worldwide',

  // Features Section
  featuresTitle: 'Features',
  featuresSubtitle: 'Everything you need to build modern web experiences.',

  // Posts Section
  postsTitle: 'Recent Posts',
  postsSubtitle: 'Latest updates and articles from our blog.',

  // Contact Section
  contactTitle: 'Get in Touch',
  contactSubtitle: 'Have a question or want to work together? Send us a message!',

  // Footer
  footerText: 'Built with Vite, React, and Tailwind CSS.',

  // CTA
  ctaButtonText: 'Get Started',
  ctaButtonUrl: '/register',

  // Pricing Section
  pricingTitle: 'Pricing',
  pricingSubtitle: 'Simple, transparent pricing for everyone.',

  // FAQ Section
  faqTitle: 'Frequently Asked Questions',
  faqSubtitle: 'Everything you need to know about our platform.',

  // Final CTA Section
  finalCtaTitle: 'Ready to get started?',
  finalCtaSubtitle: 'Join thousands of developers building with our platform.',
  finalCtaButtonText: 'Start your free trial',

  // Default Features (fallback when API is empty)
  defaultFeatures: [
    {
      title: 'Lightning Fast',
      description:
        'Built on Vite 6 with instant hot reloads and optimized production builds using ESBuild.',
      icon: 'zap',
    },
    {
      title: 'Modern Stack',
      description: 'React 19, TypeScript, Zustand for state, and React Router for navigation.',
      icon: 'layers',
    },
    {
      title: 'Beautiful UI',
      description:
        'Crafted with shadcn/ui components, Tailwind CSS 4, and smooth Framer Motion animations.',
      icon: 'sparkles',
    },
    {
      title: 'RTL Support',
      description: 'Full RTL support with logical CSS properties and direction-aware components.',
      icon: 'globe',
    },
    {
      title: 'Accessible',
      description:
        'Built-in accessibility features including a11y widget, semantic HTML, and ARIA support.',
      icon: 'accessibility',
    },
    {
      title: 'Developer Experience',
      description:
        'TypeScript, ESLint, Prettier, hot reload, and comprehensive documentation for rapid development.',
      icon: 'code',
    },
  ],

  // Default FAQs (fallback when API is empty)
  defaultFAQs: [
    {
      slug: 'what-is-this',
      question: 'What is this SPA starter template?',
      answer:
        'This is a production-ready Vite + React 19 template with Zustand for state management, React Router for navigation, and a beautiful UI built with shadcn/ui and Tailwind CSS 4.',
    },
    {
      slug: 'how-to-customize',
      question: 'How do I customize the template?',
      answer:
        'All UI labels are in src/config/site.ts. Styling uses Tailwind CSS with theme tokens in globals.css. Components are in src/components. State management is handled by Zustand stores in src/stores.',
    },
    {
      slug: 'is-it-production-ready',
      question: 'Is this template production-ready?',
      answer:
        'Yes! It includes routing, state management, error boundaries, loading states, SEO with react-helmet-async, accessibility features, and follows best practices for security and performance.',
    },
    {
      slug: 'what-about-support',
      question: 'What kind of support is available?',
      answer:
        'The template includes comprehensive documentation in the docs folder. For issues, please open a GitHub issue. For custom development or enterprise support, contact us.',
    },
  ],
} as const;

export type UILabels = typeof UI_LABELS;
export type Defaults = typeof DEFAULTS;
export type SiteConfig = typeof SITE_CONFIG;
