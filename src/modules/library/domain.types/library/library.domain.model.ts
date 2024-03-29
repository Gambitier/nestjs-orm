import {
  AddressDomainModel,
  CreateAddressDomainModel,
} from '@modules/address/domain.types/address';
import { BookDomainModel } from '@modules/book/domain.types/book';
import { LibraryUserAccountDomainModel } from '@modules/library/domain.types/library.user.account';

export type LibraryDomainModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date | null;
  name: string;

  addresses?: AddressDomainModel[];
  books?: BookDomainModel[];
  libraryUserAccounts?: LibraryUserAccountDomainModel[];
};

export type CreateLibraryDomainModel = {
  name: string;
  userId: string;
  address: CreateAddressDomainModel;
};
