import { Injectable, NotFoundException } from '@nestjs/common';

import { Follow } from '@src/profiles/domain/profiles';
import { FollowRepository } from '@src/profiles/infrastructure/persistence/follow.repository';
import { UsersService } from '@src/users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userService: UsersService,
  ) {}

  async follow(followerId: number, username: string): Promise<Follow> {
    const followingUser = await this.userService.findByEmail(username);

    if (!followingUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    const followingUserId =
      typeof followingUser.id === 'string'
        ? parseInt(followingUser.id)
        : followingUser.id;

    return this.followRepository.createFollow(followerId, followingUserId);
  }

  async unfollow(followerId: number, username: string): Promise<Follow> {
    const followingUser = await this.userService.findByEmail(username);

    if (!followingUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    const followingUserId =
      typeof followingUser.id === 'string'
        ? parseInt(followingUser.id)
        : followingUser.id;

    const followerToBeUnfollowed =
      await this.followRepository.findByFollowerAndFollowing(
        followerId,
        followingUserId,
      );

    if (!followerToBeUnfollowed) {
      throw new NotFoundException(`Follow relationship not found`);
    }

    await this.followRepository.deleteFollow(followerId, followingUserId);

    return followerToBeUnfollowed;
  }
}
