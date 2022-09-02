import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { PrismaDatabaseErrorHandler } from '@modules/database-error-handler/prisma/prisma.error.handler';
import { Provider } from '@nestjs/common';

export const PrismaDatabaseErrorHandlerProvider: Provider = {
  provide: IDatabaseErrorHandler,
  useClass: PrismaDatabaseErrorHandler,
};
