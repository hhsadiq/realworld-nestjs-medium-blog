import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';

@Entity({
  name: TABLES.profile,
})
export class ProfileEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  followerId: number;

  @Column({ type: 'int' })
  followedId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'followerId' })
  follower: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'followedId' })
  followed: UserEntity;

  // @custom-inject-point
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
