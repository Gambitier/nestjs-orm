import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateAddressDto {
  constructor(props: CreateAddressDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Expose()
  streetAddress?: string;

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
