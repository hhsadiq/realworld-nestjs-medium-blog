import { Injectable } from '@nestjs/common';

import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';
import { BAD_REQUEST } from '@src/common/exceptions';
import { Profile } from '@src/profile/domain/profile';
import { FollowDto } from '@src/profile/dto/follow.dto';
import { ProfileAbstractRepository } from '@src/profile/infrastructure/persistence/profile-repository';
import { UsersService } from '@src/users/users.service';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileAbstractRepository,
    private readonly userService: UsersService,
  ) {}

  async followProfile(
    userId: string,
    userJwtPayload: JwtPayloadType,
  ): Promise<NullableType<Profile>> {
    if (userId == userJwtPayload.id) {
      throw BAD_REQUEST('User cannot follow himself');
    }

    const user = await this.userService.findById(+userId);
    if (!user) {
      throw BAD_REQUEST('User not found');
    }

    const followDto: FollowDto = {
      followerId: +userJwtPayload.id,
      followingId: user ? +user.id : 0,
    };
    return user
      ? await this.profileRepository.followProfile(followDto, user)
      : null;
  }

  async unfollowProfile(
    userId: string,
    userJwtPayload: JwtPayloadType,
  ): Promise<NullableType<Profile>> {
    if (userId == userJwtPayload.id) {
      throw BAD_REQUEST('User cannot follow/ unfollow himself');
    }

    const user = await this.userService.findById(+userId);
    if (!user) {
      throw BAD_REQUEST('User not found');
    }

    const followDto: FollowDto = {
      followerId: +userJwtPayload.id,
      followingId: user ? +user.id : 0,
    };
    return user
      ? await this.profileRepository.unfollowProfile(followDto, user)
      : null;
  }

  async Allfollowers(
    userJwtPayload: JwtPayloadType,
  ): Promise<NullableType<number[]>> {
    return await this.profileRepository.Allfollowers(+userJwtPayload.id);
  }
}
