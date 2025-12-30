/**
 * SEO Component
 *
 * Reusable wrapper for react-helmet-async.
 * Provides consistent SEO meta tags across pages.
 */

import { Helmet } from 'react-helmet-async';
import { DEFAULTS, SITE_CONFIG } from '@/config/site';
import { ENV } from '@/config/env';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

// Default OG image path (relative to public folder)
const DEFAULT_OG_IMAGE = '/images/og-image.png';

export function SEO({
  title,
  description = DEFAULTS.siteDescription,
  image,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${DEFAULTS.siteTitle}` : DEFAULTS.siteTitle;

  // Build absolute URLs for SEO
  const siteUrl = ENV.APP_URL.replace(/\/$/, ''); // Remove trailing slash
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${DEFAULT_OG_IMAGE}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <html lang={SITE_CONFIG.language} dir={SITE_CONFIG.direction} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={DEFAULTS.siteTitle} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#3b82f6" />

      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Helmet>
  );
}

export default SEO;
