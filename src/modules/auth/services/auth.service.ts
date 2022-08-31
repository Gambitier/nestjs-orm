import { UserRoleEnum } from '@modules/auth/common';
import {
  ForgetPasswordDto,
  GenerateOtpDto,
  LoginDto,
  OtpLoginDto,
  OtpResponseDto,
  ResetPassTokenDto,
} from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { IAuthService } from '@modules/auth/services/auth.service.interface';
import { jwtConstants } from '@modules/auth/strategies/constants';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { Tokens } from '@modules/auth/types/token.type';
import { UserDto } from '@modules/user/dto';
import { IUserService } from '@modules/user/services/user.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/////////////////////////////////////////////////////
@Injectable()
export class AuthService implements IAuthService {
  /**
   *
   */
  constructor(
    private jwtService: JwtService,
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {
    //
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ user: UserDto; tokens: Tokens }> {
    const user = await this.userService.createUser({
      ...signupDto,
      userRoles: [UserRoleEnum.USER],
    });

    return {
      user: user,
      tokens: null,
    };
  }

  resetPassword(resetPasswordDto: ResetPassTokenDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  emailResetPasswordLink(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  validateUser(loginDto: LoginDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  login(userDto: UserDto): Promise<Tokens> {
    throw new Error('Method not implemented.');
  }

  verifyOtp(user: OtpLoginDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  generateOtp(user: GenerateOtpDto): Promise<OtpResponseDto> {
    throw new Error('Method not implemented.');
  }

  async logout() {
    return { message: 'you have been logged out' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshTokens(userId: string, rt: string) {
    //   // find user in db and verify pass which returns userDto
    //   // if (_.IsEmpty(userDto)) { throw new ForbiddenException('Access Denied'); }
    //   // if (_.IsEmpty(userDto.refresh_token)) { throw new ForbiddenException('Access Denied, you need to sign in first'); }
    //   const email = 'userDto.email';
    //   // compare hash of refresh token (rt) with the one stored in db
    //   // if (!rtMatches) { throw new ForbiddenException('Access Denied'); }
    //   // else return token and update token as well
    //   const tokens = await this.getTokens(userId, email);
    //   await this.updateRtHash(userId, email);
    //   return tokens;
    throw new Error('Method not implemented.');
  }

  async updateRtHash(userId: string, email: string): Promise<boolean> {
    // save the token in the database here
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [id, mail] = [userId, email];
    return true;
  }

  private getTokens = async (
    userDataForToken: JwtUserData,
  ): Promise<Tokens> => {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(userDataForToken, {
        secret: jwtConstants.at_secret,
        expiresIn: 60 * 60 * 24 * 7, // sec * min * hr * day.....
      }),

      this.jwtService.signAsync(userDataForToken, {
        secret: jwtConstants.rt_secret,
        expiresIn: 60 * 60 * 24 * 7, // sec * min * hr * day.....
      }),
    ]);

    const tokens = new Tokens();
    tokens.access_token = at;
    tokens.refresh_token = rt;
    return tokens;
  };
}
