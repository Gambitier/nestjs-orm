import { UserRoleEnum } from '@modules/auth/common';
import { UserRoleDomainModel } from '@modules/user/domain.types/user.role/user.role.domain.model';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { UserPrefixEnum } from '@modules/user/enums/user.prefix.enum';

export type UserDomainModel = {
  id: string;
  prefix: UserPrefixEnum;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: GenderEnum;
  dateOfBirth: Date;
  createdAt: Date;
  userRoles?: UserRoleDomainModel[];
};

export type CreateUserDomainModel = {
  prefix: UserPrefixEnum;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: GenderEnum;
  dateOfBirth?: Date;
  userRoles: UserRoleEnum[];
};
