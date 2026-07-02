import {
  BarChart3,
  Bot,
  LayoutDashboard,
  type LucideIcon,
  Swords,
  Target,
  Timer,
  Trophy,
  User,
  Vault,
} from 'lucide-react';

import { ROUTES } from './routes';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Marks a route as gated behind the Premium plan. */
  premium?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Focus',
    items: [
      { label: 'Dashboard', href: ROUTES.dashboard, icon: LayoutDashboard },
      { label: 'Missions', href: ROUTES.missions, icon: Target },
      { label: 'Focus Mode', href: ROUTES.focus, icon: Timer },
      { label: 'Commitment Vault', href: ROUTES.vault, icon: Vault },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'AI Coach', href: ROUTES.coach, icon: Bot, premium: true },
      { label: 'Analytics', href: ROUTES.analytics, icon: BarChart3 },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Challenges', href: ROUTES.challenges, icon: Trophy },
      { label: 'Focus Arena', href: ROUTES.arena, icon: Swords },
      { label: 'Profile', href: ROUTES.profile, icon: User },
    ],
  },
];
