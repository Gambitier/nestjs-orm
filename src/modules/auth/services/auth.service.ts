import { Injectable } from '@nestjs/common';
import { UserDto } from '../../user/dto';
import {
  ForgetPasswordDto,
  GenerateOtpDto,
  LoginDto,
  OtpLoginDto,
  OtpResponseDto,
  ResetPassTokenDto,
} from '../dto';
import { Tokens } from '../types/token.type';
import { IAuthService } from './auth.service.interface';

/////////////////////////////////////////////////////
@Injectable()
export class AuthService implements IAuthService {
  /**
   *
   */
  constructor() {
    //
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

  logout() {
    throw new Error('Method not implemented.');
  }

  refreshTokens(userId: string, rt: string) {
    throw new Error('Method not implemented.');
  }
}
