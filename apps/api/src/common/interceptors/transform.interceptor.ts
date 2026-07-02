import type { ApiSuccess } from '@disciplineos/types';
import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { map, type Observable } from 'rxjs';

/**
 * Wraps every successful controller result in the shared `ApiSuccess` envelope
 * so clients always receive `{ success: true, data }`.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiSuccess<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiSuccess<T>> {
    return next.handle().pipe(map((data) => ({ success: true as const, data })));
  }
}
