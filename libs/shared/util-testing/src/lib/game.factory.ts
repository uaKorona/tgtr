import { IGame } from '@shared/domain';
import { randFirstName, randProduct, randUuid } from '@ngneat/falso';

export const createMockGame = (user_id: string, data?: Partial<IGame>): IGame => {
  const game = {
    id: randUuid(),
    roads: {},
    battlefields: {},
    playerDarkName: randFirstName(),
    playerLightName: randFirstName(),
    user_id,
  };

  return Object.assign(game, data || {});
};
