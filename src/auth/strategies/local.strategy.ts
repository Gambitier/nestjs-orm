import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-local';
import { UserDto } from 'src/user/dto';
import { LoginDto } from '../dto';
import { IAuthService } from '../services';

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
