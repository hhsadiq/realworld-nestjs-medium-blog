import { Profile } from '@src/profiles/domain/profile';
import { ProfileEntity } from '@src/profiles/infrastructure/persistence/relational/entities/profile.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class ProfileMapper {
  static toDomain(raw: ProfileEntity): Profile {
    const domainEntity = new Profile();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;
    if (raw.follower) {
      domainEntity.follower = UserMapper.toDomain(raw.follower);
    }
    if (raw.followed) {
      domainEntity.followed = UserMapper.toDomain(raw.followed);
    }
    return domainEntity;
  }

  static toPersistence(domainEntity: Profile): ProfileEntity {
    const persistenceEntity = new ProfileEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;
    persistenceEntity.follower = UserMapper.toPersistence(
      domainEntity.follower,
    );
    persistenceEntity.followed = UserMapper.toPersistence(
      domainEntity.followed,
    );

    return persistenceEntity;
  }
}
