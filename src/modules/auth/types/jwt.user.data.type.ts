import { UserRoleDto } from '@modules/user/dto';

export type JwtUserData = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userRoles: UserRoleDto[];
};
