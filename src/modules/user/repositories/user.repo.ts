import { UserRoleEnum } from '@modules/auth/common';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { IUserRepository } from '@modules/user/repositories/user.repo.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

    const entity = await this._userEntity.create({
      data: data,
      select: {
        id: true,
        prefix: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        phone: true,
        password: true,
        gender: true,
        dateOfBirth: true,
        createdAt: true,
        userRoles: true,
      },
    });

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
