import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BAD_REQUEST } from '@src/common/exceptions';
import { Profile } from '@src/profile/domain/profile';
import { FollowDto } from '@src/profile/dto/follow.dto';
import { ProfileAbstractRepository } from '@src/profile/infrastructure/persistence/profile-repository';
import { FollowEntity } from '@src/profile/infrastructure/persistence/relational/entities/follow.entity';
import { ProfileMapper } from '@src/profile/infrastructure/persistence/relational/mappers/profile.mapper';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class ProfileRelationalRepository implements ProfileAbstractRepository {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async followProfile(
    followDto: FollowDto,
    userPofile: User,
  ): Promise<NullableType<Profile>> {
    const alreadyFollowing = await this.followRepository.findOne({
      where: {
        following_id: Number(followDto.followingId),
        follower_id: Number(followDto.followerId),
      },
    });

    if (alreadyFollowing) {
      throw BAD_REQUEST('User is already following this user');
    }
    await this.followRepository.save(
      this.followRepository.create({
        following_id: Number(followDto.followingId),
        follower_id: Number(followDto.followerId),
      }),
    );

    return userPofile ? ProfileMapper.toDomainProfile(userPofile) : null;
  }

  async unfollowProfile(
    followDto: FollowDto,
    userPofile: User,
  ): Promise<NullableType<Profile>> {
    const alreadyFollowing = await this.followRepository.findOne({
      where: {
        following_id: Number(followDto.followingId),
        follower_id: Number(followDto.followerId),
      },
    });

    if (!alreadyFollowing) {
      throw BAD_REQUEST('User is already not following this user');
    }

    await this.followRepository.delete(alreadyFollowing.id);
    return userPofile ? ProfileMapper.toDomainProfile(userPofile) : null;
  }

  // For my testing to check all followers of a user
  async Allfollowers(userId: number): Promise<NullableType<number[]>> {
    const alreadyFollowing = await this.followRepository.find({
      where: { follower_id: +userId },
    });

    return alreadyFollowing.map((x) => x.following_id);
  }
}
