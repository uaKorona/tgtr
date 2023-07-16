import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@client/data-access';

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

  games$ = this.apiService.getAllGames();
}
