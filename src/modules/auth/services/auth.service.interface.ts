import {
  ForgetPasswordDto,
  GenerateOtpDto,
  OtpLoginDto,
  OtpResponseDto,
  UpdatePasswordDto,
} from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { TokenDto } from '@modules/auth/types/token.type';
import { UserDomainModel } from '@modules/user/domain.types/user';
import { UserDto } from '@modules/user/dto';

///////////////////////////////////////////////////////////

export const IAuthService = Symbol('IAuthService');

export interface IAuthService {
  signup(
    signupDto: SignupDto,
  ): Promise<{ user: UserDomainModel; token: TokenDto }>;

  resetPassword(
    resetPasswordDto: UpdatePasswordDto,
    user: JwtUserData,
  ): Promise<boolean>;

  emailResetPasswordLink(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<boolean>;

  login(userDto: UserDomainModel): Promise<TokenDto>;

  verifyOtp(user: OtpLoginDto): Promise<UserDto>;

  generateOtp(user: GenerateOtpDto): Promise<OtpResponseDto>;

  logout();

  refreshTokens(userId: string, rt: string);
}
