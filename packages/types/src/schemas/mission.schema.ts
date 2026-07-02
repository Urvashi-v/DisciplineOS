import { z } from 'zod';

import { MissionStatus, Priority } from '../enums/mission.enums';

/**
 * Mission validation — shared by the API (validation pipe) and the web app.
 * Dates cross the wire as ISO strings; the web form maps its local inputs to
 * these shapes before submitting.
 */

export const MISSION_TITLE_MIN = 2;
export const MISSION_TITLE_MAX = 120;
export const MISSION_DESCRIPTION_MAX = 2000;
export const MISSION_DURATION_MIN = 5;
export const MISSION_DURATION_MAX = 1440;

const optionalIsoDateTime = z
  .string()
  .datetime({ offset: true, message: 'Must be a valid date and time' })
  .optional();

export const createMissionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MISSION_TITLE_MIN, 'Title must be at least 2 characters')
    .max(MISSION_TITLE_MAX, 'Title must be at most 120 characters'),
  description: z.string().trim().max(MISSION_DESCRIPTION_MAX, 'Description is too long').optional(),
  priority: z.nativeEnum(Priority).default(Priority.Medium),
  durationMinutes: z.coerce
    .number()
    .int('Duration must be a whole number of minutes')
    .min(MISSION_DURATION_MIN, 'Minimum duration is 5 minutes')
    .max(MISSION_DURATION_MAX, 'Maximum duration is 24 hours'),
  tags: z.array(z.string().trim().min(1).max(24)).max(6).optional(),
  deadline: optionalIsoDateTime,
  scheduledFor: optionalIsoDateTime,
});

export const updateMissionSchema = createMissionSchema.partial().extend({
  status: z.nativeEnum(MissionStatus).optional(),
  progress: z.coerce.number().int().min(0).max(100).optional(),
});

export const missionFilterSchema = z.object({
  status: z.nativeEnum(MissionStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateMissionInput = z.infer<typeof createMissionSchema>;
export type UpdateMissionInput = z.infer<typeof updateMissionSchema>;
export type MissionFilter = z.infer<typeof missionFilterSchema>;
