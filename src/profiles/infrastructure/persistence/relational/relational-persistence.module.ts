import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowRepository } from '@src/profiles/infrastructure/persistence/follow.repository';

import { FollowEntity } from './entities/follow.entity';
import { FollowRelationalRepository } from './repositories/follow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity])],
  providers: [
    {
      provide: FollowRepository,
      useClass: FollowRelationalRepository,
    },
  ],
  exports: [FollowRepository],
})
export class RelationalFollowPersistenceModule {}
