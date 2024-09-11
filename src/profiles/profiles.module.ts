import { Module } from '@nestjs/common';

import { UsersModule } from '@src/users/users.module';

import { RelationalProfilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [RelationalProfilePersistenceModule, UsersModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService, RelationalProfilePersistenceModule],
})
export class ProfilesModule {}
