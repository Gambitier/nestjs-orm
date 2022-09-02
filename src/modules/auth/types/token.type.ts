import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class Token {
  @ApiProperty()
  accessToken: string;

  @Exclude()
  refreshToken: string;
}
