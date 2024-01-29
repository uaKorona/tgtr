import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GAMES_FEATURE_KEY, GamesState, gamesAdapter } from './games.reducer';

// Lookup the 'Games' feature state managed by NgRx
export const selectGamesState =
  createFeatureSelector<GamesState>(GAMES_FEATURE_KEY);

const { selectAll, selectEntities } = gamesAdapter.getSelectors();

export const selectGamesLoaded = createSelector(
  selectGamesState,
  (state: GamesState) => state.loaded
);

export const selectGamesError = createSelector(
  selectGamesState,
  (state: GamesState) => state.error
);

export const selectAllGames = createSelector(
  selectGamesState,
  (state: GamesState) => selectAll(state)
);

export const selectGamesEntities = createSelector(
  selectGamesState,
  (state: GamesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectGamesState,
  (state: GamesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectGamesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
