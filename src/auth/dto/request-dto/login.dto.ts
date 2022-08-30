import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  constructor(props: LoginDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString({ message: "'User Name' must be string" })
  userName: string;

  @ApiProperty({ example: 'Password@1234' })
  password: string;
}
