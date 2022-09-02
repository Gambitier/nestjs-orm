import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class TokenDto {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @Exclude()
  refreshToken: string;
}
