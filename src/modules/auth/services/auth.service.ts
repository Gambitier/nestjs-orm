import { compareHash } from '@common/utils';
import { UserRoleEnum } from '@modules/auth/common';
import {
  ForgetPasswordDto,
  GenerateOtpDto,
  OtpLoginDto,
  OtpResponseDto,
  UpdatePasswordDto,
} from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { IAuthService } from '@modules/auth/services/auth.service.interface';
import { jwtConstants } from '@modules/auth/strategies/constants';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { TokenDto } from '@modules/auth/types/token.type';
import { IEmailService } from '@modules/communication/services';
import {
  DataNotFoundError,
  UniqueConstraintFailedError,
} from '@modules/database-error-handler/errors';
import { UserDomainModel } from '@modules/user/domain.types/user';
import { UserDto, UserRoleDto } from '@modules/user/dto';
import { IUserService } from '@modules/user/services/user.service.interface';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

    @Inject(IEmailService)
    private readonly emailService: IEmailService,
  ) {
    //
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ user: UserDomainModel; token: TokenDto }> {
    let user: UserDomainModel;

    try {
      user = await this.userService.createUser({
        ...signupDto,
        userRoles: [UserRoleEnum.USER],
      });
    } catch (err) {
      if (err instanceof UniqueConstraintFailedError) {
        throw new BadRequestException(err.message);
      }

      throw err;
    }

    const token = await this.getToken(user);

    return {
      user: user,
      token: token,
    };
  }

  async resetPassword(
    resetPasswordDto: UpdatePasswordDto,
    jwtUserData: JwtUserData,
  ): Promise<boolean> {
    let user: UserDomainModel;

    try {
      user = await this.userService.findFirstByIdOrThrow(jwtUserData.id);
    } catch (error) {
      if (error instanceof DataNotFoundError) {
        throw new BadRequestException('User does not exist');
      }

      throw error;
    }

    const passwordMatch: boolean = compareHash(
      resetPasswordDto.newPassword,
      user.password,
    );

    if (passwordMatch) {
      return true; // password changed!
    }

    const status: boolean = await this.userService.resetUserPassword(
      resetPasswordDto,
      jwtUserData.id,
    );

    if (status) {
      this.emailService.sendPasswordResetSuccessEmail({
        email: jwtUserData.email,
        firstName: jwtUserData.firstName,
      });
    }

    return status;
  }

  async emailResetPasswordLink(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<boolean> {
    let user: UserDomainModel;

    try {
      user = await this.userService.findFirstByEmailOrThrow(
        forgetPasswordDto.email,
      );
    } catch (err) {
      if (err instanceof DataNotFoundError) {
        throw new BadRequestException('User not found');
      }

      throw err;
    }

    const token: TokenDto = await this.login(user);

    // Note the token must be sent as query parameter and not as url param
    // this is bcoz we can use passport strategy. e.g defined in this repo 'JwtFromQueryParamStrategy'
    const emailSent = await this.emailService.sendResetPasswordLinkEmail({
      email: user.email,
      // TODO use config service instead of process.env
      resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${token.accessToken}`,
    });

    if (!emailSent) {
      throw new InternalServerErrorException(
        'Problem encountered while sending email',
      );
    }

    return true;
  }

  async login(user: UserDomainModel): Promise<TokenDto> {
    const token = await this.getToken(user);
    return token;
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

  private getToken = async (user: UserDomainModel): Promise<TokenDto> => {
    const userDataForToken: JwtUserData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      userRoles: user.userRoles.map((role) => {
        const dto: UserRoleDto = {
          id: role.id,
          role: role.role,
          userId: role.userId,
          createdAt: role.createdAt,
        };

        return dto;
      }),
    };

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

    const token: TokenDto = {
      accessToken: at,
      refreshToken: rt,
    };

    return token;
  };
}
