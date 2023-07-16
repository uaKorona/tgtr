import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntitySchema } from './schemas/game.entity-schema';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntitySchema])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
