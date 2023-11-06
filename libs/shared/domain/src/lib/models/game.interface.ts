import { IUser } from './user.interface';

export interface IGame {
  id: string;
  roads: Record<string, unknown>;
  battlefields: Record<string, unknown>;
  playerDarkName: string;
  playerLightName: string;
  // roads: Record<keyof typeof ROADS, Road>
  // battlefields: Record<keyof typeof BATTLEFIELDS, Battlefield>

  /**
   * These fields are marked as optional, as there
   * will be situations where the user is not returned
   * as part of the response payload.
   */
  user?: IUser;
  user_id?: string;
}

export type ICreateGame = Pick<IGame, 'playerDarkName' | 'playerLightName'>;
export type IUpdateTodo = Partial<Omit<IGame, 'id'>>;
export type IUpsertTodo = IGame;
