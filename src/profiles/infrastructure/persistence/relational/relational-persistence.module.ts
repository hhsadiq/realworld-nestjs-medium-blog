import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowRepository } from '@src/profiles/infrastructure/persistence/follow.repository';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity'; // Make sure this import is correct

import { FollowEntity } from './entities/follow.entity';
import { FollowRelationalRepository } from './repositories/follow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity, UserEntity])],
  providers: [
    {
      provide: FollowRepository,
      useClass: FollowRelationalRepository,
    },
  ],
  exports: [FollowRepository],
})
export class RelationalFollowPersistenceModule {}
