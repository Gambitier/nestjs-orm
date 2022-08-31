import { ApiResponse } from '@common/types';
import {
  AllowAnonymous,
  JwtQueryParamGuard,
  LocalAuthGuard,
  OTPAuthGuard,
} from '@modules/auth/common';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  GenerateOtpDto,
  ResetPassTokenDto,
} from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { IAuthService } from '@modules/auth/services';
import { Token } from '@modules/auth/types/token.type';
import { UserDto } from '@modules/user/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @AllowAnonymous() // pass jwt authentication
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<ApiResponse> {
    const data: { user: UserDto; token: Token } = await this.authService.signup(
      signupDto,
    );

    const apiResponse: ApiResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: {
          user: data.user,
          token: data.token,
        },
      },
    };

    return apiResponse;
  }

  @AllowAnonymous() // pass jwt authentication
  @UseGuards(LocalAuthGuard) // but authorize with username and pass
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async logIn(@Request() req): Promise<ApiResponse> {
    const tokens: Token = await this.authService.login(req.user);
    const apiResponse: ApiResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: {
          user: req.user,
          tokens: tokens,
        },
      },
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @UseGuards(OTPAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login-otp')
  async loginOtp(@Request() req): Promise<ApiResponse> {
    const tokens: Token = await this.authService.login(req.user);
    const apiResponse: ApiResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: {
          user: req.user,
          tokens: tokens,
        },
      },
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @Post('/generate-otp')
  async generateOtp(@Body() user: GenerateOtpDto): Promise<ApiResponse> {
    const generateOtpResponseDto = await this.authService.generateOtp(user);
    const apiResponse: ApiResponse = {
      message: 'OTP has been sent!',
      data: generateOtpResponseDto,
    };
    return apiResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-password/:userId')
  async changePassword(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ApiResponse> {
    const dto: ResetPassTokenDto = {
      newPassword: changePasswordDto.newPassword,
      userId: userId,
    };

    const resetPasswordDto: ResetPassTokenDto = new ResetPassTokenDto(dto);
    const status: boolean = await this.authService.resetPassword(
      resetPasswordDto,
    );

    const apiResponse: ApiResponse = {
      message: 'Password changed successfully!',
      data: status,
    };

    return apiResponse;
  }

  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @Post('/forget-password')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ApiResponse> {
    const status: boolean = await this.authService.emailResetPasswordLink(
      forgetPasswordDto,
    );
    const apiResponse: ApiResponse = {
      message: 'Reset link mail sent!',
      data: status,
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @UseGuards(JwtQueryParamGuard) // but authorize with token from query param
  @HttpCode(HttpStatus.OK)
  @Post('/reset/:userId')
  async resetPassToken(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPassTokenDto,
  ): Promise<ApiResponse> {
    // use this url http://localhost:7575/api/v1/user/reset/{{nestjs_userid}}?token={{nestjs_token}}

    resetPasswordDto.userId = userId;
    const status: boolean = await this.authService.resetPassword(
      resetPasswordDto,
    );
    const apiResponse: ApiResponse = {
      message: 'Password updated successfully!',
      data: status,
    };
    return apiResponse;
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('/logout')
  // logout(@Req() req: Request) {
  //   const user = req.user;
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const userId = user['sub'];
  //   this.authService.logout();
  // }

  // @Public()
  // @UseGuards(RtGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('/refresh')
  // refreshTokens(@Req() req: Request) {
  //   const user = req.user;

  //   this.authService.refreshTokens(user['sub'], user['email']);
  // }
}
