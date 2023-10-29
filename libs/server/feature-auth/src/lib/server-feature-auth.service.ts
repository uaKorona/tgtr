import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { ServerFeatureUserService } from '@server/feature-user';
import { JwtService } from '@nestjs/jwt';
import { IPublicUserData, ITokenResponse } from '@shared/domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ServerFeatureAuthService {
  private readonly logger = new Logger(ServerFeatureAuthService.name);

  constructor(
    @Inject(forwardRef(() => ServerFeatureUserService))
    private userService: ServerFeatureUserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<IPublicUserData | null> {
    const user = await this.userService.getOneByEmail(email);

    if (await bcrypt.compare(password, user.password)) {
      this.logger.debug(`User '${email}' authenticated successfully`);
      const { password, ...publicUserData } = user;

      return publicUserData;
    }
    return null;
  }

  async generateAccessToken(user: IPublicUserData): Promise<ITokenResponse> {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
