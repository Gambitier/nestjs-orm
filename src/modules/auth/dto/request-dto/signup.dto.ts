import { GenderEnum } from '@modules/user/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignupDto {
  constructor(props: SignupDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  prefix: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user@yopmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  @Length(10, 10)
  phone: string;

  @ApiProperty({ example: GenderEnum.UNSPECIFIED })
  @IsEnum(GenderEnum)
  gender: GenderEnum = GenderEnum.UNSPECIFIED;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middleName?: string;
}