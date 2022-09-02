import {
  ForgetPasswordDto,
  GenerateOtpDto,
  OtpLoginDto,
  OtpResponseDto,
  ResetPassTokenDto,
} from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { Token } from '@modules/auth/types/token.type';
import { UserDomainModel } from '@modules/user/domain.types/user';
import { UserDto } from '@modules/user/dto';

///////////////////////////////////////////////////////////

export const IAuthService = Symbol('IAuthService');

export interface IAuthService {
  signup(
    signupDto: SignupDto,
  ): Promise<{ user: UserDomainModel; token: Token }>;

  resetPassword(resetPasswordDto: ResetPassTokenDto): Promise<boolean>;

  emailResetPasswordLink(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<boolean>;

  login(userDto: UserDto): Promise<Token>;

  verifyOtp(user: OtpLoginDto): Promise<UserDto>;

  generateOtp(user: GenerateOtpDto): Promise<OtpResponseDto>;

  logout();

  refreshTokens(userId: string, rt: string);
}
