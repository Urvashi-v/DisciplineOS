import type {
  CompleteFocusSessionInput,
  FocusSession,
  StartFocusSessionInput,
} from '@disciplineos/types';

import { http } from '@/lib/http';

export const focusService = {
  active(): Promise<FocusSession | null> {
    return http.get<FocusSession | null>('focus-sessions/active');
  },
  start(input: StartFocusSessionInput): Promise<FocusSession> {
    return http.post<FocusSession>('focus-sessions', input);
  },
  complete(id: string, input: CompleteFocusSessionInput): Promise<FocusSession> {
    return http.post<FocusSession>(`focus-sessions/${id}/complete`, input);
  },
};
