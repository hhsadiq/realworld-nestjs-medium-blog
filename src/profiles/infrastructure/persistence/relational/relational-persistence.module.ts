import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileRepository } from '@src/profiles/infrastructure/persistence/profile.repository';

import { ProfileEntity } from './entities/profile.entity';
import { ProfileRelationalRepository } from './repositories/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [
    {
      provide: ProfileRepository,
      useClass: ProfileRelationalRepository,
    },
  ],
  exports: [ProfileRepository],
})
export class RelationalProfilePersistenceModule {}
