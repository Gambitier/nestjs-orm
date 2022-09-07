import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { CreateLibraryApiResponse } from '@modules/library/controllers/api.response.types/library.api.response';
import { CreateLibraryDomainModel } from '@modules/library/domain.types/library';
import { CreateLibraryDTO } from '@modules/library/dto';
import { ILibraryService } from '@modules/library/services';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////
@ApiBearerAuth()
@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(
    @Inject(ILibraryService)
    private readonly _libraryService: ILibraryService,
  ) {}

  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateLibraryApiResponse })
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRoleEnum.USER, UserRoleEnum.ADMIN)
  @Post('')
  async craeteLibrary(
    @Request() req,
    @Body() createLibraryDto: CreateLibraryDTO,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserData;
    const createLibraryDomainModel: CreateLibraryDomainModel = {
      name: createLibraryDto.name,
      userId: user.id,
    };

    const responseEntity: CreateLibraryApiResponse = {
      data: await this._libraryService.createLibrary(createLibraryDomainModel),
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
