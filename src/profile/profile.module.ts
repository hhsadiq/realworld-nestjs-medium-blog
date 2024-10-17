import { Module } from '@nestjs/common';

import { ProfileController } from '@src/profile/profile.controller';
import { ProfileService } from '@src/profile/profile.service';
import { UsersModule } from '@src/users/users.module';

import { RelationalProfilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalProfilePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService, infrastructurePersistenceModule],
})
export class ProfileModule {}
