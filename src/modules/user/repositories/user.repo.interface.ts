import { UpdatePasswordDto } from '@modules/auth/dto';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';

///////////////////////////////

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  updatePassword(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<boolean>;

  findFirstByIdOrThrow(userId: string): Promise<UserDomainModel>;
  findFirstByEmailOrThrow(email: string): Promise<UserDomainModel>;

  createUser(model: CreateUserDomainModel): Promise<UserDomainModel>;
}
