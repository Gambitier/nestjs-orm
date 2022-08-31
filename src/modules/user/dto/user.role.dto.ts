import { UserRoleEnum } from '@modules/auth/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
  constructor(props: UserRoleDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  role: UserRoleEnum;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;
}
