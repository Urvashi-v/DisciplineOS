import type { ApiErrorResponse } from '@disciplineos/types';
import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface NormalizedError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Converts any thrown error into the shared `ApiErrorResponse` envelope. 5xx
 * errors are logged with their stack; their details are never leaked to clients.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const normalized = this.normalize(exception, status);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} -> ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: normalized.code,
        message: normalized.message,
        ...(normalized.fieldErrors ? { fieldErrors: normalized.fieldErrors } : {}),
      },
    };

    response.status(status).json(body);
  }

  private normalize(exception: unknown, status: number): NormalizedError {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'string') {
        return { code: this.codeFromStatus(status), message: res };
      }

      if (typeof res === 'object' && res !== null) {
        const record = res as Record<string, unknown>;
        const rawMessage = record.message;
        const message =
          typeof rawMessage === 'string'
            ? rawMessage
            : Array.isArray(rawMessage)
              ? rawMessage.join(', ')
              : exception.message;
        const code = typeof record.code === 'string' ? record.code : this.codeFromStatus(status);
        const fieldErrors = record.fieldErrors as Record<string, string[]> | undefined;
        return { code, message, fieldErrors };
      }
    }

    return {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong. Please try again.',
    };
  }

  private codeFromStatus(status: number): string {
    const entry = Object.entries(HttpStatus).find(([, value]) => value === status);
    return entry ? entry[0] : 'ERROR';
  }
}
