import { LibraryController } from '@modules/library/controllers/library.controller';
import { LibraryServiceProvider } from '@modules/library/ervice.providers';
import { LibraryRepositoryProvider } from '@modules/library/library.repo.provider';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [LibraryController],
  providers: [PrismaService, LibraryServiceProvider, LibraryRepositoryProvider],
})
export class LibraryModule {}
