import { LibraryUserAccountDto } from '@modules/library/dto/response-dto/library.account.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CreateLibraryResponseDto {
  constructor(props: CreateLibraryResponseDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  deleted: Date;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: LibraryUserAccountDto })
  @Expose()
  @Type(() => LibraryUserAccountDto)
  libraryUserAccounts: LibraryUserAccountDto[];
}
