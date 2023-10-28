import { IUser } from "@shared/domain";
import { randPassword, randUser } from "@ngneat/falso";

export const createMockUser = (data?: Partial<IUser>): IUser => {
  const { id, email } = randUser();
  const password = randPassword();

  return {
    id,
    email,
    password,
    games: [],
    ...data,
  };
};
