import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ServerFeatureGameService } from './server-feature-game.service';
import { IGame } from '@shared/domain';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateGameDto,
  GameDto,
  UpdateGameDto,
  UpsertGameDto,
} from '@server/data-access';
import { ReqUserId } from '@server/util';

@Controller({ path: 'games', version: '1' })
@ApiTags('Games')
@ApiBearerAuth()
export class ServerFeatureGameController {
  private readonly logger = new Logger(ServerFeatureGameController.name);

  constructor(private serverFeatureGameService: ServerFeatureGameService) {}

  @Get('')
  @ApiOkResponse({
    type: GameDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Returns all games',
    tags: ['games'],
  })
  async getAll(@ReqUserId() userId: string): Promise<IGame[]> {
    return this.serverFeatureGameService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @ReqUserId() userId: string,
    @Param('id') id: string
  ): Promise<IGame> {
    return this.serverFeatureGameService.getOne(userId, id);
  }

  @Post('')
  async create(
    @ReqUserId() userId: string,
    @Body() data: CreateGameDto
  ): Promise<IGame> {
    return this.serverFeatureGameService.create(userId, data);
  }

  @Put(':id')
  @ApiOkResponse({
    type: GameDto,
  })
  @ApiCreatedResponse({
    type: GameDto,
  })
  @ApiOperation({
    summary: 'Replaces all values for a single game',
    tags: ['games'],
  })
  upsertOne(
    @ReqUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpsertGameDto
  ): Promise<IGame> {
    this.logger.debug(
      `User ${userId.split('-')[0]} attempting to update game ${
        id.split('-')[0]
      }`
    );

    return this.serverFeatureGameService.upsert(userId, id, data);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: GameDto,
  })
  @ApiOperation({
    summary: 'Partially updates a single game',
    tags: ['games'],
  })
  async update(
    @ReqUserId() userId: string,
    @Param('id') id: string,
    @Body() data: UpdateGameDto
  ): Promise<IGame> {
    return this.serverFeatureGameService.update(userId, id, data);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    type: undefined,
  })
  @ApiOperation({
    summary: 'Deletes a specific game item',
    tags: ['games'],
  })
  @HttpCode(204)
  async delete(
    @ReqUserId() userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.serverFeatureGameService.delete(userId, id);
  }
}
