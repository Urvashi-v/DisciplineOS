import {
  BarChart3,
  Bot,
  CalendarDays,
  Gift,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Settings,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

import { ROUTES } from './routes';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Primary sidebar navigation — order and labels match the approved design. */
export const navItems: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: 'Missions', href: ROUTES.missions, icon: Target },
  { label: 'Focus Mode', href: ROUTES.focus, icon: Zap },
  { label: 'Commitment Vault', href: ROUTES.vault, icon: Lock },
  { label: 'Analytics', href: ROUTES.analytics, icon: BarChart3 },
  { label: 'AI Coach', href: ROUTES.coach, icon: Bot },
  { label: 'Challenges', href: ROUTES.challenges, icon: Trophy },
  { label: 'Rewards', href: ROUTES.rewards, icon: Gift },
  { label: 'Community', href: ROUTES.community, icon: Users },
  { label: 'Calendar', href: ROUTES.calendar, icon: CalendarDays },
];

export const settingsNavItem: NavItem = {
  label: 'Settings',
  href: ROUTES.settings,
  icon: Settings,
};
