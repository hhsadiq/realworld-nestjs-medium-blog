import { Module } from '@nestjs/common';

import { DatabaseHelperModule } from '@src/database-helpers/database-helper.module';
import { UsersModule } from '@src/users/users.module';

import { RelationalFollowPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    RelationalFollowPersistenceModule,
    UsersModule,
    DatabaseHelperModule,
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService, RelationalFollowPersistenceModule],
})
export class ProfilesModule {}
