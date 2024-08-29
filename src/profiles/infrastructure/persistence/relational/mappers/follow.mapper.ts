import { Follow } from '@src/profiles/domain/profiles';
import { FollowEntity } from '@src/profiles/infrastructure/persistence/relational/entities/follow.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class FollowMapper {
  static toDomain(raw: FollowEntity): Follow {
    const domainEntity = new Follow();
    domainEntity.id = raw.id;

    if (raw.follower) {
      domainEntity.follower_id = UserMapper.toDomain(raw.follower);
    }

    if (raw.following) {
      domainEntity.following_id = UserMapper.toDomain(raw.following);
    }

    domainEntity.created_at = raw.created_at;
    domainEntity.updated_at = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Follow): FollowEntity {
    const persistenceEntity = new FollowEntity();
    persistenceEntity.id = domainEntity.id;

    if (domainEntity.follower_id) {
      persistenceEntity.follower = UserMapper.toPersistence(
        domainEntity.follower_id,
      );
    }

    if (domainEntity.following_id) {
      persistenceEntity.following = UserMapper.toPersistence(
        domainEntity.following_id,
      );
    }

    persistenceEntity.created_at = domainEntity.created_at;
    persistenceEntity.updated_at = domainEntity.updated_at;

    return persistenceEntity;
  }
}
