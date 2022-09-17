import { UserRoleDto } from '@modules/user/dto';
import { UserPrefixEnum } from '@modules/user/enums/user.prefix.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class JwtUserDataDto {
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
