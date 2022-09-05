import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { TokenDto } from '@modules/auth/types/token.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LoginApiResponse {
  constructor(props: LoginApiResponse) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Type(() => JwtUserData)
  @Expose()
  user: JwtUserData;

  @ApiProperty()
  @Type(() => TokenDto)
  @Expose()
  token: TokenDto;
}
