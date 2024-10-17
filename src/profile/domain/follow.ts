import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

export class Follow {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: Number,
  })
  followerId: number;

  @ApiProperty({
    type: Number,
  })
  followingId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
