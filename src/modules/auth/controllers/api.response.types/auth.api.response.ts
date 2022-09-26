import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { TokenDto } from '@modules/auth/dto/response-dto/token.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LoginApiResponse {
  constructor(props: LoginApiResponse) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Type(() => JwtUserDataDto)
  @Expose()
  user: JwtUserDataDto;

  @ApiProperty()
  @Type(() => TokenDto)
  @Expose()
  token: TokenDto;
}
