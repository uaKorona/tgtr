import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { IGame } from '@shared/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntitySchema } from '@server/data-access';

@Injectable()
export class ServerFeatureGameService {
  private readonly logger = new Logger(ServerFeatureGameService.name);

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

  async getAll(userId: string): Promise<IGame[]> {
    return this.gameRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getOne(userId: string, id: string): Promise<IGame> {
    const game = await this.gameRepository.findOneBy({
      id,
      user: { id: userId },
    });

    if (!game) {
      throw new NotFoundException(`A game ${id} could not be found!`);
    }

    return game;
  }

  async create(
    userId: string,
    game: Pick<IGame, 'playerLightName' | 'playerDarkName'>
  ): Promise<IGame> {
    const { playerLightName, playerDarkName } = game;
    const existing = await this.gameRepository.findOneBy({
      playerLightName,
      playerDarkName,
      user: { id: userId },
    });

    this.logger.debug(`Creating new game, exists already: ${!!existing}`);

    if (existing) {
      throw new BadRequestException(
        `A game with players: '${playerDarkName}, ${playerLightName}' already exists!`
      );
    }

    this.logger.debug(
      `Saving new todo\n${JSON.stringify(
        { ...game, user_id: userId },
        null,
        2
      )}`
    );

    const newGame: IGame = await this.gameRepository.save({
      ...game,
      roads: {},
      battlefields: {},
      user: {
        id: userId,
      },
    });

    const saved = await this.gameRepository.findOneByOrFail({
      id: newGame.id,
      user: {
        id: userId,
      },
    });

    return saved;
  }

  async update(
    userId: string,
    id: string,
    data: Partial<Omit<IGame, 'id'>>
  ): Promise<IGame> {
    const game = await this.gameRepository.findOneBy({
      id,
      user: { id: userId },
    });

    if (!game) {
      throw new NotFoundException(`Game could not be found!`);
    }

    await this.gameRepository.save({
      id,
      ...data,
      user: {
        id: userId,
      },
    });

    // re-query the database so that the updated record is returned
    const updated = await this.gameRepository.findOneOrFail({
      where: { id, user: { id: userId } },
    });

    return updated;
  }

  /**
   * An upsert operation should take a complete object, and either update the properties
   * of an existing entity, or create an entity if one with the given ID does not exist.
   *
   * TypeORM's `save()` operation does this same thing. Additionally, the EntitySchema
   * for a Game entity prevents changing it's UUID.
   *
   * @async
   * @param {string} userId
   * @param {string} todoId
   * @param {ITodo} data
   * @returns {Promise<ITodo>}
   */
  async upsert(userId: string, gameId: string, data: IGame): Promise<IGame> {
    // look for any game with the given UUID
    const existingGame = await this.gameRepository.findOne({
      where: { id: gameId },
      select: {
        user: {
          id: true,
        },
      },
      relations: ['user'],
    });

    // game with requested UUID exists, but belongs to another user
    if (existingGame && existingGame.user?.id !== userId) {
      // 404 isn't the right exception, as by definition any UPSERT operation
      // should create an entity when it's missing
      throw new BadRequestException(`Invalid UUID`);
    }

    // this.logger.debug(`UPSERT found game: ${JSON.stringify(existingGame, null, 2)}`);

    // if (existingGame && existingGame.id !== data.id) {
    //   throw new BadRequestException(`ID can not be changed!`);
    // }
    this.logger.debug(
      `Upserting todo ${data.id.split('-')[0]} for user ${userId.split('-')[0]}`
    );

    await this.gameRepository.save({
      ...data,
      user: { id: userId },
    });

    // re-query the database so that the updated record is returned
    const updated = await this.gameRepository.findOneOrFail({
      where: { id: data.id, user: { id: userId } },
    });

    return updated;
  }

  async delete(userId: string, id: string): Promise<void> {
    const game = await this.gameRepository.findOneBy({
      id,
      user: { id: userId },
    });

    if (!game) {
      throw new NotFoundException(`Game could not be found and deleted!`);
    }

    await this.gameRepository.delete(id);
    return;
  }
}
