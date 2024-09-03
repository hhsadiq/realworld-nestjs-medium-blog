import { Injectable } from '@nestjs/common';

import { ArticlesService } from '@src/articles/articles.service';
import { Article } from '@src/articles/domain/article';
import { CommentsService } from '@src/comments/comments.service';
import { Comment } from '@src/comments/domain/comment';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '@src/common/exceptions';
import { User } from '@src/users/domain/user';
import { UsersService } from '@src/users/users.service';

import { Favorite } from './domain/favorite';
import { CreatefavoriteDto } from './dto/create-favorite.dto';
import { FavoriteRepository } from './infrastructure/persistence/favorite.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userService: UsersService,
    private readonly articleService: ArticlesService,
    private readonly commentService: CommentsService,
  ) {}

  async addToFavorites(id: User['id'], createfavoriteDto: CreatefavoriteDto) {
    const { favoriteableId, favoriteableType } = createfavoriteDto;

    const user = await this.userService.findById(id);
    if (!user) throw new Error('User not found');

    let favoriteable: Article | Comment;

    if (favoriteableType === 'Article') {
      favoriteable = await this.articleService.findOne(favoriteableId);
    } else {
      favoriteable = await this.commentService.findById(favoriteableId);
    }

    if (!favoriteable) throw NOT_FOUND(favoriteableType, { id });

    return this.favoriteRepository.create({
      user,
      favoriteableId,
      favoriteableType,
      favoriteable,
    });
  }

  getFavoritesForUser(userId: User['id']) {
    return this.favoriteRepository.findByUser(userId);
  }

  findOne(id: Favorite['id']) {
    return this.findAndValidate('id', id);
  }

  remove(id: Favorite['id']) {
    return this.favoriteRepository.remove(id);
  }

  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // captilize first letter of the field name
    if (typeof this.favoriteRepository[repoFunction] !== 'function') {
      throw UNPROCESSABLE_ENTITY(
        `Method ${repoFunction} not found on favorite repository.`,
        field,
      );
    }

    const favorite = await this.favoriteRepository[repoFunction](value);
    if (!favorite) {
      throw NOT_FOUND('favorite', { [field]: value });
    }
    return favorite;
  }
}
