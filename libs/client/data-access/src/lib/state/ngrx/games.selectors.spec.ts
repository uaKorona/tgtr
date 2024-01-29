import { createMockGame } from '@shared/util-testing';
import { GameEntity } from './games.models';
import {
  gamesAdapter,
  GamesPartialState,
  initialGamesState,
} from './games.reducer';
import * as GamesSelectors from './games.selectors';
import { IGame } from '@shared/domain';

describe('Games Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGamesId = (it: GameEntity) => it.id;
  const createGamesEntity = (userId: string, id: string): GameEntity =>
    createMockGame(userId, { id });

  let state: GamesPartialState;

  beforeEach(() => {
    const userId = 'user-AAA';
    state = {
      games: gamesAdapter.setAll(
        [
          createGamesEntity(userId, 'PRODUCT-AAA'),
          createGamesEntity(userId, 'PRODUCT-BBB'),
          createGamesEntity(userId, 'PRODUCT-CCC'),
        ],
        {
          ...initialGamesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Games Selectors', () => {
    it('selectAllGames() should return the list of Games', () => {
      const results = GamesSelectors.selectAllGames(state);
      const selId = getGamesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = GamesSelectors.selectEntity(state) as GameEntity;
      const selId = getGamesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectGamesLoaded() should return the current "loaded" status', () => {
      const result = GamesSelectors.selectGamesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectGamesError() should return the current "error" state', () => {
      const result = GamesSelectors.selectGamesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
