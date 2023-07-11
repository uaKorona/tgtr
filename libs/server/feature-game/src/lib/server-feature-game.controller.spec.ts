import { Test } from '@nestjs/testing';
import { ServerFeatureGameController } from './server-feature-game.controller';
import { ServerFeatureGameService } from './server-feature-game.service';

describe('ServerFeatureGameController', () => {
  let controller: ServerFeatureGameController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerFeatureGameService],
      controllers: [ServerFeatureGameController],
    }).compile();

    controller = module.get(ServerFeatureGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
