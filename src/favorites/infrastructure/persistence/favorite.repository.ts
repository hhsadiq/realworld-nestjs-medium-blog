import { Favorite } from '@src/favorites/domain/favorite';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class FavoriteRepository {
  abstract create(
    data: Omit<Favorite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Favorite>;
  abstract findById(id: Favorite['id']): Promise<NullableType<Favorite>>;
  abstract findByUser(id: User['id']): Promise<NullableType<Favorite[]>>;
  abstract remove(id: Favorite['id']): Promise<void>;
}
