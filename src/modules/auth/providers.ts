import { Provider } from '@nestjs/common';
import { IAuthService } from './services';
import { AuthService } from './services/auth.service';

export const AuthServiceProvider: Provider = {
  provide: IAuthService,
  useClass: AuthService,
};
