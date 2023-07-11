import { Module } from '@nestjs/common';
import { ServerFeatureGameController } from './server-feature-game.controller';
import { ServerFeatureGameService } from './server-feature-game.service';

@Module({
  controllers: [ServerFeatureGameController],
  providers: [ServerFeatureGameService],
  exports: [ServerFeatureGameService],
})
export class ServerFeatureGameModule {}
