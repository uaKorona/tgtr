import { Module } from '@nestjs/common';
import { ServerFeatureUserController } from './server-feature-user.controller';
import { ServerFeatureUserService } from './server-feature-user.service';
import { ServerDataAccessGameModule } from '@server/data-access';

@Module({
  imports: [ServerDataAccessGameModule],
  controllers: [ServerFeatureUserController],
  providers: [ServerFeatureUserService],
  exports: [ServerFeatureUserService],
})
export class ServerFeatureUserModule {}
