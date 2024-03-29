import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { LibrarySearchDTO } from '@modules/library/dto';
import { ILibraryRepository } from '@modules/library/repositories/library.repo.interface';
import { ILibraryService } from '@modules/library/services/library.service.interface';
import { Inject, Injectable } from '@nestjs/common';

/////////////////////////////////////////////////////

@Injectable()
export class LibraryService implements ILibraryService {
  /**
   *
   */
  constructor(
    @Inject(ILibraryRepository)
    private readonly _libraryRepository: ILibraryRepository,
  ) {
    //
  }

  searchLibrary(
    searchDTO: LibrarySearchDTO,
  ): LibraryDomainModel[] | PromiseLike<LibraryDomainModel[]> {
    return this._libraryRepository.searchLibrary(searchDTO);
  }

  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel> {
    return this._libraryRepository.createLibrary(model);
  }
}
