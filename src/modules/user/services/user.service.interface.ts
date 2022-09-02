import { LoginDto } from '@modules/auth/dto';
import {
  CreateUserDomainModel,
  UserDomainModel,
} from '@modules/user/domain.types/user';

///////////////////////////////

export const IUserService = Symbol('IUserService');

export interface IUserService {
  createUser(model: CreateUserDomainModel): Promise<UserDomainModel>;
  findFirstOrThrowByLoginDto(loginDto: LoginDto): Promise<UserDomainModel>;
}
