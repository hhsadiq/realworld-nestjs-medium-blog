import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FollowerActionDto {
  @ApiProperty()
  @IsString()
  username: string;
}
