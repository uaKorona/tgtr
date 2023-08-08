import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGame } from '@shared/domain';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCoffee,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tgtr-game',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './tgtr-game.component.html',
  styleUrls: ['./tgtr-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgtrGameComponent {
  @Input() game: IGame | undefined;
  @Output() startGame = new EventEmitter<string>();
  @Output() cancelGame = new EventEmitter<string>();
  protected readonly faCoffee = faCoffee;
  protected readonly faPencil = faPencil;
  protected readonly faTrashCan = faTrashCan;

  startGameClick(): void {
    this.startGame.emit(this.game?.id);
  }

  cancelGameClick(): void {
    this.cancelGame.emit(this.game?.id);
  }
}
