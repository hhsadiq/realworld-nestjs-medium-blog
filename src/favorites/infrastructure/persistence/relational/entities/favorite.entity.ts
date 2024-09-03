import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { CommentEntity } from '@src/comments/infrastructure/persistence/relational/entities/comment.entity';
import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';

@Entity({
  name: TABLES.favorite,
})
export class FavoriteEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  favoritable_type: 'Article' | 'Comment';

  @Column()
  favoritable_id: string;

  @ManyToOne(() => ArticleEntity, { nullable: true })
  @JoinColumn({
    name: 'favoritable_id',
    foreignKeyConstraintName: 'fk_article',
    referencedColumnName: 'id',
  })
  article?: ArticleEntity;

  @ManyToOne(() => CommentEntity, { nullable: true })
  @JoinColumn({
    name: 'favoritable_id',
    foreignKeyConstraintName: 'fk_comment',
    referencedColumnName: 'id',
  })
  comment?: CommentEntity;

  // @custom-inject-point
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
