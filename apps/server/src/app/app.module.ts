import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerFeatureGameModule } from '@server/feature-game';

@Module({
  imports: [ServerFeatureGameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
