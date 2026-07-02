/**
 * Central route registry. Never hardcode path strings in components — import
 * from here so a route rename is a single edit.
 */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  missions: '/missions',
  focus: '/focus',
  vault: '/vault',
  analytics: '/analytics',
  coach: '/coach',
  challenges: '/challenges',
  rewards: '/rewards',
  community: '/community',
  calendar: '/calendar',
  arena: '/arena',
  profile: '/profile',
  settings: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
