import { ApiProperty } from '@nestjs/swagger';

import { User } from '@src/users/domain/user';

export class Profile {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: Number,
  })
  followerId: number | string;

  @ApiProperty({
    type: Number,
  })
  followedId: number | string;

  @ApiProperty()
  followed: User;

  @ApiProperty()
  follower: User;

  // @custom-inject-point
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
