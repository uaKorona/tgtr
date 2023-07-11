import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { IGame } from '@shared/domain';

export class CreateGameDto
  implements Pick<IGame, 'playerDarkName' | 'playerLightName'>
{
  @IsString()
  @IsNotEmpty()
  playerDarkName!: string;

  @IsString()
  @IsNotEmpty()
  playerLightName!: string;
}

export class UpsertGameDto implements IGame {
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

export class UpdateGameDto implements Partial<Omit<IGame, 'id'>> {
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
