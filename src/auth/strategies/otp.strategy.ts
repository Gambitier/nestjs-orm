import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-local';
import { UserDto } from 'src/user/dto';
import { OtpLoginDto } from '../dto';
import { IAuthService } from '../services';

@Injectable()
export class OTPStrategy extends PassportStrategy(Strategy, 'OTPStrategy') {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'otp',
    });
  }

  async validate(phone: string, otp: string): Promise<any> {
    const loginDto = plainToClass(OtpLoginDto, {
      phone: phone,
      otp: otp,
    });
    const user: UserDto = await this.authService.verifyOtp(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
