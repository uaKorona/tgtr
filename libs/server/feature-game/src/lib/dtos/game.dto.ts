import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ICreateGame, IUpdateTodo, IUpsertTodo } from '@shared/domain';

export class CreateGameDto implements ICreateGame {
  @IsString()
  @IsNotEmpty()
  playerDarkName!: string;

  @IsString()
  @IsNotEmpty()
  playerLightName!: string;
}

export class UpsertGameDto implements IUpsertTodo {
  @IsString()
  @IsNotEmpty()
  playerDarkName!: string;

  @IsString()
  @IsNotEmpty()
  playerLightName!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsObject()
  @IsNotEmpty()
  battlefields!: Record<string, unknown>;

  @IsObject()
  @IsNotEmpty()
  roads!: Record<string, unknown>;
}

export class UpdateGameDto implements IUpdateTodo {
  @IsString()
  @IsOptional()
  playerDarkName!: string;

  @IsString()
  @IsOptional()
  playerLightName!: string;

  @IsObject()
  @IsOptional()
  battlefields!: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  roads!: Record<string, unknown>;
}
