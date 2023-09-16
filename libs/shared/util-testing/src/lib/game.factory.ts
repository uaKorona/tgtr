import { IGame } from '@shared/domain';
import { randFirstName, randProduct, randUuid } from '@ngneat/falso';

export const createMockGame = (data?: Partial<IGame>): IGame => {
  const game = {
    id: randUuid(),
    roads: {},
    battlefields: {},
    playerDarkName: randFirstName(),
    playerLightName: randFirstName(),
  };

  return Object.assign(game, data || {});
};
