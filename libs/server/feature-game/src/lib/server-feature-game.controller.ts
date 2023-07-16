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
import { CreateGameDto, UpdateGameDto, UpsertGameDto } from './dtos/game.dto';

@Controller({ path: 'games' })
export class ServerFeatureGameController {
  constructor(private serverFeatureGameService: ServerFeatureGameService) {}

  @Get('')
  getAll(): Promise<IGame[]> {
    return this.serverFeatureGameService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IGame> {
    return this.serverFeatureGameService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateGameDto): Promise<IGame> {
    return this.serverFeatureGameService.create(data);
  }

  @Put(':id')
  upsertOne(@Body() data: UpsertGameDto): IGame {
    return this.serverFeatureGameService.upsert(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateGameDto): IGame {
    return this.serverFeatureGameService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.serverFeatureGameService.delete(id);
  }
}
