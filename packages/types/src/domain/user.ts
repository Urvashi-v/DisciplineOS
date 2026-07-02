import type { Timestamps } from '../common/api';
import type { PlanTier, UserRole } from '../enums/platform.enums';

/**
 * Canonical user record. `User` is the private, server-side shape; `PublicUser`
 * is the safe projection exposed to other users (e.g. in the Focus Arena).
 */
export interface User extends Timestamps {
  id: string;
  email: string;
  role: UserRole;
  planTier: PlanTier;
  emailVerified: boolean;
  profile: UserProfile;
}

export interface UserProfile {
  displayName: string;
  username: string;
  avatarUrl: string | null;
  timezone: string;
  bio: string | null;
}

/** Fields safe to expose publicly — never includes email or role. */
export interface PublicUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

/** The authenticated session's view of the current user. */
export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  planTier: PlanTier;
  displayName: string;
  username: string;
  avatarUrl: string | null;
}
