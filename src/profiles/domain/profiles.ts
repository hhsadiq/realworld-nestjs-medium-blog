import { ApiProperty } from '@nestjs/swagger';

import { User } from '@src/users/domain/user';

export class Follow {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  follower_id: User;

  @ApiProperty()
  following_id: User;

  // @custom-inject-point
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
