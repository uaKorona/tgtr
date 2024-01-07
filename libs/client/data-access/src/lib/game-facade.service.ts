import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';
import { ICreateGame, IGame } from '@shared/domain';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private readonly gameService = inject(GameService);

  private games$$ = new BehaviorSubject<IGame[]>([]);
  games$ = this.games$$.asObservable();

  loadGames(): void {
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        this.games$$.next(games);
      },
    });
  }

  addGame(): void {
    const game: ICreateGame = {
      playerLightName: 'Player ' + Date.now(),
      playerDarkName: 'Player ' + Date.now(),
    };

    this.gameService.createGame(game).subscribe(() => {
      this.loadGames();
    });
  }

  deleteGame(id: string): void {
    this.gameService.deleteGame(id).subscribe(() => {
      this.loadGames();
    });
  }
}
