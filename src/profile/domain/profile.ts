import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty({
    type: String,
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
  })
  lastName: string | null;

  @ApiProperty({
    type: String,
  })
  bio: string | null;

  @ApiProperty({
    type: String,
  })
  image: string | undefined;
}
