import { Test } from '@nestjs/testing';
import { ServerFeatureGameController } from './server-feature-game.controller';
import { ServerFeatureGameService } from './server-feature-game.service';
import { GameEntitySchema } from '@server/data-access';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMockGame, createMockUser } from '@shared/util-testing';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneBy: jest.fn(() => ({})),
    save: jest.fn((entity) => entity),
    findOneOrFail: jest.fn(() => ({})),
    delete: jest.fn(() => null),
    find: jest.fn((entities) => entities),
  })
);

const mockUser = createMockUser();

describe('ServerFeatureGameController', () => {
  let controller: ServerFeatureGameController;
  let service: ServerFeatureGameService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ServerFeatureGameService,
        {
          provide: getRepositoryToken(GameEntitySchema),
          useFactory: repositoryMockFactory,
        },
      ],
      controllers: [ServerFeatureGameController],
    }).compile();

    controller = module.get(ServerFeatureGameController);
    service = module.get(ServerFeatureGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  it('should return an array of games items', async () => {
    // before anything else, this "spy" waits for service.getAll()
    // to be called, and returns a Promise that resolves to an
    // array of 5 to-do items
    jest.spyOn(service, 'getAll').mockReturnValue(
      new Promise((res, rej) => {
        res(Array.from({ length: 5 }).map(() => createMockGame(mockUser.id)));
      })
    );

    // call the method that is run when the GET request is made
    // and store the result
    const res = await controller.getAll(mockUser.id);

    // finally, set our expectations for the above code:
    // - make sure the JSON payload returned by the controller
    //   is in fact an array
    // - ensure the length of the array matches the length
    //   that was assigned in the spy above
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(5);
  });

  // testing the method associated with a PATCH HTTP request
  it('should allow updates to a single game', async () => {
    // generate a random game item
    const game = createMockGame(mockUser.id);

    // create a variable for the property being changed
    // (just makes it easier to reference, instead of risking
    //  a type later in the test)
    const playerDarkName = 'new Dark player 1';

    // make the "service" method return a game with the updated
    // playerDarkName when it is called
    jest
      .spyOn(service, 'update')
      .mockReturnValue(Promise.resolve({ ...game, playerDarkName }));

    // store the result
    // NOTE: the parameters passed to update() are the same as the params
    // used in the endpoint's request!. `game.id` refers to the UUID
    // that is in the endpoint's URL, and the object parameter is the
    // PATCH payload of the request
    const updated = await controller.update(mockUser.id, game.id, {
      playerDarkName,
    });

    // finally, ensure that the response includes the updated title
    expect(updated.playerDarkName).toBe(playerDarkName);
  });
});
