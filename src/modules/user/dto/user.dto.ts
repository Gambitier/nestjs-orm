import { UserRoleDto } from '@modules/user/dto/user.role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto {
  constructor(props: UserDto) {
    Object.assign(this, props);
  }

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
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userRoles: UserRoleDto[];
}
