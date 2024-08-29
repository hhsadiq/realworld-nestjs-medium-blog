import { Injectable } from '@nestjs/common';

import { Follow } from '@src/profiles/domain/profiles';
import { FollowRepository } from '@src/profiles/infrastructure/persistence/follow.repository';

@Injectable()
export class ProfilesService {
  constructor(private readonly followRepository: FollowRepository) {}

  async follow(followerId: number, username: string): Promise<Follow> {
    return this.followRepository.follow(followerId, username);
  }

  async unfollow(followerId: number, username: string): Promise<void> {
    await this.followRepository.unfollow(followerId, username);
  }
}
