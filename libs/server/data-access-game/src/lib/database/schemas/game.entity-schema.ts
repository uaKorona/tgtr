import { EntitySchema } from 'typeorm';
import { IGame } from '@shared/domain';

export const GameEntitySchema = new EntitySchema<IGame>({
  name: 'game',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    playerDarkName: {
      type: String,
      nullable: false,
    },
    playerLightName: {
      type: String,
      nullable: false,
    },
    /*  completed: {
      type: 'boolean',
      default: false,
      nullable: false,
    },*/
  },
});
