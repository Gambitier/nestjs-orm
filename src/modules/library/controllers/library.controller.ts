import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { CreateLibraryDomainModel } from '@modules/library/domain.types/library';
import {
  CreateLibraryDTO,
  CreateLibraryResponseDto,
} from '@modules/library/dto';
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////
@ApiBearerAuth()
@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(
    @Inject(ILibraryService)
    private readonly _libraryService: ILibraryService,
  ) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: CreateLibraryResponseDto })
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

    const responseEntity: CreateLibraryResponseDto =
      (await this._libraryService.createLibrary(
        createLibraryDomainModel,
      )) as CreateLibraryResponseDto;

    const apiResponse: APIResponse = {
      message: 'Created new library successfully!',
      data: {
        entity: new CreateLibraryResponseDto(responseEntity),
      },
    };

    return apiResponse;
  }
}
