import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ServerFeatureGameService } from './server-feature-game.service';
import { IGame } from '@shared/domain';

import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  CreateGameDto,
  GameDto,
  UpdateGameDto,
  UpsertGameDto,
} from '@server/data-access';

@Controller({ path: 'games' })
export class ServerFeatureGameController {
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
  async getAll(): Promise<IGame[]> {
    return this.serverFeatureGameService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IGame> {
    return this.serverFeatureGameService.getOne(id);
  }

  @Post('')
  async create(@Body() data: CreateGameDto): Promise<IGame> {
    return this.serverFeatureGameService.create(data);
  }

  @Put(':id')
  upsertOne(@Body() data: UpsertGameDto): IGame {
    return this.serverFeatureGameService.upsert(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateGameDto
  ): Promise<IGame> {
    return this.serverFeatureGameService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.serverFeatureGameService.delete(id);
  }
}
