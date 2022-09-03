import { PrismaDatabaseErrorHandlerProvider } from '@modules/database-error-handler/providers';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaDatabaseErrorHandlerProvider],
  exports: [PrismaDatabaseErrorHandlerProvider],
})
export class DatabaseErrorHandlerModule {}
