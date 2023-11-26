import { Test } from '@nestjs/testing';
import { ServerFeatureGameService } from './server-feature-game.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GameEntitySchema } from '@server/data-access';
import {
  MockType,
  repositoryMockFactory,
} from './server-feature-game.controller.spec';
import { Repository } from 'typeorm';
import { IGame } from '@shared/domain';
import { createMockGame, createMockUser } from '@shared/util-testing';

const mockUser = createMockUser();

describe('ServerFeatureGameService', () => {
  let service: ServerFeatureGameService;
  let repoMock: MockType<Repository<IGame>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ServerFeatureGameService,
        {
          provide: getRepositoryToken(GameEntitySchema),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(ServerFeatureGameService);
    repoMock = module.get(getRepositoryToken(GameEntitySchema));
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of game items', async () => {
    // just like the controller test, create an array of fake todo items
    const games = Array.from({ length: 5 }).map(() =>
      createMockGame(mockUser.id)
    );

    // in the controller we mocked what the service returned. but
    // now that we're testing the service, we're mocking what the
    // "database" would return if the `find()` query was run
    repoMock.find?.mockReturnValue(games);

    // make sure the service is responding with the array of
    // fake game items
    expect((await service.getAll(mockUser.id)).length).toBe(games.length);

    // because we're using jest.fn() for our mock database repository
    // methods, we can spy on `find()` and ensure that it was called
    // instead of something like `findBy()` or `findOne()`
    expect(repoMock.find).toHaveBeenCalled();
  });
});
