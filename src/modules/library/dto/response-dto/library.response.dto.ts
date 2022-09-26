import { AddressResponseDto } from '@modules/address/dto/response/address.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LibraryResponseDto {
  constructor(props: LibraryResponseDto) {
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
  name: string;

  @ApiProperty({ type: AddressResponseDto })
  @Expose()
  @Type(() => AddressResponseDto)
  addresses?: AddressResponseDto[];
}
