import { Test } from '@nestjs/testing';
import { ServerFeatureAuthService } from './server-feature-auth.service';
import { ServerFeatureUserService } from '@server/feature-user';
import { JwtModule } from '@nestjs/jwt';
import { IUser } from '@shared/domain';
import { createMockUser } from '@shared/util-testing';
import * as bcrypt from 'bcrypt';
import { randPassword } from '@ngneat/falso';

describe('ServerFeatureAuthService', () => {
  let service: ServerFeatureAuthService;
  let mockUser: IUser;
  let mockUserUnhashedPassword: string;

  beforeAll(async () => {
    mockUser = createMockUser();
    mockUserUnhashedPassword = mockUser.password;
    mockUser.password = await bcrypt.hash(mockUserUnhashedPassword, 10);
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: randPassword(),
        }),
      ],
      providers: [
        ServerFeatureAuthService,
        {
          provide: ServerFeatureUserService,
          useValue: {
            getOneByEmail: jest.fn(async (email, password) => {
              if (email !== mockUser.email) {
                return null;
              }
              return mockUser;
            }),
          },
        },
      ],
    }).compile();

    service = module.get(ServerFeatureAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
