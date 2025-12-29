/**
 * Dashboard Page
 *
 * Main dashboard view for authenticated users.
 */

import { motion } from 'framer-motion';
import { Activity, Users, CreditCard, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { useAuthStore } from '@/stores/auth.store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';

/**
 * Stats card data
 */
const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: CreditCard,
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: '+180.1% from last month',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19% from last month',
    icon: TrendingUp,
  },
  {
    title: 'Active Now',
    value: '+573',
    change: '+201 since last hour',
    icon: Activity,
  },
];

export function Dashboard() {
  const { user } = useAuthStore();

  return (
    <>
      <Helmet>
        <title>{UI_LABELS.nav.dashboard} | {DEFAULTS.siteTitle}</title>
      </Helmet>

      <div className="p-6 space-y-8">
        {/* Welcome header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={staggerItem} className="text-3xl font-bold">
            {UI_LABELS.dashboard.welcome}, {user?.name || 'User'}
          </motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground mt-1">
            Here's what's happening with your account today.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={staggerItem}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent activity section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>{UI_LABELS.dashboard.recentActivity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  {UI_LABELS.dashboard.noActivity}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
