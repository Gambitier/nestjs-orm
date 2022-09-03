import { IAuthService } from '@modules/auth/services';
import { AuthService } from '@modules/auth/services/auth.service';
import { Provider } from '@nestjs/common';

export const AuthServiceProvider: Provider = {
  provide: IAuthService,
  useClass: AuthService,
};
