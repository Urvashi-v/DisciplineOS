import type { CompleteFocusSessionInput, StartFocusSessionInput } from '@disciplineos/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { analyticsKeys } from '@/features/analytics';

import { focusService } from '../services/focus.service';

export const focusKeys = {
  all: ['focus'] as const,
  active: () => [...focusKeys.all, 'active'] as const,
};

export function useStartFocus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: StartFocusSessionInput) => focusService.start(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: focusKeys.active() }),
  });
}

export function useCompleteFocus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; input: CompleteFocusSessionInput }) =>
      focusService.complete(payload.id, payload.input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: focusKeys.active() });
      void queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    },
  });
}
