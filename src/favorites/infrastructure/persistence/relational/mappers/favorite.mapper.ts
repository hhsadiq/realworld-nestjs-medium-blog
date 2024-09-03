import { Article } from '@src/articles/domain/article';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { Comment } from '@src/comments/domain/comment';
import { CommentMapper } from '@src/comments/infrastructure/persistence/relational/mappers/comment.mapper';
import { Favorite } from '@src/favorites/domain/favorite';
import { FavoriteEntity } from '@src/favorites/infrastructure/persistence/relational/entities/favorite.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class FavoriteMapper {
  static toDomain(raw: FavoriteEntity): Favorite {
    const domainEntity = new Favorite();
    domainEntity.id = raw.id;
    domainEntity.favoriteableId = raw.favoritable_id;
    domainEntity.favoriteableType = raw.favoritable_type;
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    if (raw.article) {
      domainEntity.favoriteable = ArticleMapper.toDomain(raw.article);
    } else if (raw.comment) {
      domainEntity.favoriteable = CommentMapper.toDomain(raw.comment);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: Favorite): FavoriteEntity {
    const persistenceEntity = new FavoriteEntity();
    persistenceEntity.favoritable_id = domainEntity.favoriteableId.toString();
    persistenceEntity.favoritable_type = domainEntity.favoriteableType;
    persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);

    if (domainEntity.favoriteable) {
      if (domainEntity.favoriteableType === 'Article') {
        persistenceEntity.article = ArticleMapper.toPersistence(
          domainEntity.favoriteable as Article,
        );
      }
      if (domainEntity.favoriteableType === 'Comment') {
        persistenceEntity.comment = CommentMapper.toPersistence(
          domainEntity.favoriteable as Comment,
        );
      }
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
