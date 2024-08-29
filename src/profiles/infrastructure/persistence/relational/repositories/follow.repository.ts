import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Follow } from '@src/profiles/domain/profiles';
import { FollowRepository } from '@src/profiles/infrastructure/persistence/follow.repository';
import { FollowEntity } from '@src/profiles/infrastructure/persistence/relational/entities/follow.entity';
import { FollowMapper } from '@src/profiles/infrastructure/persistence/relational/mappers/follow.mapper';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class FollowRelationalRepository implements FollowRepository {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async follow(followerId: number, username: string): Promise<Follow> {
    // Find the user B by username
    const followingUser = await this.userRepository.findOne({
      where: { first_name: username },
    });

    if (!followingUser) {
      throw new NotFoundException(`User with first_name ${username} not found`);
    }

    // Fetch full user entity for user A
    const followerUser = await this.userRepository.findOne({
      where: { id: followerId },
    });

    if (!followerUser) {
      throw new NotFoundException(`User with id ${followerId} not found`);
    }

    // Create the follow entity
    const followEntity = this.followRepository.create({
      follower: followerUser,
      following: followingUser,
    });

    const savedFollow = await this.followRepository.save(followEntity);

    return FollowMapper.toDomain(savedFollow);
  }

  async unfollow(followerId: number, username: string): Promise<void> {
    // Find the user B by username
    const followingUser = await this.userRepository.findOne({
      where: { first_name: username },
    });

    if (!followingUser) {
      throw new NotFoundException(`User with first_name ${username} not found`);
    }

    // Delete the follow entity
    await this.followRepository.delete({
      follower: { id: followerId },
      following: { id: followingUser.id },
    });
  }

  async findByFollowerAndFollowing(
    followerId: number,
    followingId: number,
  ): Promise<NullableType<Follow>> {
    const entity = await this.followRepository.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
      relations: ['follower', 'following'],
    });

    return entity ? FollowMapper.toDomain(entity) : null;
  }
}
