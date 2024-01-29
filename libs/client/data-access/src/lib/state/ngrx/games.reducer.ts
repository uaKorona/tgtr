import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  on,
  Action,
  ReducerTypes,
  ActionCreator,
} from '@ngrx/store';

import * as GamesActions from './games.actions';
import { GameEntity } from './games.models';

export const GAMES_FEATURE_KEY = 'games';

export interface GamesState extends EntityState<GameEntity> {
  selectedId?: string | number; // which Games record has been selected
  loaded: boolean; // has the Games list been loaded
  error?: string | null; // last known error (if any)
}

export interface GamesPartialState {
  readonly [GAMES_FEATURE_KEY]: GamesState;
}

export const gamesAdapter: EntityAdapter<GameEntity> =
  createEntityAdapter<GameEntity>();

export const initialGamesState: GamesState = gamesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const crudSuccessOns: ReducerTypes<GamesState, ActionCreator[]>[] = [
  on(
    GamesActions.createGame.success,
    (state, { game }): GamesState => gamesAdapter.addOne(game, { ...state })
  ),
  on(
    GamesActions.updateGameSuccess,
    (state, update): GamesState => gamesAdapter.updateOne(update, { ...state })
  ),
  on(
    GamesActions.deleteGameSuccess,
    (state, { gameId }): GamesState =>
      gamesAdapter.removeOne(gameId, { ...state })
  ),
  on(
    GamesActions.loadGamesSuccess,
    (state, { games }): GamesState =>
      gamesAdapter.setAll(games, { ...state, loaded: true })
  ),
];

const reducer = createReducer(
  initialGamesState,
  on(GamesActions.initGames, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  ...crudSuccessOns,
  on(
    GamesActions.loadGamesFailure,
    GamesActions.createGame.failure,
    GamesActions.updateGameFailure,
    GamesActions.deleteGameFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function gamesReducer(state: GamesState | undefined, action: Action) {
  return reducer(state, action);
}
