import { Test } from '@nestjs/testing';
import { ServerFeatureGameService } from './server-feature-game.service';

describe('ServerFeatureGameService', () => {
  let service: ServerFeatureGameService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerFeatureGameService],
    }).compile();

    service = module.get(ServerFeatureGameService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
