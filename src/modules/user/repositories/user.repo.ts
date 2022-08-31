import { UserRoleEnum } from '@modules/auth/common';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { IUserRepository } from '@modules/user/repositories/user.repo.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { HandlePrismaErrors } from 'src/prisma.helpers/prisma.error.handler.utils';
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

  constructor(private prismaService: PrismaService) {
    this._userEntity = prismaService.user;
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
      HandlePrismaErrors(err);
    }

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
