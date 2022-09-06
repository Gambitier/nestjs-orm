import { APIResponse } from '@common/types';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { IAuthService } from '@modules/auth/services';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { TokenDto } from '@modules/auth/types/token.type';
import { CreateLibraryApiResponse } from '@modules/library/controllers/api.response.types/library.api.response';
import { UserDomainModel } from '@modules/user/domain.types/user';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////
@ApiBearerAuth()
@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateLibraryApiResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async craeteLibrary(@Body() signupDto: SignupDto): Promise<APIResponse> {
    const data: { user: UserDomainModel; token: TokenDto } =
      await this.authService.signup(signupDto);

    const responseEntity: CreateLibraryApiResponse = {
      user: data.user as JwtUserData,
      token: data.token,
    };

    const apiResponse: APIResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: new CreateLibraryApiResponse(responseEntity),
      },
    };

    return apiResponse;
  }
}
