import { UserService } from '@modules/user/services/user.service';
import { IUserService } from '@modules/user/services/user.service.interface';
import { Provider } from '@nestjs/common';

export const UserServiceProvider: Provider = {
  provide: IUserService,
  useClass: UserService,
};
