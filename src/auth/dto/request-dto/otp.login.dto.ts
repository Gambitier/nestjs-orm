import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class OtpLoginDto {
  constructor(props: OtpLoginDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString({ message: 'Mobile Number must be provided!' })
  mobileNumber: string;

  @ApiProperty()
  @IsDefined({ message: "'otp' is missing" })
  otp: string;
}
