export interface IGame {
  id: string;
  roads: Record<string, unknown>;
  battlefields: Record<string, unknown>;
  playerDarkName: string;
  playerLightName: string;
  // roads: Record<keyof typeof ROADS, Road>
  // battlefields: Record<keyof typeof BATTLEFIELDS, Battlefield>
}
