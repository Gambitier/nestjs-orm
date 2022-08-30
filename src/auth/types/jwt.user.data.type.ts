import { UserRoleDto } from 'src/user/dto';

export type JwtUserData = {
  userId: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  roles: UserRoleDto[];
};
