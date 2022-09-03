import { Exclude, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class OtpResponseDto {
  constructor(props: OtpResponseDto) {
    Object.assign(this, props);
  }

  @Exclude()
  id: string;

  @IsString()
  userName: string;

  @IsString()
  mobileNumber: string;

  @Exclude({ toClassOnly: false, toPlainOnly: true })
  otp: string;

  @Type(() => Date)
  validFrom: Date;

  @Type(() => Date)
  validTo: Date;
}
