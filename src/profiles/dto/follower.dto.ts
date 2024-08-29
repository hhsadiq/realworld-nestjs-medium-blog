import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FollowerDto {
  @ApiProperty()
  @IsString()
  username: string;
}
