import type { CreateMissionInput, MissionTransition } from '@disciplineos/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/errors';

import { missionKeys } from '../constants/mission.constants';
import { missionService } from '../services/mission.service';

/** Creates a mission and refreshes every mission list on success. */
export function useCreateMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateMissionInput) => missionService.create(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: missionKeys.all });
      toast.success('Mission created');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

/** Drives a mission through a lifecycle transition (activate/complete/abandon). */
export function useMissionTransition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, transition }: { id: string; transition: MissionTransition }) =>
      missionService.transition(id, transition),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: missionKeys.all });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

/** Deletes a mission and refreshes the lists. */
export function useDeleteMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => missionService.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: missionKeys.all });
      toast.success('Mission deleted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
