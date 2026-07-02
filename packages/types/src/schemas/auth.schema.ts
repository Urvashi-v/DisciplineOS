import { z } from 'zod';

/**
 * Auth validation schemas — the single source of truth shared by the web forms
 * (React Hook Form resolver) and the API (NestJS validation pipe). Defining them
 * once guarantees the client and server enforce identical rules.
 */

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be at most 72 characters')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Enter a valid email address')
  .max(255)
  .toLowerCase()
  .trim();

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    displayName: z.string().min(2, 'Name must be at least 2 characters').max(60).trim(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms to continue' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

/** Payload sent to the API — the confirm/terms fields never leave the client. */
export const registerPayloadSchema = registerSchema.transform(
  ({ displayName, email, password }) => ({ displayName, email, password }),
);
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
