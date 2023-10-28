import { Test } from '@nestjs/testing';
import {
  ServerFeatureGameController,
  ServerFeatureGameService,
} from '@server/feature-game';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GameEntitySchema } from '@server/data-access';
import { Repository } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { IGame } from '@shared/domain';
import { createMockGame, createMockUser } from '@shared/util-testing';
import * as request from 'supertest';
import { MockType, repositoryMockFactory } from '@server/util';

const mockUser = createMockUser();

describe('ServerFeatureGameController E2E', () => {
  const gamesUrl = `/games`;
  let app: INestApplication;
  let repoMock: MockType<Repository<IGame>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        ServerFeatureGameService,
        {
          provide: getRepositoryToken(GameEntitySchema),
          useFactory: repositoryMockFactory,
        },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        },
      ],
      controllers: [ServerFeatureGameController],
    }).compile();

    app = moduleRef.createNestApplication();
    repoMock = moduleRef.get(getRepositoryToken(GameEntitySchema));

    await app.init();
  });

  it('app should be defined', () => {
    expect(app).toBeTruthy();
  });

  it('should create a game item', () => {
    // utilize the same, shared utility for creating a fake game item
    const { id, playerDarkName, playerLightName } = createMockGame(mockUser.id);

    // eventually we'll use an actual database in these tests, but
    // for now we're still mocking that layer
    jest
      .spyOn(repoMock, 'save')
      .mockReturnValue(
        Promise.resolve({ id, playerDarkName, playerLightName })
      );

    // `request` comes from the supertest package as recommended by NestJS in their docs
    return (
      request
        // get a reference to the live app
        .default(app.getHttpServer())
        // issue a POST HTTP request
        .post(gamesUrl)
        // add a payload to the request
        .send({ playerDarkName, playerLightName })
        // when the API returns a Response object, analyze the response
        .expect((resp) => {
          const newGame = resp.body as IGame;
          expect(newGame.playerLightName).toEqual(playerLightName);
          expect(newGame.playerDarkName).toEqual(playerDarkName);
          expect(typeof newGame.id).toEqual('string');
        })
        // ensure that the response's status code matches expectations
        .expect(HttpStatus.CREATED)
    );
  });

  it('should enforce strings for player name', () => {
    return (
      request
        .default(app.getHttpServer())
        .post(gamesUrl)
        .send({ playerDarkName: 123 })
        .expect((resp) => {
          const { message } = resp.body;
          // class-validator delivers error messages in an array so that multiple validation errors can be raised when necessary
          // this tests that one of those array elements speaks to the string requirement

          console.log('message', message);

          expect(
            (message as string[]).some(
              (m) => m === 'playerDarkName must be a string'
            )
          );
        })
        // finally, make sure we're returning a 401
        .expect(HttpStatus.BAD_REQUEST)
    );
  });
});
