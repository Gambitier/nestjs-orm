import { ILibraryService, LibraryService } from '@modules/library/services';
import { Provider } from '@nestjs/common';

export const LibraryServiceProvider: Provider = {
  provide: ILibraryService,
  useClass: LibraryService,
};
