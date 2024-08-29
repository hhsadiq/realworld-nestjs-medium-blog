import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
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

import { Follow } from '@src/profiles/domain/profiles';

import { FollowerDto } from './dto/follower.dto';
import { ProfilesService } from './profiles.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Profiles')
@Controller({
  path: 'profiles',
  version: '1',
})
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Post(':username/follow')
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: Follow,
  })
  async follow(
    @Param('username') username: string,
    @Body() followerActionDto: FollowerDto,
    @Request() request,
  ) {
    return this.profileService.follow(request.user.id, username);
  }

  @Delete(':username/follow')
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  async unfollow(@Request() request, @Param('username') username: string) {
    return this.profileService.unfollow(request.user.id, username);
  }
}
