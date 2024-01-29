import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';
import { ICreateGame, IGame } from '@shared/domain';
import { Store } from '@ngrx/store';
import { GamesActions, GamesSelectors } from './state/ngrx';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  //private readonly gameService = inject(GameService);
  private readonly store = inject(Store);

  /* private games$$ = new BehaviorSubject<IGame[]>([]);
  games$ = this.games$$.asObservable(); */
  games$ = this.store.select(GamesSelectors.selectAllGames);

  loadGames(): void {
    this.store.dispatch(GamesActions.initGames());
  }

  addGame(): void {
    const data: ICreateGame = {
      playerLightName: 'Player ' + Date.now(),
      playerDarkName: 'Player ' + Date.now(),
    };

    this.store.dispatch(GamesActions.createGame.create({ data }));
  }

  deleteGame(gameId: string): void {
    this.store.dispatch(GamesActions.deleteGame({ gameId }));
  }
}
