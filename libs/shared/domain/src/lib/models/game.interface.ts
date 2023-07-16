export interface IGame {
  id: string;
  roads: Record<string, unknown>;
  battlefields: Record<string, unknown>;
  playerDarkName: string;
  playerLightName: string;
  // roads: Record<keyof typeof ROADS, Road>
  // battlefields: Record<keyof typeof BATTLEFIELDS, Battlefield>
}

export type ICreateGame = Pick<IGame, 'playerDarkName' | 'playerLightName'>;
export type IUpdateTodo = Partial<Omit<IGame, 'id'>>;
export type IUpsertTodo = IGame;
