import { CreateAddressDto } from '@modules/address/dto/request/create.address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateLibraryDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsObject()
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
}
