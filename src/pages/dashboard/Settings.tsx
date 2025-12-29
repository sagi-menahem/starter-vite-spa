/**
 * Settings Page
 *
 * User settings and preferences.
 */

import { motion } from 'framer-motion';
import { User, Bell, CreditCard } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { useAuthStore } from '@/stores/auth.store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';

export function Settings() {
  const { user } = useAuthStore();

  return (
    <>
      <Helmet>
        <title>{UI_LABELS.settings.title} | {DEFAULTS.siteTitle}</title>
      </Helmet>

      <div className="p-6 space-y-8 max-w-4xl">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={staggerItem} className="text-3xl font-bold">
            {UI_LABELS.settings.title}
          </motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground mt-1">
            Manage your account settings and preferences.
          </motion.p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="size-5 text-muted-foreground" />
                  <CardTitle>{UI_LABELS.settings.profile}</CardTitle>
                </div>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{UI_LABELS.form.nameLabel}</Label>
                    <Input
                      id="name"
                      defaultValue={user?.name || ''}
                      placeholder={UI_LABELS.form.namePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{UI_LABELS.auth.emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || ''}
                      placeholder={UI_LABELS.form.emailPlaceholder}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>{UI_LABELS.settings.updateProfile}</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="size-5 text-muted-foreground" />
                  <CardTitle>{UI_LABELS.settings.notifications}</CardTitle>
                </div>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Notification settings coming soon.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Billing Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="size-5 text-muted-foreground" />
                  <CardTitle>{UI_LABELS.settings.billing}</CardTitle>
                </div>
                <CardDescription>
                  Manage your subscription and payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{UI_LABELS.billing.currentPlan}</p>
                    <p className="text-sm text-muted-foreground">Free Plan</p>
                  </div>
                  <Button variant="outline">{UI_LABELS.billing.upgradeNow}</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Settings;
