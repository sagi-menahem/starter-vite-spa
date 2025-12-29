/**
 * DashboardLayout Component
 *
 * Layout wrapper for dashboard/protected pages.
 * Includes sidebar navigation and header with user menu.
 */

import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { useAuthStore } from '@/stores/auth.store';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

/**
 * Navigation items for the sidebar
 */
const navItems = [
  {
    label: UI_LABELS.nav.dashboard,
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: UI_LABELS.nav.settings,
    href: '/dashboard/settings',
    icon: Settings,
  },
];

/**
 * Dashboard loading fallback
 */
function DashboardLoadingFallback() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

/**
 * Sidebar component
 */
function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 start-0 z-50 h-full w-64 bg-sidebar border-e transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link
            to="/dashboard"
            className="text-lg font-bold text-sidebar-foreground"
          >
            {DEFAULTS.siteTitle}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
            aria-label={UI_LABELS.common.close}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/**
 * Dashboard header component
 */
function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label={UI_LABELS.nav.toggleMenu}
      >
        <Menu className="size-5" />
      </Button>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <ThemeToggle variant="cycle" />

        {/* User menu */}
        <div className="relative">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="size-4 text-primary" />
          </div>
          <span className="hidden sm:inline-block text-sm font-medium">
            {user?.name || user?.email || 'User'}
          </span>
          <ChevronDown className="size-4" />
        </Button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {showUserMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />

              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute end-0 mt-2 w-48 bg-popover border rounded-md shadow-lg z-50"
              >
                <div className="p-2">
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="size-4" />
                    {UI_LABELS.nav.settings}
                  </Link>
                  <Separator className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-destructive"
                  >
                    <LogOut className="size-4" />
                    {UI_LABELS.nav.logout}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<DashboardLoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
