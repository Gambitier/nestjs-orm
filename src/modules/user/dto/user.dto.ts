import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { UserRoleDto } from './user.role.dto';

export class UserDto {
  constructor(props: UserDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  userName: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  prefix: string;

  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dateOfBirth: Date;

  @Exclude({ toPlainOnly: true, toClassOnly: false })
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  updatedAt: Date | null;

  @ApiProperty()
  roles: UserRoleDto[];
}
