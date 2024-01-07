import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameFacade } from '@client/data-access';
import { IGame } from '@shared/domain';
import { TgtrGameComponent } from '@client/ui-components';

@Component({
  selector: 'tgtr-feature-game',
  standalone: true,
  imports: [CommonModule, TgtrGameComponent],
  templateUrl: './feature-game.component.html',
  styleUrls: ['./feature-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGameComponent implements OnInit {
  //private readonly apiService = inject(GameService);
  private readonly gameFacade = inject(GameFacade);

  games$ = this.gameFacade.games$;

  trackTodo(index: number, game: IGame): string {
    return game.id;
  }

  ngOnInit(): void {
    this.refreshGames();
  }

  addGame(): void {
    this.gameFacade.addGame();
  }

  deleteGame(id: string): void {
    this.gameFacade.deleteGame(id);
  }

  private refreshGames(): void {
    this.gameFacade.loadGames();
  }
}
