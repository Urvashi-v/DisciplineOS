import { BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';
import { type ZodError, type ZodSchema } from 'zod';

/**
 * Validates and parses request payloads against a Zod schema — the same schemas
 * the web app uses. Usage:
 *
 *   @Post()
 *   login(@Body(new ZodValidationPipe(loginSchema)) dto: LoginInput) { ... }
 *
 * On failure it throws a BadRequestException carrying field-level errors, which
 * the global exception filter serialises into the standard error envelope.
 */
@Injectable()
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        fieldErrors: flattenZodError(result.error),
      });
    }

    return result.data;
  }
}

function flattenZodError(error: ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const path = issue.path.join('.') || '_root';
    (fieldErrors[path] ??= []).push(issue.message);
  }

  return fieldErrors;
}
