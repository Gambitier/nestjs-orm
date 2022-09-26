import { UserRoleDto } from '@modules/user/dto/user.role.dto';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { UserPrefixEnum } from '@modules/user/enums/user.prefix.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserDto {
  constructor(props: UserDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ enum: UserPrefixEnum })
  @Expose()
  prefix: UserPrefixEnum;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  middleName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phone: string;

  @ApiProperty({ enum: GenderEnum })
  @Expose()
  gender: GenderEnum;

  @ApiProperty()
  @Expose()
  dateOfBirth: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: [UserRoleDto] })
  @Expose()
  @Type(() => UserRoleDto)
  userRoles: UserRoleDto[];
}
