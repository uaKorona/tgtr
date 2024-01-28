import { Action } from '@ngrx/store';

import * as GamesActions from './games.actions';
import { GameEntity } from './games.models';
import { GamesState, initialGamesState, gamesReducer } from './games.reducer';
import { createMockGame } from '@shared/util-testing';

describe('Games Reducer', () => {
  const createGamesEntity = (userId: string): GameEntity =>
    createMockGame(userId);

  describe('valid Games actions', () => {
    it('loadGamesSuccess should return the list of known Games', () => {
      const userId = 'user-AAA';
      const games = [createGamesEntity(userId), createGamesEntity(userId)];
      const action = GamesActions.loadGamesSuccess({ games });

      const result: GamesState = gamesReducer(initialGamesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = gamesReducer(initialGamesState, action);

      expect(result).toBe(initialGamesState);
    });
  });
});
