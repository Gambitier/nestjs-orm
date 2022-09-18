import { APIResponse } from '@common/types';
import {
  AllowAnonymous,
  JwtQueryParamGuard,
  LocalAuthGuard,
  OTPAuthGuard,
} from '@modules/auth/common';
import {
  ForgetPasswordDto,
  GenerateOtpDto,
  LoginDto,
  UpdatePasswordDto,
} from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { TokenDto } from '@modules/auth/dto/response-dto/token.dto';
import { IAuthService } from '@modules/auth/services';
import { UserDomainModel } from '@modules/user/domain.types/user';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginApiResponse } from './api.response.types/auth.api.response';

/////////////////////////////////////////////////////////////////////////

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: HttpStatus.OK, type: LoginApiResponse })
  @AllowAnonymous() // pass jwt authentication
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<APIResponse> {
    const data: { user: UserDomainModel; token: TokenDto } =
      await this.authService.signup(signupDto);

    const responseEntity: LoginApiResponse = {
      user: data.user as JwtUserDataDto,
      token: data.token,
    };

    const apiResponse: APIResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: new LoginApiResponse(responseEntity),
      },
    };

    return apiResponse;
  }

  @ApiBody({ type: LoginDto })
  @AllowAnonymous() // pass jwt authentication
  @UseGuards(LocalAuthGuard) // but authorize with username and pass
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async logIn(@Request() req): Promise<APIResponse> {
    const tokenDto: TokenDto = await this.authService.login(req.user);
    const responseEntity: LoginApiResponse = {
      user: req.user as JwtUserDataDto,
      token: tokenDto,
    };

    const apiResponse: APIResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: new LoginApiResponse(responseEntity),
      },
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @UseGuards(OTPAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login-otp')
  async loginOtp(@Request() req): Promise<APIResponse> {
    const tokens: TokenDto = await this.authService.login(req.user);
    const apiResponse: APIResponse = {
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
  async generateOtp(@Body() user: GenerateOtpDto): Promise<APIResponse> {
    const generateOtpResponseDto = await this.authService.generateOtp(user);
    const apiResponse: APIResponse = {
      message: 'OTP has been sent!',
      data: generateOtpResponseDto,
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @Post('/forget-password')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<APIResponse> {
    const status: boolean = await this.authService.emailResetPasswordLink(
      forgetPasswordDto,
    );
    const apiResponse: APIResponse = {
      message: 'Reset link mail sent!',
      data: status,
    };
    return apiResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: UpdatePasswordDto,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserDataDto;
    const dto: UpdatePasswordDto = {
      newPassword: changePasswordDto.newPassword,
    };

    const status: boolean = await this.authService.resetPassword(dto, user);

    const apiResponse: APIResponse = {
      message: 'Password changed successfully!',
      data: status,
    };

    return apiResponse;
  }

  @AllowAnonymous()
  @UseGuards(JwtQueryParamGuard) // but authorize with token from query param
  @HttpCode(HttpStatus.OK)
  @Post('/reset-password')
  async resetPassToken(
    @Request() req,
    @Query('token') token: string,
    @Body() resetPasswordDto: UpdatePasswordDto,
  ): Promise<APIResponse> {
    // use this url http://localhost:7575/api/v1/user/reset/{{userid}}?token={{token}}

    const user = req.user as JwtUserDataDto;

    const status: boolean = await this.authService.resetPassword(
      resetPasswordDto,
      user,
    );

    const apiResponse: APIResponse = {
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
