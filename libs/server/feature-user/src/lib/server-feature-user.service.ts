import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitySchema } from '@server/data-access';
import { Repository } from 'typeorm';
import { ICreateUser, IUser } from '@shared/domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ServerFeatureUserService {
  constructor(
    @InjectRepository(UserEntitySchema)
    private userRepository: Repository<IUser>
  ) {}

  async getOne(id: string): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      /**
       * We could use `findOneOrFail()` from TypeORM, but
       * instead of a TypeORM exception I prefer to throw
       * native NestJS exceptions when possible
       */
      throw new NotFoundException(`User could not be found`);
    }
    return user;
  }

  async getOneByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User could not be found`);
    }
    return user;
  }

  /**
   * TODO - make number of rounds configurable via ConfigService!
   */
  async create(user: ICreateUser): Promise<IUser> {
    const { email, password } = user;
    // set the payload password to a _hash_ of the originally
    // supplied password!
    user.password = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.save({ email, password });

    return newUser;
  }
}
