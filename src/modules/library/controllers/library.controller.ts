import { APIResponse } from '@common/types';
import { AllowAnonymous, Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import {
  CreateLibraryDTO,
  CreateLibraryResponseDto,
  LibrarySearchDTO,
} from '@modules/library/dto';
import { LibraryResponseDto } from '@modules/library/dto/response-dto/library.response.dto';
import { ILibraryService } from '@modules/library/services';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
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
    const user = req.user as JwtUserDataDto;
    const createLibraryDomainModel: CreateLibraryDomainModel = {
      name: createLibraryDto.name,
      userId: user.id,
      address: createLibraryDto.address,
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

  @ApiResponse({ status: HttpStatus.OK, type: [LibraryResponseDto] })
  @HttpCode(HttpStatus.OK)
  @AllowAnonymous()
  @Get('search')
  async searchLibrary(
    @Request() req,
    @Query() searchDTO: LibrarySearchDTO,
  ): Promise<APIResponse> {
    const libraaries: LibraryDomainModel[] =
      await this._libraryService.searchLibrary(searchDTO);

    const apiResponse: APIResponse = {
      message: 'Fetched list successfully!',
      data: {
        entity: libraaries.map((item) => new LibraryResponseDto(item)),
      },
    };

    return apiResponse;
  }
}
