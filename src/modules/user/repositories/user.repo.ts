import { UserRoleEnum } from '@modules/auth/common';
import { UpdatePasswordDto } from '@modules/auth/dto';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { IUserRepository } from '@modules/user/repositories/user.repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Role, User, UserRole } from '@prisma/client';
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
    prismaService: PrismaService,
    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._userEntity = prismaService.user;
  }

  async updatePassword(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<boolean> {
    try {
      await this._userEntity.update({
        where: {
          id: userId,
        },
        data: {
          password: updatePasswordDto.newPassword,
        },
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return true;
  }

  async findFirstByIdOrThrow(userId: string): Promise<UserDomainModel> {
    let entity: User & {
      userRoles: UserRole[];
    };

    try {
      entity = await this._userEntity.findFirstOrThrow({
        where: {
          id: userId,
          deleted: null,
        },
        include: {
          userRoles: true,
        },
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return this.getUserDomainModel(entity);
  }

  async findFirstByEmailOrThrow(email: string): Promise<UserDomainModel> {
    let entity: User & {
      userRoles: UserRole[];
    };

    try {
      entity = await this._userEntity.findFirstOrThrow({
        where: {
          email: email,
          deleted: null,
        },
        include: {
          userRoles: true,
        },
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return this.getUserDomainModel(entity);
  }

  async createUser(model: CreateUserDomainModel): Promise<UserDomainModel> {
    const rolesData = model.userRoles.map((item) => {
      return {
        role: item as Role,
      };
    });

    const data: Prisma.UserCreateInput = {
      ...model,
      userRoles: {
        createMany: {
          data: rolesData,
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
      this._databaseErrorHandler.HandleError(err);
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
