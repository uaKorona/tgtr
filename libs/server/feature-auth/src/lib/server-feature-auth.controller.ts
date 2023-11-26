import { BadRequestException, Body, Controller, Get } from '@nestjs/common';
import { ServerFeatureAuthService } from './server-feature-auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from '@server/data-access';
import { ITokenResponse } from '@shared/domain';
import { SkipAuth } from '@server/util';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Authentication')
export class ServerFeatureAuthController {
  constructor(private serverFeatureAuthService: ServerFeatureAuthService) {}

  @Get('login')
  @SkipAuth()
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  async login(
    @Body() { email, password }: LoginRequestDto
  ): Promise<ITokenResponse> {
    const user = await this.serverFeatureAuthService.validateUser(
      email,
      password
    );
    if (!user) {
      throw new BadRequestException(`Email or password is invalid`);
    }
    return await this.serverFeatureAuthService.generateAccessToken(user);
  }
}
