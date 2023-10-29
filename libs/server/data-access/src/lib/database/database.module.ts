import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntitySchema } from './schemas/game.entity-schema';
import { UserEntitySchema } from './schemas/user.entity-schema';


@Module({
  imports: [TypeOrmModule.forFeature([GameEntitySchema, UserEntitySchema])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
