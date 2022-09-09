import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { LibraryUserAccountRoleEnum } from '@modules/library/domain.types/library.user.account';
import { LibrarySearchDTO } from '@modules/library/dto';
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

  async searchLibrary(
    searchDTO: LibrarySearchDTO,
  ): Promise<LibraryDomainModel[]> {
    const query: Prisma.LibraryWhereInput[] = [];

    if (searchDTO.name) {
      query.push({ name: { contains: searchDTO.name, mode: 'insensitive' } });
    }

    if (searchDTO.city) {
      query.push({
        addresses: {
          some: {
            city: searchDTO.city,
          },
        },
      });
    }

    if (searchDTO.state) {
      query.push({
        addresses: {
          every: {
            state: searchDTO.state,
          },
        },
      });
    }

    const data = await this._libraryEntity.findMany({
      where: {
        AND: query,
      },
      include: {
        addresses: true,
      },
      skip: searchDTO.offset,
      take: searchDTO.limit,
    });

    return data;
  }

  async createLibrary(
    model: CreateLibraryDomainModel,
  ): Promise<LibraryDomainModel> {
    const createInputs: Prisma.LibraryCreateInput = {
      name: model.name,
      addresses: {
        create: {
          streetAddress: model.address.streetAddress,
          city: model.address.city,
          state: model.address.state,
          zipCode: model.address.zipCode,
          country: model.address.country,
        },
      },
      libraryUserAccounts: {
        create: {
          role: LibraryUserAccountRoleEnum.OWNER,
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
