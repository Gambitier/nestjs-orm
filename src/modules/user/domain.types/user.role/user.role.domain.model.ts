import { UserRoleEnum } from '@modules/auth/common';

export type UserRoleDomainModel = {
  id: string;
  role: UserRoleEnum;
  userId: string;
  createdAt: Date;
};
