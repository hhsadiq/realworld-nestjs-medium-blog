import { ApiProperty } from '@nestjs/swagger';

import { Article } from '@src/articles/domain/article';
import { Comment } from '@src/comments/domain/comment';
import { User } from '@src/users/domain/user';

export class Favorite {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  favoriteableId: string | number;

  @ApiProperty({
    type: String,
  })
  favoriteableType: 'Article' | 'Comment';

  // @custom-inject-point
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  user: User;

  favoriteable: Article | Comment;
}
