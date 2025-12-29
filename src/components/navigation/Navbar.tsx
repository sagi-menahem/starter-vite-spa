/**
 * Navbar Component
 *
 * Responsive navigation bar for public pages.
 * Includes logo, navigation links, theme toggle, and auth buttons.
 */

import { Link } from 'react-router-dom';
import { DEFAULTS, UI_LABELS } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          {DEFAULTS.siteTitle}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle variant="cycle" />
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {UI_LABELS.nav.login}
          </Link>
          <Button asChild size="sm">
            <Link to="/register">{DEFAULTS.heroCtaText}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
