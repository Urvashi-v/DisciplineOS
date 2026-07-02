import {
  type CompleteFocusSessionInput,
  completeFocusSessionSchema,
  type StartFocusSessionInput,
  startFocusSessionSchema,
} from '@disciplineos/types';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { DevUserGuard } from '../auth/dev-user.guard';
import { FocusService } from './focus.service';

@UseGuards(DevUserGuard)
@Controller({ path: 'focus-sessions', version: '1' })
export class FocusController {
  constructor(private readonly focus: FocusService) {}

  @Get('active')
  active(@CurrentUserId() userId: string) {
    return this.focus.findActive(userId);
  }

  @Post()
  start(
    @CurrentUserId() userId: string,
    @Body(new ZodValidationPipe(startFocusSessionSchema)) dto: StartFocusSessionInput,
  ) {
    return this.focus.start(userId, dto);
  }

  @Post(':id/complete')
  complete(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(completeFocusSessionSchema)) dto: CompleteFocusSessionInput,
  ) {
    return this.focus.complete(userId, id, dto);
  }
}
