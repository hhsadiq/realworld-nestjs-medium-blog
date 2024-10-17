import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ArticleDTOWithTagDomains } from '@src/articles/articles.types';
import { Article } from '@src/articles/domain/article';
import { ArticleRepository } from '@src/articles/infrastructure/persistence/article.repository';
import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

@Injectable()
export class ArticleRelationalRepository implements ArticleRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(data: ArticleDTOWithTagDomains): Promise<Article> {
    const persistenceModel =
      ArticleMapper.toPersistenceFromDTOWithTagDomains(data);

    const newEntity = await this.articleRepository.save(
      this.articleRepository.create(persistenceModel),
    );

    return ArticleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]> {
    const entities = await this.articleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        author: true,
        tagList: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return entities.map((entity) => ArticleMapper.toDomain(entity));
  }

  async findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Article[], number]> {
    const [entities, total] = await this.articleRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        author: true,
        tagList: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    const data: Article[] = entities.map((entity) =>
      ArticleMapper.toDomain(entity),
    );
    return [data, total];
  }

  async findById(id: Article['id']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findByIdWithRelations(
    id: Article['id'],
  ): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
      relations: {
        author: true,
        tagList: true,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: Article['slug']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { slug },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async update(entity: Article, payload: Partial<Article>): Promise<Article> {
    const updatedEntity = await this.articleRepository.save(
      this.articleRepository.create(
        ArticleMapper.toPersistence({
          ...entity,
          ...payload,
        }),
      ),
    );

    return ArticleMapper.toDomain(updatedEntity);
  }

  async remove(id: Article['id']): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async findAllWithPagination_feed({
    paginationOptions,
    followingsList,
  }: {
    paginationOptions: IPaginationOptions;
    followingsList: number[];
  }): Promise<Article[]> {
    const entities = await this.articleRepository.find({
      where: { author_id: In(followingsList) },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        author: true,
        tagList: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return entities.map((entity) => ArticleMapper.toDomain(entity));
  }
}
