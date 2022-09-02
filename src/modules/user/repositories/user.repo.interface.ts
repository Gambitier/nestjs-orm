import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';

///////////////////////////////

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findFirstByEmailOrThrow(email: string): Promise<UserDomainModel>;

  createUser(model: CreateUserDomainModel): Promise<UserDomainModel>;
}
