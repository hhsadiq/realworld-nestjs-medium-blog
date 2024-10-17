import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FollowDto {
  @ApiProperty()
  @IsNumber()
  followerId: number;

  @ApiProperty()
  @IsNumber()
  followingId: number;
}
