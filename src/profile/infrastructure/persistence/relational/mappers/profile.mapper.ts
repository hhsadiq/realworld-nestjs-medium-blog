import { Follow } from '@src/profile/domain/follow';
import { Profile } from '@src/profile/domain/profile';
import { FollowEntity } from '@src/profile/infrastructure/persistence/relational/entities/follow.entity';
import { User } from '@src/users/domain/user';

export class ProfileMapper {
  static toDomain(raw: FollowEntity): Follow {
    const domainEntity = new Follow();
    domainEntity.id = raw.id;
    domainEntity.followerId = raw.follower_id;
    domainEntity.followingId = raw.following_id;
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;
    return domainEntity;
  }

  static toDomainProfile(raw: User): Profile {
    const domainEntity = new Profile();
    domainEntity.firstName = raw.firstName;
    domainEntity.lastName = raw.lastName;
    domainEntity.image = raw.photo?.path;
    domainEntity.bio = '';
    return domainEntity;
  }

  static toPersistence(domainEntity: Follow): FollowEntity {
    const persistenceEntity = new FollowEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.follower_id = domainEntity.followerId;
    persistenceEntity.following_id = domainEntity.followingId;
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
