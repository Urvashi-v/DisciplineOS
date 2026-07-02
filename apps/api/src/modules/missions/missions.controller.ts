import {
  type CreateMissionInput,
  createMissionSchema,
  type MissionFilter,
  missionFilterSchema,
  type UpdateMissionInput,
  updateMissionSchema,
} from '@disciplineos/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUserId } from '../../common/auth/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { DevUserGuard } from '../auth/dev-user.guard';
import { MissionsService } from './missions.service';

@UseGuards(DevUserGuard)
@Controller({ path: 'missions', version: '1' })
export class MissionsController {
  constructor(private readonly missions: MissionsService) {}

  @Post()
  create(
    @CurrentUserId() userId: string,
    @Body(new ZodValidationPipe(createMissionSchema)) dto: CreateMissionInput,
  ) {
    return this.missions.create(userId, dto);
  }

  @Get()
  findMany(
    @CurrentUserId() userId: string,
    @Query(new ZodValidationPipe(missionFilterSchema)) filter: MissionFilter,
  ) {
    return this.missions.findMany(userId, filter);
  }

  @Get('today')
  today(@CurrentUserId() userId: string) {
    return this.missions.findToday(userId);
  }

  @Get('upcoming')
  upcoming(@CurrentUserId() userId: string) {
    return this.missions.findUpcoming(userId);
  }

  @Get(':id')
  findOne(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.missions.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateMissionSchema)) dto: UpdateMissionInput,
  ) {
    return this.missions.update(userId, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.missions.remove(userId, id);
  }

  @Post(':id/activate')
  activate(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.missions.transition(userId, id, 'activate');
  }

  @Post(':id/complete')
  complete(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.missions.transition(userId, id, 'complete');
  }

  @Post(':id/abandon')
  abandon(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.missions.transition(userId, id, 'abandon');
  }
}
