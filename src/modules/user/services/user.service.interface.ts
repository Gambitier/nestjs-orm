import { UpdatePasswordDto } from '@modules/auth/dto';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';

///////////////////////////////

export const IUserService = Symbol('IUserService');

export interface IUserService {
  resetUserPassword(
    resetPasswordDto: UpdatePasswordDto,
    id: string,
  ): Promise<boolean>;

  createUser(model: CreateUserDomainModel): Promise<UserDomainModel>;

  findFirstByIdOrThrow(userId: string): Promise<UserDomainModel>;

  findFirstByEmailOrThrow(email: string): Promise<UserDomainModel>;
}
