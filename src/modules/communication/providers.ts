import { Provider } from '@nestjs/common';
import {
  EmailService,
  IEmailService,
  ISmsService,
  SmsService,
} from './services';

export const SmsServiceProvider: Provider = {
  provide: ISmsService,
  useClass: SmsService,
};

export const EmailServiceProvider: Provider = {
  provide: IEmailService,
  useClass: EmailService,
};
