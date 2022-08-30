import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateOtpDto {
  @ApiProperty()
  @IsString()
  mobileNumber: string;
}
