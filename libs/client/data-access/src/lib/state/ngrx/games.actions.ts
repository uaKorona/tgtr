import { createAction, createActionGroup, props } from '@ngrx/store';
import { GameEntity } from './games.models';
import { ICreateGame, IGame } from '@shared/domain';
import { Update } from '@ngrx/entity';

const errorProps = props<{ error: string; data?: unknown }>;

export const initGames = createAction('[Games Page] Init');

export const loadGamesSuccess = createAction(
  '[Games/API] Load Games Success',
  props<{ games: GameEntity[] }>()
);

export const loadGamesFailure = createAction(
  '[Games/API] Load Games Failure',
  errorProps()
);

export const createGame = createActionGroup({
  source: '[Games/API]',
  events: {
    create: props<{ data: ICreateGame }>(),
    success: props<{ game: IGame }>(),
    failure: errorProps(),
  },
});

export const updateGame = createAction(
  '[Games/API] Update a Game',
  props<{ gameId: string; data: unknown }>()
);

export const updateGameSuccess = createAction(
  '[Games/API] Update a Game Success',
  props<Update<IGame>>()
);

export const updateGameFailure = createAction(
  '[Games/API] Update a Game Failure',
  errorProps()
);

export const deleteGame = createAction(
  '[Games/API] Delete a Game',
  props<{ gameId: string }>()
);

export const deleteGameSuccess = createAction(
  '[Games/API] Delete a Game Success',
  props<{ gameId: string }>()
);

export const deleteGameFailure = createAction(
  '[Games/API] Delete a Game Failure',
  errorProps()
);
