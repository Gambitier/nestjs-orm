import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  constructor(props: LoginDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString({ message: "'email' must be string" })
  email: string;

  @ApiProperty({ example: 'Password@1234' })
  password: string;
}
