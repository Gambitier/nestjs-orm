import { UserRoleEnum } from '@modules/auth/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
  constructor(props: UserRoleDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  roleName: UserRoleEnum;
}
