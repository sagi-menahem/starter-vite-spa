/**
 * SEO Component
 *
 * Reusable wrapper for react-helmet-async.
 * Provides consistent SEO meta tags across pages.
 */

import { Helmet } from 'react-helmet-async';
import { DEFAULTS, SITE_CONFIG } from '@/config/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function SEO({
  title,
  description = DEFAULTS.siteDescription,
  image,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const pageTitle = title
    ? `${title} | ${DEFAULTS.siteTitle}`
    : DEFAULTS.siteTitle;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <html lang={SITE_CONFIG.language} dir={SITE_CONFIG.direction} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#3b82f6" />
    </Helmet>
  );
}

export default SEO;
