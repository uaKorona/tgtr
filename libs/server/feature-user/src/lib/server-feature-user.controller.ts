import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ServerFeatureUserService } from './server-feature-user.service';
import { CreateUserDto } from '@server/data-access';
import { IPublicUserData } from '@shared/domain';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReqUserId, SkipAuth } from '@server/util';

@Controller({ path: 'users', version: '1' })
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

  /**
   * In the UserController the POST endpoint for creating
   * a user should not require a token, however the routes
   * that return user data should require one.
   */
  @Get(':id')
  @ApiBearerAuth()
  async getUser(
    @ReqUserId() reqUserId: string,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<IPublicUserData> {
    if (reqUserId !== id) {
      throw new NotFoundException();
    }

    const { password, ...user } = await this.serverFeatureUserService.getOne(
      id
    );

    return user;
  }
}
