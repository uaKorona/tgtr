import { EntitySchema } from 'typeorm';
import { IUser } from '@shared/domain';

export const UserEntitySchema = new EntitySchema<IUser>({
  name: 'user',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: String,
      nullable: false,
      // make sure we don't have someone signing up with
      // the same email multiple times!
      unique: true,
    },
    password: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    games: {
      // _one_ user has _many_ games
      type: 'one-to-many',
      // name of the database table we're associating with
      target: 'game',
      // if a user is removed, it's games should be
      // removed as well
      cascade: true,
      // name of the property on the game side
      // that relates back to this user
      inverseSide: 'user',
    },
  },
});
