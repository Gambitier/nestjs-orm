import { UserRepository } from '@modules/user/repositories/user.repo';
import { IUserRepository } from '@modules/user/repositories/user.repo.interface';
import { Provider } from '@nestjs/common';

export const UserRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
