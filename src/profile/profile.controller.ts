import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Profile } from '@src/profile/domain/profile';
import { FollowPathParamDto } from '@src/profile/dto/follow-path-params.dto';
import { ProfileService } from '@src/profile/profile.service';
import { NullableType } from '@src/utils/types/nullable.type';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Profiles')
@Controller({
  path: 'profiles',
  version: '1',
})
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':userId/follow')
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: Profile,
  })
  async follow(
    @Param() params: FollowPathParamDto,
    @Request() request,
  ): Promise<NullableType<Profile>> {
    const { userId } = params;
    return await this.profileService.followProfile(userId, request.user);
  }

  @Delete(':userId/follow')
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: Profile,
  })
  async unfollow(
    @Param() params: FollowPathParamDto,
    @Request() request,
  ): Promise<NullableType<Profile>> {
    const { userId } = params;
    return await this.profileService.unfollowProfile(userId, request.user);
  }

  @Get()
  async Get(@Request() request): Promise<NullableType<number[]>> {
    return await this.profileService.Allfollowers(request.user);
  }
}
