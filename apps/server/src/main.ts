/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const configSwagger = new DocumentBuilder()
  .setTitle(`Full Stack Game REST API`)
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // only decorated parameters in DTOs are delivered
      forbidNonWhitelisted: true, // throw error if non-whitelisted parameters are delivered
    })
  );

  // TODO - revisit and secure this!
  app.enableCors({
    origin: '*',
  });

  // set up versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // handle swagger
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/v1', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
