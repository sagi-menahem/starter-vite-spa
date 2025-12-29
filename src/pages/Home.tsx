/**
 * Home Page
 *
 * Public landing page for the application.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DEFAULTS } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Navbar, Footer } from '@/components/navigation';
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/lib/animations';

/**
 * Feature card data
 */
const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on Vite 6 with instant hot reloads and optimized builds.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Route guards, protected routes, and security best practices.',
  },
  {
    icon: Sparkles,
    title: 'Beautiful UI',
    description: 'Crafted with shadcn/ui, Tailwind CSS, and Framer Motion.',
  },
];

export function Home() {
  return (
    <>
      <Helmet>
        <title>{DEFAULTS.siteTitle}</title>
        <meta name="description" content={DEFAULTS.siteDescription} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Navbar />

        {/* Hero Section */}
        <section className="flex-1 flex items-center py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                variants={staggerItem}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                {DEFAULTS.heroHeadline}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="mt-6 text-lg md:text-xl text-muted-foreground"
              >
                {DEFAULTS.heroSubheadline}
              </motion.p>
              <motion.div
                variants={staggerItem}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg">
                  <Link to="/register">
                    {DEFAULTS.heroCtaText}
                    <ArrowRight className="ms-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={DEFAULTS.heroSecondaryCtaLink}>
                    {DEFAULTS.heroSecondaryCtaText}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-12"
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-bold"
              >
                {DEFAULTS.featuresTitle}
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mt-4 text-lg text-muted-foreground"
              >
                {DEFAULTS.featuresSubtitle}
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid gap-8 md:grid-cols-3"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  className="bg-card border rounded-xl p-6 text-center"
                >
                  <div className="size-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
