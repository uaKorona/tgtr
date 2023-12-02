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
    this.logger.debug(
      `Founded User ${user.email} ${user.id} for password check`
    );

    if (await bcrypt.compare(password, user.password)) {
      this.logger.debug(`User '${email}' authenticated successfully`);
      const { password, ...publicUserData } = user;

      return publicUserData;
    }

    this.logger.debug(
      `User '${email}' authentication failed: ${password}, ${user.password}`
    );
    return null;
  }

  async generateAccessToken(user: IPublicUserData): Promise<ITokenResponse> {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    Logger.log(`generateAccessToken for: ${payload}}`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
