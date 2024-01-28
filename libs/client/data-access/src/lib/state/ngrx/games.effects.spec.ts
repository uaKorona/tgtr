import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as GamesActions from './games.actions';
import * as GamesEffects from './games.effects';
import { GameService } from '../../game.service';

describe('GamesEffects', () => {
  let actionMock$: Observable<Action>;
  let gameServiceMock: Partial<GameService>;

  beforeEach(() => {
    gameServiceMock = {
      getAllGames: () => of([]),
    };

    actionMock$ = of(GamesActions.initGames());
  });

  describe('init$', () => {
    it('should work', () => {
      GamesEffects.loadGames(
        actionMock$,
        gameServiceMock as unknown as GameService
      ).subscribe((action) => {
        expect(action).toEqual(GamesActions.loadGamesSuccess({ games: [] }));
      });
    });
  });
});
