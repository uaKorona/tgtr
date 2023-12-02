import { Test } from '@nestjs/testing';
import { ServerFeatureGameModule } from '@server/feature-game';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { GameEntitySchema, UserEntitySchema } from '@server/data-access';
import { Repository } from 'typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import {
  HttpStatus,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { IGame, IPublicUserData, ITokenResponse, IUser } from '@shared/domain';
import * as request from 'supertest';
import { randEmail, randPassword } from '@ngneat/falso';
import { ServerFeatureAuthModule } from '@server/feature-auth';
import { ServerFeatureUserModule } from '@server/feature-user';
import { ServerFeatureHealthModule } from '@server/feature-health';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { JwtAuthGuard, DatabaseExceptionFilter } from '@server/util';

describe('ServerFeatureGameController E2E', () => {
  const baseUrl = `/api`;
  const gamesUrl = `/games`;
  const userUrl = `/users`;
  const authUrl = `/auth`;

  const USER_EMAIL = randEmail();
  const USER_UNHASHED_PASSWORD = `Password1!`;

  let app: INestApplication;
  let gameRepo: Repository<IGame>;
  let userRepo: Repository<IUser>;
  let createdUser: IPublicUserData;
  let access_token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ServerFeatureGameModule,
        ServerFeatureAuthModule,
        ServerFeatureUserModule,
        ServerFeatureHealthModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test'],
          ignoreEnvVars: true,
          validationSchema: Joi.object({
            DATABASE_PATH: Joi.string().default(':memory:'),
            DATABASE_LOGGING_ENABLED: Joi.boolean().default(false),
            ENVIRONMENT: Joi.string().default('test'),
            NODE_ENV: Joi.string().default('test'),
            JWT_SECRET: Joi.string().default(randPassword({ size: 32 })),
          }),
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            // make sure this is cast as a boolean
            const logging = !!config.get('DATABASE_LOGGING_ENABLED');
            const database = config.get('DATABASE_PATH');
            return {
              type: 'sqlite',
              database,
              logging,
              synchronize: true,
              autoLoadEntities: true,
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        {
          provide: APP_FILTER,
          useClass: DatabaseExceptionFilter,
        },
      ],
      controllers: [],
    })
      .setLogger(new Logger())
      .compile();

    app = moduleRef.createNestApplication();

    gameRepo = moduleRef.get(getRepositoryToken(GameEntitySchema));
    userRepo = moduleRef.get(getRepositoryToken(UserEntitySchema));

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );

    app.setGlobalPrefix('api');
    /*  app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v1',
    }); */

    await app.init();

    /////////////////////////////////////////////
    // Create a user that can be used for the
    // whole test suite
    /////////////////////////////////////////////

    Logger.log(`THE URL: ${baseUrl}${userUrl}}`);

    createdUser = await request
      .default(app.getHttpServer())
      .post(`${baseUrl}${userUrl}`)
      .set('Content-type', 'application/json')
      .send({ email: USER_EMAIL, password: USER_UNHASHED_PASSWORD })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        Logger.log(`CREATED USER ID: ${JSON.stringify(res.body)}}`);
        return res.body as IPublicUserData;
      });

    /////////////////////////////////////////////
    // Create a valid, signed access token to be
    // used with all API calls
    /////////////////////////////////////////////
    access_token = await request
      .default(app.getHttpServer())
      .post(`${baseUrl}${authUrl}/login`)
      .set('Content-type', 'application/json')
      .send({ email: USER_EMAIL, password: USER_UNHASHED_PASSWORD })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((resp) => (resp.body as ITokenResponse).access_token)
      .catch((e) => {
        Logger.error(`Error creating access token: ${e}`);
        throw e;
      });
  });

  it('app should be defined', () => {
    expect(app).toBeTruthy();
  });

  it('should return an array of games items', () => {
    return request
      .default(app.getHttpServer())
      .get(`${baseUrl}${gamesUrl}`)
      .auth(access_token, { type: 'bearer' })
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((res) => {
        return Array.isArray(res.body);
      });
  });

  it('should require an access token to create', () => {
    return request
      .default(app.getHttpServer())
      .post(`${baseUrl}${gamesUrl}`)
      .send({ playerDarkName: 'foo', playerLightName: 'bar' })
      .expect('Content-Type', /json/)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it("should return a 400 for a game that doesn't belong to the user", async () => {
    // create new user
    const altUser = await userRepo.save({
      email: randEmail(),
      password: 'Password1!',
    });

    // create a game for that user so that the UUID is already taken
    const altUserTodo = await gameRepo.save({
      playerDarkName: 'foo',
      playerLightName: 'bar',
      user: {
        id: altUser.id,
      },
    });

    // use ID from new user's todo
    const url = `${baseUrl}${gamesUrl}/${altUserTodo.id}`;

    const payload = {
      id: altUserTodo.id,
      playerDarkName: 'foo',
      playerLightName: 'bar',
      battlefields: {},
    };

    return (
      request
        .default(app.getHttpServer())
        .put(url)
        // use the access token with our user ID instead of new user
        .auth(access_token, { type: 'bearer' })
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST)
    );
  });
});
