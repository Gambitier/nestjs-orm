import { AuthModule } from '@modules/auth/auth.module';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { PrismaDatabaseErrorHandler } from '@modules/database-error-handler/prisma/prisma.error.handler';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { APIResponseInterceptor } from 'src/interceptors/api.response.interceptor';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [
    PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: APIResponseInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    {
      provide: IDatabaseErrorHandler,
      useClass: PrismaDatabaseErrorHandler,
    },
  ],
})
export class AppModule {
  onModuleInit(): void {
    console.log('Initializing server modules 📡 ');
  }

  onApplicationBootstrap(): void {
    console.log('Initialized server, waiting for requests 🚀');
  }
}
