import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as GamesActions from './games.actions';
import { GameService } from '../../game.service';

export const loadGames = createEffect(
  (actions$ = inject(Actions), gameService = inject(GameService)) => {
    return actions$.pipe(
      ofType(GamesActions.initGames),
      switchMap(() =>
        gameService.getAllGames().pipe(
          map((games) => GamesActions.loadGamesSuccess({ games })),
          catchError((error) => {
            console.error('Error', error);
            return of(GamesActions.loadGamesFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const createGame = createEffect(
  (actions$ = inject(Actions), gameService = inject(GameService)) => {
    return actions$.pipe(
      ofType(GamesActions.createGame.create),
      switchMap(({ data }) =>
        gameService.createGame(data).pipe(
          map((game) => GamesActions.createGame.success({ game })),
          catchError((error) => {
            console.error('Error', error);
            return of(GamesActions.createGame.failure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const updateGames = createEffect(
  (actions$ = inject(Actions), gameService = inject(GameService)) => {
    return actions$.pipe(
      ofType(GamesActions.updateGame),
      switchMap(({ gameId, data }) =>
        gameService.updateGame(gameId, data).pipe(
          map((game) =>
            GamesActions.updateGameSuccess({
              id: gameId,
              changes: game,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(GamesActions.updateGameFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteGame = createEffect(
  (actions$ = inject(Actions), gameService = inject(GameService)) => {
    return actions$.pipe(
      ofType(GamesActions.deleteGame),
      switchMap(({ gameId }) =>
        gameService.deleteGame(gameId).pipe(
          map(() => GamesActions.deleteGameSuccess({ gameId })),
          catchError((error) => {
            console.error('Error', error);
            return of(GamesActions.deleteGameFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
