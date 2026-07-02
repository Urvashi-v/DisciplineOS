import {
  MISSION_DESCRIPTION_MAX,
  MISSION_DURATION_MAX,
  MISSION_DURATION_MIN,
  MISSION_TITLE_MAX,
  MISSION_TITLE_MIN,
  Priority,
} from '@disciplineos/types';
import { z } from 'zod';

/**
 * Form-facing schema for the Create Mission dialog. It mirrors the API's
 * `createMissionSchema` but keeps `deadline` as the raw `datetime-local` string
 * the input produces; the submit handler converts it to ISO before calling the
 * service. Reusing the shared length/range constants keeps the two in lockstep.
 */
export const missionFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MISSION_TITLE_MIN, 'Title must be at least 2 characters')
    .max(MISSION_TITLE_MAX, 'Title must be at most 120 characters'),
  description: z.string().trim().max(MISSION_DESCRIPTION_MAX, 'Description is too long').optional(),
  priority: z.nativeEnum(Priority),
  durationMinutes: z
    .number({ invalid_type_error: 'Enter a duration in minutes' })
    .int('Duration must be a whole number')
    .min(MISSION_DURATION_MIN, 'Minimum duration is 5 minutes')
    .max(MISSION_DURATION_MAX, 'Maximum duration is 24 hours'),
  deadline: z.string().optional(),
});

export type MissionFormValues = z.infer<typeof missionFormSchema>;
