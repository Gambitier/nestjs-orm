///////////////////////////////

import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';

export const ILibraryRepository = Symbol('ILibraryRepository');

export interface ILibraryRepository {
  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel>;
}
