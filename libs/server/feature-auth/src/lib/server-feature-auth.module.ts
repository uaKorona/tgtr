import { forwardRef, Module } from '@nestjs/common';
import { ServerFeatureAuthController } from './server-feature-auth.controller';
import { ServerFeatureAuthService } from './server-feature-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy.service';
import { JWT_SECRET } from '../models/jwt.constants';
import { ServerFeatureUserModule } from '@server/feature-user';
import { PassportModule } from '@nestjs/passport';
import { ServerDataAccessGameModule } from '@server/data-access';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => ServerFeatureUserModule),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>(JWT_SECRET),
        signOptions: {
          expiresIn:
            config.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') || '600s',
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    ServerDataAccessGameModule,
  ],
  controllers: [ServerFeatureAuthController],
  providers: [ServerFeatureAuthService, JwtStrategy],
  exports: [ServerFeatureAuthService],
})
export class ServerFeatureAuthModule {}
