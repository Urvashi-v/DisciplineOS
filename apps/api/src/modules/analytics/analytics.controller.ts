import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { AnalyticsService } from './analytics.service';

@UseGuards(DevUserGuard)
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get('overview')
  overview(@CurrentUserId() userId: string) {
    return this.analytics.getOverview(userId);
  }

  @Get('discipline-score')
  disciplineScore(@CurrentUserId() userId: string) {
    return this.analytics.getDisciplineScore(userId);
  }

  @Get('charts')
  charts(@CurrentUserId() userId: string) {
    return this.analytics.getCharts(userId);
  }
}
