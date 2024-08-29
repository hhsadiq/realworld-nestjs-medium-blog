import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Follow } from '@src/profiles/domain/profiles';
import { FollowRepository } from '@src/profiles/infrastructure/persistence/follow.repository';
import { FollowEntity } from '@src/profiles/infrastructure/persistence/relational/entities/follow.entity';
import { FollowMapper } from '@src/profiles/infrastructure/persistence/relational/mappers/follow.mapper';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class FollowRelationalRepository implements FollowRepository {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async createFollow(followerId: number, followingId: number): Promise<Follow> {
    const followEntity = this.followRepository.create({
      follower: { id: followerId },
      following: { id: followingId },
    });

    const savedFollow = await this.followRepository.save(followEntity);

    return FollowMapper.toDomain(savedFollow);
  }

  async deleteFollow(followerId: number, followingId: number): Promise<void> {
    await this.followRepository.delete({
      follower: { id: followerId },
      following: { id: followingId },
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
