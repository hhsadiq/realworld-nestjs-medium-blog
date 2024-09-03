import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '@src/favorites/domain/favorite';
import { FavoriteRepository } from '@src/favorites/infrastructure/persistence/favorite.repository';
import { FavoriteEntity } from '@src/favorites/infrastructure/persistence/relational/entities/favorite.entity';
import { FavoriteMapper } from '@src/favorites/infrastructure/persistence/relational/mappers/favorite.mapper';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class FavoriteRelationalRepository implements FavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async create(data: Favorite): Promise<Favorite> {
    const persistenceModel = FavoriteMapper.toPersistence(data);
    const newEntity = await this.favoriteRepository.save(
      this.favoriteRepository.create(persistenceModel),
    );
    return FavoriteMapper.toDomain(newEntity);
  }

  async findById(id: Favorite['id']): Promise<NullableType<Favorite>> {
    const entity = await this.favoriteRepository.findOne({
      where: { id },
      relations: ['article', 'comment'],
    });

    return entity ? FavoriteMapper.toDomain(entity) : null;
  }

  async findByUser(userId: User['id']): Promise<NullableType<Favorite[]>> {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ['article', 'comment'],
    });
    return favorites.map((favorite) => FavoriteMapper.toDomain(favorite));
  }

  async remove(id: Favorite['id']): Promise<void> {
    await this.favoriteRepository.delete(id);
  }
}
