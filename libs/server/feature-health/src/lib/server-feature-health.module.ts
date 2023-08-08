import { Module } from '@nestjs/common';
import { ServerFeatureHealthController } from './server-feature-health.controller';

@Module({
  controllers: [ServerFeatureHealthController],
  providers: [],
  exports: [],
})
export class ServerFeatureHealthModule {}
