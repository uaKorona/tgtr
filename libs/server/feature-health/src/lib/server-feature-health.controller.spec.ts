import { Test } from '@nestjs/testing';
import { ServerFeatureHealthController } from './server-feature-health.controller';
import {
  HealthCheckService,
  TerminusModule,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { TERMINUS_LOGGER } from '@nestjs/terminus/dist/health-check/logger/logger.provider';
import { LoggerService } from '@nestjs/common';

const healthCheckExecutorMock: Partial<HealthCheckExecutor> = {
  execute: jest.fn(),
};

const loggerMock: Partial<LoggerService> = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

describe('ServerFeatureHealthController', () => {
  let controller: ServerFeatureHealthController;
  let healthCheck: HealthCheckService;
  let dbService: TypeOrmHealthIndicator;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TerminusModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'tmp/test.db',
        }),
      ],
      providers: [
        HealthCheckExecutor,
        TypeOrmHealthIndicator,
        {
          provide: HealthCheckExecutor,
          useValue: healthCheckExecutorMock,
        },
        {
          provide: TERMINUS_LOGGER,
          useValue: loggerMock,
        },
      ],
      controllers: [ServerFeatureHealthController],
    }).compile();

    controller = module.get(ServerFeatureHealthController);
    healthCheck = module.get(HealthCheckService);
    dbService = await module.resolve(TypeOrmHealthIndicator);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
