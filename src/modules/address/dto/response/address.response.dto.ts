import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AddressResponseDto {
  constructor(props: AddressResponseDto) {
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
  streetAddress: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  state: string;

  @ApiProperty()
  @Expose()
  zipCode: string;

  @ApiProperty()
  @Expose()
  country: string;
}
