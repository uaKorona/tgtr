import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { IGame } from '@shared/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntitySchema } from '@server/data-access-game';

@Injectable()
export class ServerFeatureGameService {
  constructor(
    @InjectRepository(GameEntitySchema)
    private gameRepository: Repository<IGame>
  ) {}

  private game$$ = new BehaviorSubject<IGame[]>([
    {
      id: 'new',
      playerDarkName: 'Roman',
      playerLightName: 'Nadiya',
      roads: {},
      battlefields: {},
    },
  ]);

  async getAll(): Promise<IGame[]> {
    return this.gameRepository.find();
  }

  async getOne(id: string): Promise<IGame> {
    const todo = await this.gameRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(`A game ${id} could not be found!`);
    }

    return todo;
  }

  async create(
    todo: Pick<IGame, 'playerLightName' | 'playerDarkName'>
  ): Promise<IGame> {
    const newGame: IGame = await this.gameRepository.save({
      ...todo,
      roads: {},
      battlefields: {},
    });

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
