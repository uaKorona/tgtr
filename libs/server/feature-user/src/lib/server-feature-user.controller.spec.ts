import { Test } from '@nestjs/testing';
import { ServerFeatureUserController } from './server-feature-user.controller';
import { ServerFeatureUserService } from './server-feature-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '@server/util';
import { UserEntitySchema } from '@server/data-access';

describe('ServerFeatureUserController', () => {
  let controller: ServerFeatureUserController;
  let service: ServerFeatureUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ServerFeatureUserService,
        {
          provide: getRepositoryToken(UserEntitySchema),
          useFactory: repositoryMockFactory,
        },
      ],
      controllers: [ServerFeatureUserController],
    }).compile();

    controller = module.get(ServerFeatureUserController);
    service = module.get(ServerFeatureUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
    expect(service).toBeTruthy();
  });
});
