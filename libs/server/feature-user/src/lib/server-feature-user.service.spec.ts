import { Test } from '@nestjs/testing';
import { ServerFeatureUserService } from './server-feature-user.service';
import { IUser } from '@shared/domain';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '@server/util/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntitySchema } from '@server/data-access';

describe('ServerFeatureUserService', () => {
  let service: ServerFeatureUserService;
  let repoMock: MockType<Repository<IUser>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ServerFeatureUserService,
        {
          provide: getRepositoryToken(UserEntitySchema),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(ServerFeatureUserService);
    repoMock = module.get(getRepositoryToken(UserEntitySchema));
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
    expect(repoMock).toBeTruthy();
  });
});
