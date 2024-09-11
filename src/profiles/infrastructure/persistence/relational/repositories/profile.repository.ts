import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '@src/profiles/domain/profile';
import { ProfileRepository } from '@src/profiles/infrastructure/persistence/profile.repository';
import { ProfileEntity } from '@src/profiles/infrastructure/persistence/relational/entities/profile.entity';
import { ProfileMapper } from '@src/profiles/infrastructure/persistence/relational/mappers/profile.mapper';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

@Injectable()
export class ProfileRelationalRepository implements ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async create(data: Profile): Promise<Profile> {
    const persistenceModel = ProfileMapper.toPersistence(data);
    const newEntity = await this.profileRepository.save(
      this.profileRepository.create(persistenceModel),
    );
    return ProfileMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Profile[]> {
    const entities = await this.profileRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ProfileMapper.toDomain(entity));
  }

  async findById(id: Profile['id']): Promise<NullableType<Profile>> {
    const entity = await this.profileRepository.findOne({
      where: { id },
    });

    return entity ? ProfileMapper.toDomain(entity) : null;
  }

  async update(
    id: Profile['id'],
    payload: Partial<Profile>,
  ): Promise<Profile | null> {
    const entity = await this.profileRepository.findOne({
      where: { id },
    });

    if (!entity) return null;

    const updatedEntity = await this.profileRepository.save(
      this.profileRepository.create(
        ProfileMapper.toPersistence({
          ...ProfileMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProfileMapper.toDomain(updatedEntity);
  }

  async remove(id: Profile['id']): Promise<void> {
    await this.profileRepository.delete(id);
  }

  async followProfile(
    followedId: string,
    followerId: string,
  ): Promise<Profile> {
    const result = await this.profileRepository
      .createQueryBuilder()
      .insert()
      .into(Profile)
      .values({
        follower: { id: followerId },
        followed: { id: followedId },
        createdAt: () => 'NOW()',
        updatedAt: () => 'NOW()',
      })
      .orIgnore()
      .returning(['id', 'followerId', 'followedId', 'createdAt', 'updatedAt'])
      .execute();

    const insertedProfile = result.raw[0];
    return ProfileMapper.toDomain(insertedProfile);
  }

  async unfollowProfile(username: string, followerId: string): Promise<void> {
    if (!username || !followerId) return;

    const deleteQuery = `
      DELETE FROM profile
      USING users
      WHERE profile.followerId = users.id
      AND users.email = $1
      AND profile.followerId = $2;
    `;
    const result = await this.profileRepository.query(deleteQuery, [
      username,
      followerId,
    ]);
  }
}
