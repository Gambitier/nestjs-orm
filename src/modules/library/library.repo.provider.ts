import { LibraryRepository } from '@modules/library/repositories/library.repo';
import { ILibraryRepository } from '@modules/library/repositories/library.repo.interface';
import { Provider } from '@nestjs/common';

export const LibraryRepositoryProvider: Provider = {
  provide: ILibraryRepository,
  useClass: LibraryRepository,
};
