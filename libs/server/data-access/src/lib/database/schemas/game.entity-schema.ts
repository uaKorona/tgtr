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
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      // column name in this table where the foreign key
      // of the associated table is referenced
      joinColumn: {
        name: 'user_id',
      },
      inverseSide: ' games',
    },
  },
  // adds a constraint to the table that ensures each
  // userID + title combination is unique
  uniques: [
    {
      name: 'UNIQUE_GAME_USER',
      columns: ['playerDarkName', 'playerLightName', 'user.id'],
    },
  ],
});
