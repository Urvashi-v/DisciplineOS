import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

import { type HealthReport, HealthService } from './health.service';

/** Unversioned, unprefixed liveness/readiness probe at `GET /health`. */
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  check(): Promise<HealthReport> {
    return this.health.check();
  }
}
