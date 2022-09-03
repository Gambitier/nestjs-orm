import { TokenDto } from '@modules/auth/types/token.type';
import { UserDto } from '@modules/user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LoginApiResponse {
  constructor(props: LoginApiResponse) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @ApiProperty()
  @Type(() => TokenDto)
  @Expose()
  token: TokenDto;
}
