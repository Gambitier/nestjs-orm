import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';

///////////////////////////////

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  createUser(model: CreateUserDomainModel): Promise<UserDomainModel>;
}
