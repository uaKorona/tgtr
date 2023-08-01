import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@client/data-access';
import { ICreateGame, IGame } from '@shared/domain';
import { TgtrGameComponent } from '@client/ui-components';
import { BehaviorSubject, take } from 'rxjs';

@Component({
  selector: 'tgtr-feature-game',
  standalone: true,
  imports: [CommonModule, TgtrGameComponent],
  templateUrl: './feature-game.component.html',
  styleUrls: ['./feature-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGameComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  games$ = new BehaviorSubject<IGame[]>([]);

  trackTodo(index: number, game: IGame): string {
    return game.id;
  }

  ngOnInit(): void {
    this.refreshGames();
  }

  addGame(): void {
    const game: ICreateGame = {
      playerLightName: 'Player ' + Date.now(),
      playerDarkName: 'Player ' + Date.now(),
    };

    this.apiService.createGame(game).subscribe(() => {
      this.refreshGames();
    });
  }

  deleteGame(id: string): void {
    this.apiService.deleteGame(id).subscribe(() => {
      this.refreshGames();
    });
  }

  private refreshGames(): void {
    this.apiService
      .getAllGames()
      .pipe(take(1))
      .subscribe((games) => {
        this.games$.next(games);
      });
  }
}
