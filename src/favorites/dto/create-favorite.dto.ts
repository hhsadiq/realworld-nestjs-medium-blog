import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatefavoriteDto {
  @ApiProperty({ example: 'Article', type: String })
  @IsNotEmpty()
  favoriteableId: string;

  @ApiProperty({ example: 'Article', type: String })
  @IsNotEmpty()
  favoriteableType: 'Article' | 'Comment';
  // @custom-inject-point
  // Don't forget to use the class-validator decorators in the DTO properties.
}
