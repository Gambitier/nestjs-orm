import { compareHash } from '@common/utils';
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

    let user: UserDomainModel;
    try {
      user = await this.userService.findFirstByEmailOrThrow(loginDto.email);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Incorrect email or password');
      }

      throw error;
    }

    if (!compareHash(loginDto.password, user.password)) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }
}
