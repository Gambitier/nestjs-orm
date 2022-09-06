import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';

export type LibraryDomainModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date | null;
  name: string;

  addresses?: any;
  books?: any;
  libraryUserAccounts?: any;
};

export type CreateLibraryDomainModel = {
  name: string;
  user: JwtUserData;
};
