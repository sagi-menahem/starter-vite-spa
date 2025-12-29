/**
 * Footer Component
 *
 * Site-wide footer with copyright and optional links.
 */

import { DEFAULTS, UI_LABELS } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {DEFAULTS.siteTitle}.{' '}
          {UI_LABELS.footer.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
