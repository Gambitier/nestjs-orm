import { LoginDto } from '@modules/auth/dto';
import { UserDomainModel } from '@modules/user/domain.types/user';
import { IUserService } from '@modules/user/services/user.service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-local';

///////////////////////////////////////////////////////////
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'UsernamePasswordStrategy',
) {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginDto = plainToClass(LoginDto, {
      email: email,
      password: password,
    });

    try {
      const user: UserDomainModel =
        await this.userService.findFirstOrThrowByLoginDto(loginDto);

      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Incorrect email or password');
      }

      throw error;
    }
  }
}
