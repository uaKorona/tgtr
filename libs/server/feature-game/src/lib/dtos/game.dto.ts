import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ICreateGame, IGame, IUpdateTodo, IUpsertTodo } from '@shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class GameDto implements IGame {
  @ApiProperty({
    type: String,
    example: `Player 1 Artem`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  playerDarkName!: string;

  @ApiProperty({
    type: String,
    example: `Player 2 Roman`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  playerLightName!: string;

  @ApiProperty({
    type: String,
    example: `DCA76BCC-F6CD-4211-A9F5-CD4E24381EC8`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    type: Object,
    example: `{}`,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  battlefields!: Record<string, unknown>;

  @ApiProperty({
    type: Object,
    example: `{}`,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  roads!: Record<string, unknown>;
}

export class CreateGameDto implements ICreateGame {
  @ApiProperty({
    type: String,
    example: `Player 1 Artem`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  playerDarkName!: string;

  @ApiProperty({
    type: String,
    example: `Player 2 Roman`,
    required: true,
  })
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
