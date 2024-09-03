import { Article } from '@src/articles/domain/article';
import { Favorite } from '@src/favorites/domain/favorite';
import { CreatefavoriteDto } from '@src/favorites/dto/create-favorite.dto';
import { UpdatefavoriteDto } from '@src/favorites/dto/update-favorite.dto';
import { User } from '@src/users/domain/user';
import { IPaginationOptions } from '@src/utils/types/pagination-options';
// __mock__/favorite.mock.ts
export const paginationOptions: IPaginationOptions = {
  page: 1,
  limit: 10,
};

export const mockCreatefavoriteDto: CreatefavoriteDto = {
  favoriteableId: '2',
  favoriteableType: 'Article',
};

export const mockUpdatefavoriteDto: UpdatefavoriteDto = {
  // provide necessary fields here @update-dto
};

export const mockfavorite: Favorite = {
  id: '7',
  createdAt: new Date('2024-09-03T03:49:48.591Z'),
  updatedAt: new Date('2024-09-03T03:49:48.591Z'),
  favoriteableId: 2,
  favoriteableType: 'Article',
  user: new User(),
  favoriteable: new Article(),
};
