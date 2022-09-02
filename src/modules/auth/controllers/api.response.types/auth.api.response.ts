import { Token } from '@modules/auth/types/token.type';
import { UserDto } from '@modules/user/dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginApiResponse {
  @ApiProperty()
  user: UserDto;
  @ApiProperty()
  token: Token;
}
