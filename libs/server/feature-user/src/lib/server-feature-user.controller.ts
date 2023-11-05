import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ServerFeatureUserService } from './server-feature-user.service';
import { CreateUserDto } from '@server/data-access';
import { IPublicUserData } from '@shared/domain';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '@server/util';

@Controller({ path: 'users' })
@ApiTags('Users')
export class ServerFeatureUserController {
  private readonly logger = new Logger(ServerFeatureUserController.name);
  constructor(private serverFeatureUserService: ServerFeatureUserService) {}

  @Post('')
  @SkipAuth()
  async createUser(@Body() userData: CreateUserDto): Promise<IPublicUserData> {
    let result = null;

    try {
      result = await this.serverFeatureUserService.create(userData);
    } catch (e) {
      Logger.log(`Error creating user: ${e}`);
      throw e;
    }

    const { id, email } = result;

    return {
      id,
      email,
      games: [],
    };
  }
}
