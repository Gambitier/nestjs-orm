///////////////////////////////////////////////////////////

import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { LibrarySearchDTO } from '@modules/library/dto';

export const ILibraryService = Symbol('ILibraryService');

export interface ILibraryService {
  searchLibrary(
    searchDTO: LibrarySearchDTO,
  ): LibraryDomainModel[] | PromiseLike<LibraryDomainModel[]>;

  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel>;
}
