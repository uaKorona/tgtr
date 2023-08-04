import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerFeatureGameModule } from '@server/feature-game';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerFeatureHealthModule } from '@server/feature-health';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_PATH: Joi.string().default('tmp/db.sqlite'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get('DATABASE_PATH'),
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ServerFeatureGameModule,
    ServerFeatureHealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
