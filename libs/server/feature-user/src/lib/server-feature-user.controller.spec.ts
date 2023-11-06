import { Test } from '@nestjs/testing';
import { ServerFeatureUserController } from './server-feature-user.controller';
import { ServerFeatureUserService } from './server-feature-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntitySchema } from '@server/data-access';
import { createMockUser } from '@shared/util-testing';
import { IPublicUserData } from '@shared/domain';
import { repositoryMockFactory } from '@server/util/testing';

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

  it('should create a user', async () => {
    const user = createMockUser();
    const publicUser: IPublicUserData = {
      id: user.id,
      email: user.email,
      games: [],
    };

    jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(user));

    const res = await controller.createUser({
      email: user.email,
      password: user.password,
    });

    expect(res).toStrictEqual(publicUser);
  });
});
