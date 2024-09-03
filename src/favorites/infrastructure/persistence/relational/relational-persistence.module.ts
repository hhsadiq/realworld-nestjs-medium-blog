import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteRepository } from '@src/favorites/infrastructure/persistence/favorite.repository';

import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteRelationalRepository } from './repositories/favorite.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  providers: [
    {
      provide: FavoriteRepository,
      useClass: FavoriteRelationalRepository,
    },
  ],
  exports: [FavoriteRepository],
})
export class RelationalfavoritePersistenceModule {}
