import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { IGame } from '@shared/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntitySchema } from '@server/data-access';

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

  async update(id: string, data: Partial<Omit<IGame, 'id'>>): Promise<IGame> {
    await this.gameRepository.save({
      id,
      ...data,
    });

    // re-query the database so that the updated record is returned
    const updated = await this.gameRepository.findOneOrFail({ where: { id } });

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

  async delete(id: string): Promise<void> {
    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException(`Game could not be found and deleted!`);
    }

    await this.gameRepository.delete(id);
    return;
  }
}
