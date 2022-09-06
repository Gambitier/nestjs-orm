///////////////////////////////////////////////////////////

import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';

export const ILibraryService = Symbol('ILibraryService');

export interface ILibraryService {
  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel>;
}
