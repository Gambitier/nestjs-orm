import { LibraryServiceProvider } from '@modules/library/ervice.providers';
import { LibraryRepositoryProvider } from '@modules/library/library.repo.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [LibraryServiceProvider, LibraryRepositoryProvider],
})
export class LibraryModule {}
