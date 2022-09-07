import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { ILibraryRepository } from '@modules/library/repositories/library.repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Library, Prisma } from '@prisma/client';
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

  async createLibrary(
    model: CreateLibraryDomainModel,
  ): Promise<LibraryDomainModel> {
    const createInputs: Prisma.LibraryCreateInput = {
      name: model.name,
      libraryUserAccounts: {
        create: {
          role: 'OWNER',
          user: {
            connect: {
              id: model.userId,
            },
          },
        },
      },
    };

    const entity: Library = await this._libraryEntity.create({
      data: createInputs,
      include: {
        libraryUserAccounts: true,
      },
    });

    return entity as LibraryDomainModel;
  }
}
