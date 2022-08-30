import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/auth/common';

export class UserRoleDto {
  constructor(props: UserRoleDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  roleName: UserRoleEnum;
}
