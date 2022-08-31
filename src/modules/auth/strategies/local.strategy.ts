import { LoginDto } from '@modules/auth/dto';
import { IAuthService } from '@modules/auth/services';
import { UserDto } from '@modules/user/dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-jwt';

///////////////////////////////////////////////////////////
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'UsernamePasswordStrategy',
) {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'user_name',
      passwordField: 'password',
    });
  }

  async validate(user_name: string, password: string): Promise<any> {
    const loginDto = plainToClass(LoginDto, {
      user_name: user_name,
      password: password,
    });
    const user: UserDto = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
