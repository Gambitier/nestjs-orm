import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { ILibraryRepository } from '@modules/library/repositories/library.repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class LibraryRepository implements ILibraryRepository {
  /**
   *
   */

  private _libraryEntity: Prisma.LibraryDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prismaService: PrismaService,
    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._libraryEntity = prismaService.library;
  }

  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel> {
    throw new Error('Method not implemented.');
  }
}
