///////////////////////////////

import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { LibrarySearchDTO } from '@modules/library/dto';

export const ILibraryRepository = Symbol('ILibraryRepository');

export interface ILibraryRepository {
  searchLibrary(
    searchDTO: LibrarySearchDTO,
  ): LibraryDomainModel[] | PromiseLike<LibraryDomainModel[]>;

  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel>;
}
