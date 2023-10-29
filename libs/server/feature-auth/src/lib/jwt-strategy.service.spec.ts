import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt-strategy.service';
import { ConfigModule } from '@nestjs/config';
import { IAccessTokenPayload, IPublicUserData } from '@shared/domain';
import { randPassword } from '@ngneat/falso';
import { createMockUser } from '@shared/util-testing';

describe('JwtStrategy', () => {
  let service: JwtStrategy;
  let mockUser: IPublicUserData;

  beforeAll(() => {
    process.env['JWT_SECRET'] = randPassword();
    mockUser = createMockUser();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [JwtStrategy],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token payload object', async () => {
    const tokenPayload: IAccessTokenPayload = {
      sub: mockUser.id,
      email: mockUser.email,
    };
    const respData = await service.validate(tokenPayload);
    expect(respData).toStrictEqual({
      userId: mockUser.id,
      email: mockUser.email,
    });
  });
});
