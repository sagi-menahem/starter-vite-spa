/**
 * NotFound Page (404)
 *
 * Displayed when a route doesn't exist.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';

export function NotFound() {
  const { notFound } = UI_LABELS.errors;

  return (
    <>
      <Helmet>
        <title>{notFound.title} | {DEFAULTS.siteTitle}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-md"
        >
          {/* 404 Number */}
          <h1 className="text-9xl font-bold text-muted-foreground/20">
            {notFound.heading}
          </h1>

          {/* Title */}
          <h2 className="text-2xl font-bold mt-4">{notFound.title}</h2>

          {/* Description */}
          <p className="text-muted-foreground mt-2">{notFound.description}</p>

          {/* Action button */}
          <Button asChild className="mt-8">
            <Link to="/">
              <Home className="me-2 size-4" />
              {notFound.returnHome}
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
}

export default NotFound;
