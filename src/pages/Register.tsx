/**
 * Register Page
 *
 * Registration page for new users.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { staggerContainer, staggerItem } from '@/lib/animations';

/**
 * Register form validation schema
 */
const registerSchema = z
  .object({
    name: z.string().min(2, UI_LABELS.validation.nameRequired),
    email: z.string().email(UI_LABELS.validation.emailInvalid),
    password: z.string().min(8, UI_LABELS.validation.passwordRequired),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: UI_LABELS.validation.passwordMismatch,
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual auth service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration and login
      login(
        {
          id: '1',
          email: data.email,
          name: data.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'mock-jwt-token'
      );

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(UI_LABELS.form.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{UI_LABELS.auth.registerTitle} | {DEFAULTS.siteTitle}</title>
      </Helmet>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{UI_LABELS.auth.registerTitle}</h1>
          <p className="text-muted-foreground">{UI_LABELS.auth.registerSubtitle}</p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            variants={staggerItem}
            className="p-3 rounded-md bg-destructive/10 text-destructive text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          variants={staggerItem}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{UI_LABELS.form.nameLabel}</Label>
            <Input
              id="name"
              type="text"
              placeholder={UI_LABELS.form.namePlaceholder}
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{UI_LABELS.auth.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder={UI_LABELS.form.emailPlaceholder}
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{UI_LABELS.auth.passwordLabel}</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {UI_LABELS.auth.confirmPasswordLabel}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="me-2 size-4 animate-spin" />
                {UI_LABELS.form.submitting}
              </>
            ) : (
              UI_LABELS.auth.registerButton
            )}
          </Button>
        </motion.form>

        {/* Footer */}
        <motion.p
          variants={staggerItem}
          className="text-center text-sm text-muted-foreground"
        >
          {UI_LABELS.auth.hasAccount}{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            {UI_LABELS.auth.loginButton}
          </Link>
        </motion.p>
      </motion.div>
    </>
  );
}

export default Register;
