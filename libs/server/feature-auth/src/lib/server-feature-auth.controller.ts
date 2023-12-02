import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
} from '@nestjs/common';
import { ServerFeatureAuthService } from './server-feature-auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from '@server/data-access';
import { ITokenResponse } from '@shared/domain';
import { SkipAuth } from '@server/util';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Authentication')
export class ServerFeatureAuthController {
  constructor(private serverFeatureAuthService: ServerFeatureAuthService) {}

  @Post('login')
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @HttpCode(200)
  @SkipAuth()
  async login(
    @Body() { email, password }: LoginRequestDto
  ): Promise<ITokenResponse> {
    Logger.log(`USER: ${email} - ${password}}`);
    const user = await this.serverFeatureAuthService.validateUser(
      email,
      password
    );

    if (!user) {
      Logger.error(`Email or password is invalid: ${email} - ${password}}`);
      throw new BadRequestException(`Email or password is invalid`);
    }

    Logger.log(`generateAccessToken for USER ID: ${user.id}}`);
    return await this.serverFeatureAuthService.generateAccessToken(user);
  }
}
