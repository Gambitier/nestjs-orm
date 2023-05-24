import { UserRoleEnum } from '@modules/auth/common/user.role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRoleDto {
  constructor(props: UserRoleDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ enum: UserRoleEnum })
  @Expose()
  role: UserRoleEnum;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
