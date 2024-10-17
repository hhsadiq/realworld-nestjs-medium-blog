import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FollowPathParamDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
