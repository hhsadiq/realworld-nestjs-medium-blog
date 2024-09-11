import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { followUserDto } from '@src/profiles/dto/follow-user.dto';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '@src/utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '@src/utils/infinity-pagination';

import { Profile } from './domain/profile';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FindAllProfilesDto } from './dto/find-all-profiles.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'profiles',
  version: '1',
})
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Profile),
  })
  async findAll(
    @Query() query: FindAllProfilesDto,
  ): Promise<InfinityPaginationResponseDto<Profile>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.profilesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Profile,
  })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }

  @Post(':username/follow')
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: Profile,
  })
  followProfile(@Param('username') username: string, @Request() request) {
    const followerId = request.user.id;
    return this.profilesService.followProfile(username, followerId);
  }

  @Delete(':username/follow')
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  unfollowProfile(@Param('username') username: string, @Request() request) {
    const followerId = request.user.id;
    return this.profilesService.unfollowProfile(username, followerId);
  }
}
