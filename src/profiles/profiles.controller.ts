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

import { FollowerActionDto } from './dto/follower.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller({
  path: 'profiles',
  version: '1',
})
export class ProfilesController {
  constructor(private readonly followService: ProfilesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
    @Body() followerActionDto: FollowerActionDto,
    @Request() request,
  ) {
    return this.followService.follow(request.user.id, username);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':username/follow')
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  async unfollow(@Request() request, @Param('username') username: string) {
    return this.followService.unfollow(request.user.id, username);
  }
}
