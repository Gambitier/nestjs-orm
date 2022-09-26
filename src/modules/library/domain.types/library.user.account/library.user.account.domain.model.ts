export enum LibraryUserAccountRoleEnum {
  OWNER = 'OWNER',
  LIBRARIAN = 'LIBRARIAN',
  MEMBER = 'MEMBER',
}

export type LibraryUserAccountDomainModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date;
  userId: string;
  role: LibraryUserAccountRoleEnum;
  libraryId: string;
};

export type CreateLibraryUserAccountDomainModel = {
  name: string;
};
