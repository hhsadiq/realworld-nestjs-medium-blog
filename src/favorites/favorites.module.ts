import { Module } from '@nestjs/common';

import { ArticlesModule } from '@src/articles/articles.module';
import { CommentsModule } from '@src/comments/comments.module';
import { UsersModule } from '@src/users/users.module';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { RelationalfavoritePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalfavoritePersistenceModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService, RelationalfavoritePersistenceModule],
})
export class FavoritesModule {}
