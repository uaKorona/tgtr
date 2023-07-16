import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@client/data-access';
import { ICreateGame } from '@shared/domain';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'tgtr-feature-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-game.component.html',
  styleUrls: ['./feature-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGameComponent {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  games$ = this.apiService.getAllGames();

  addGame(): void {
    const game: ICreateGame = {
      playerLightName: 'Player ' + Date.now(),
      playerDarkName: 'Player ' + Date.now(),
    };
    this.apiService.createGame(game).subscribe(() => {
      this.games$ = this.apiService.getAllGames();
      this.cdr.markForCheck();
    });
  }

  protected readonly async = async;
}
