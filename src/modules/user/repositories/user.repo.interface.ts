import { LoginDto } from '@modules/auth/dto';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';

///////////////////////////////

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findFirstOrThrowByLoginDto(loginDto: LoginDto): Promise<UserDomainModel>;
  createUser(model: CreateUserDomainModel): Promise<UserDomainModel>;
}
