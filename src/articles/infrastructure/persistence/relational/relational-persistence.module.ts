import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleRepository } from '@src/articles/infrastructure/persistence/article.repository';

import { ArticleEntity } from './entities/article.entity';
import { ArticleRelationalRepository } from './repositories/article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [
    {
      provide: ArticleRepository,
      useClass: ArticleRelationalRepository,
    },
  ],
  exports: [ArticleRepository],
})
export class RelationalArticlePersistenceModule {}
