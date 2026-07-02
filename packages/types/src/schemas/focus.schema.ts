import { z } from 'zod';

export const startFocusSessionSchema = z.object({
  missionId: z.string().cuid().optional(),
  plannedMinutes: z.coerce.number().int().min(1).max(240).default(25),
});

export const completeFocusSessionSchema = z.object({
  actualSeconds: z.coerce.number().int().min(0),
  interruptions: z.coerce.number().int().min(0).default(0),
});

export type StartFocusSessionInput = z.infer<typeof startFocusSessionSchema>;
export type CompleteFocusSessionInput = z.infer<typeof completeFocusSessionSchema>;
