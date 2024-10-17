import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileAbstractRepository } from '@src/profile/infrastructure/persistence/profile-repository';
import { FollowEntity } from '@src/profile/infrastructure/persistence/relational/entities/follow.entity';
import { ProfileRelationalRepository } from '@src/profile/infrastructure/persistence/relational/repositories/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity])],
  providers: [
    {
      provide: ProfileAbstractRepository,
      useClass: ProfileRelationalRepository,
    },
  ],
  exports: [ProfileAbstractRepository],
})
export class RelationalProfilePersistenceModule {}
