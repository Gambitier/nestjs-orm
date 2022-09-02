import { UserRoleEnum } from '@modules/auth/common';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { IUserRepository } from '@modules/user/repositories/user.repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class UserRepository implements IUserRepository {
  /**
   *
   */

  private _userEntity: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    private prismaService: PrismaService,
    @Inject(IDatabaseErrorHandler)
    private databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._userEntity = prismaService.user;
  }

  async findFirstByEmailOrThrow(email: string): Promise<UserDomainModel> {
    let entity: User & {
      userRoles: UserRole[];
    };

    try {
      entity = await this._userEntity.findFirstOrThrow({
        where: {
          email: email,
        },
        include: {
          userRoles: true,
        },
      });
    } catch (err) {
      this.databaseErrorHandler.HandleError(err);
    }

    return this.getUserDomainModel(entity);
  }

  async createUser(model: CreateUserDomainModel): Promise<UserDomainModel> {
    const data: Prisma.UserCreateInput = {
      ...model,
      userRoles: {
        createMany: {
          data: model.userRoles.map((item) => {
            return {
              role: item,
            };
          }),
        },
      },
    };

    let entity: User & {
      userRoles: UserRole[];
    };

    try {
      entity = await this._userEntity.create({
        data: data,
        include: {
          userRoles: true,
        },
      });
    } catch (err) {
      this.databaseErrorHandler.HandleError(err);
    }

    return this.getUserDomainModel(entity);
  }

  private getUserDomainModel(entity: User & { userRoles: UserRole[] }) {
    const domainModel: UserDomainModel = {
      ...entity,
      gender: entity.gender as GenderEnum,
      userRoles: entity.userRoles.map((item) => {
        return {
          ...item,
          role: item.role as UserRoleEnum,
        };
      }),
    };

    return domainModel;
  }
}
