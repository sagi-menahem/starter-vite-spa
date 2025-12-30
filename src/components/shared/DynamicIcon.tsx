/**
 * DynamicIcon Component
 *
 * Renders Lucide icons dynamically based on icon name strings.
 * Uses a whitelist approach for tree-shaking optimization.
 *
 * Usage:
 *   <DynamicIcon name="zap" size={24} className="text-primary" />
 *   <DynamicIcon name="arrow-right" /> // kebab-case supported
 */

import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  // Common UI icons
  Star,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Menu,
  Search,
  Settings,
  User,
  Users,
  LogOut,
  LogIn,
  ExternalLink,
  Copy,
  Trash,
  Edit,
  Eye,
  EyeOff,

  // Feature / Marketing icons
  Zap,
  Rocket,
  Shield,
  Lock,
  Unlock,
  Sparkles,
  Target,
  Trophy,
  Award,
  Crown,
  Heart,
  ThumbsUp,
  Flame,
  Bolt,
  Sun,
  Moon,

  // Content icons
  Pencil,
  Palette,
  Image,
  FileText,
  Book,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Quote,

  // Tech / Developer icons
  Code,
  Terminal,
  Globe,
  Server,
  Database,
  Cloud,
  Cpu,
  Layers,
  Box,
  Package,
  GitBranch,
  Github,

  // Communication icons
  Mail,
  Phone,
  Send,
  Bell,
  BellRing,
  Inbox,

  // Business icons
  Building,
  Briefcase,
  CreditCard,
  DollarSign,
  TrendingUp,
  BarChart,
  PieChart,
  LineChart,

  // Time / Status icons
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  XCircle,
  Loader,

  // Navigation / Layout
  Home,
  LayoutDashboard,
  LayoutGrid,
  List,
  Grid,
  Sidebar,
  PanelLeft,

  // Accessibility
  Accessibility,
  Contrast,
  Type,
  Link,
} from 'lucide-react';

/**
 * Icon whitelist mapping for tree-shaking optimization.
 * Only icons listed here will be included in the bundle.
 *
 * Keys are kebab-case for CMS compatibility.
 * Add new icons here as needed.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  // Common UI
  star: Star,
  check: Check,
  x: X,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  plus: Plus,
  minus: Minus,
  menu: Menu,
  search: Search,
  settings: Settings,
  user: User,
  users: Users,
  'log-out': LogOut,
  'log-in': LogIn,
  'external-link': ExternalLink,
  copy: Copy,
  trash: Trash,
  edit: Edit,
  eye: Eye,
  'eye-off': EyeOff,

  // Feature / Marketing
  zap: Zap,
  rocket: Rocket,
  shield: Shield,
  lock: Lock,
  unlock: Unlock,
  sparkles: Sparkles,
  target: Target,
  trophy: Trophy,
  award: Award,
  crown: Crown,
  heart: Heart,
  'thumbs-up': ThumbsUp,
  flame: Flame,
  bolt: Bolt,
  sun: Sun,
  moon: Moon,

  // Content
  pencil: Pencil,
  palette: Palette,
  image: Image,
  'file-text': FileText,
  book: Book,
  lightbulb: Lightbulb,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  quote: Quote,

  // Tech / Developer
  code: Code,
  terminal: Terminal,
  globe: Globe,
  server: Server,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
  layers: Layers,
  box: Box,
  package: Package,
  'git-branch': GitBranch,
  github: Github,

  // Communication
  mail: Mail,
  phone: Phone,
  send: Send,
  bell: Bell,
  'bell-ring': BellRing,
  inbox: Inbox,

  // Business
  building: Building,
  briefcase: Briefcase,
  'credit-card': CreditCard,
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  'bar-chart': BarChart,
  'pie-chart': PieChart,
  'line-chart': LineChart,

  // Time / Status
  clock: Clock,
  calendar: Calendar,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  info: Info,
  'help-circle': HelpCircle,
  'x-circle': XCircle,
  loader: Loader,

  // Navigation / Layout
  home: Home,
  'layout-dashboard': LayoutDashboard,
  'layout-grid': LayoutGrid,
  list: List,
  grid: Grid,
  sidebar: Sidebar,
  'panel-left': PanelLeft,

  // Accessibility
  accessibility: Accessibility,
  contrast: Contrast,
  type: Type,
  link: Link,
};

/**
 * List of all available icon names for documentation/validation.
 */
export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

/**
 * Normalize icon name to kebab-case key.
 * Handles PascalCase, camelCase, and already kebab-case inputs.
 */
function normalizeIconName(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  /** Icon name in kebab-case, camelCase, or PascalCase */
  name: string;
  /** Fallback icon name if the requested icon is not found */
  fallback?: string;
}

/**
 * DynamicIcon Component
 *
 * Renders a Lucide icon based on a string name.
 * Supports kebab-case, camelCase, and PascalCase icon names.
 */
export function DynamicIcon({
  name,
  fallback = 'star',
  size = 24,
  ...props
}: DynamicIconProps) {
  const normalizedName = normalizeIconName(name);
  let IconComponent = ICON_MAP[normalizedName];

  // Try fallback if icon not found
  if (!IconComponent) {
    if (import.meta.env.DEV) {
      console.warn(
        `[DynamicIcon] Icon "${name}" not found in whitelist. Using fallback "${fallback}".`,
        '\nAvailable icons:',
        AVAILABLE_ICONS.join(', ')
      );
    }
    IconComponent = ICON_MAP[normalizeIconName(fallback)] || Star;
  }

  return <IconComponent size={size} {...props} />;
}

export default DynamicIcon;
