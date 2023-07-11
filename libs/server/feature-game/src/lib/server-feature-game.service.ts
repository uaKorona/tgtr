import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { IGame } from '@shared/domain';

@Injectable()
export class ServerFeatureGameService {
  private game$$ = new BehaviorSubject<IGame[]>([
    {
      id: 'new',
      playerDarkName: 'Roman',
      playerLightName: 'Nadiya',
      roads: {},
      battlefields: {},
    },
  ]);

  getAll(): IGame[] {
    return this.game$$.value;
  }

  getOne(id: string): IGame {
    const game = this.game$$.value.find((td) => td.id === id);

    if (!game) {
      throw new NotFoundException(`Todo could not be found!`);
    }

    return game;
  }

  create(game: Pick<IGame, 'playerLightName' | 'playerDarkName'>): IGame {
    const current = this.game$$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newGame: IGame = {
      ...game,
      id: `game-${Date.now()}`,
      roads: {},
      battlefields: {},
    };
    this.game$$.next([...current, newGame]);

    return newGame;
  }

  update(id: string, data: Partial<Omit<IGame, 'id'>>): IGame {
    const game = this.game$$.value.find((td) => td.id === id);

    if (!game) {
      throw new NotFoundException(`Game could not be found!`);
    }

    const updated = { ...game, ...data };
    this.game$$.next([
      ...this.game$$.value.map((td) => (td.id === id ? updated : td)),
    ]);

    return updated;
  }

  upsert(data: IGame): IGame {
    const todo = this.game$$.value.find((td) => td.id === data.id);

    if (!todo) {
      this.game$$.next([...this.game$$.value, data]);

      return data;
    }

    const updated = { ...todo, ...data };
    this.game$$.next([
      ...this.game$$.value.map((td) => (td.id === updated.id ? updated : td)),
    ]);

    return updated;
  }

  delete(id: string): void {
    const todo = this.game$$.value.find((td) => td.id === id);

    if (!todo) {
      throw new NotFoundException(`Game could not be found!`);
    }

    this.game$$.next([...this.game$$.value.filter((td) => td.id !== id)]);
    return;
  }
}
