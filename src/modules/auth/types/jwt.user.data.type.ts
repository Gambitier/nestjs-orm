import { UserRoleDto } from '@modules/user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class JwtUserData {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  phone: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty({ type: [UserRoleDto] })
  @Expose()
  @Type(() => UserRoleDto)
  userRoles: UserRoleDto[];
}
