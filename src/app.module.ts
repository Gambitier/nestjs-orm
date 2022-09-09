import { AuthModule } from '@modules/auth/auth.module';
import { JwtGuard, RolesGuard } from '@modules/auth/common';
import { CommunicationModule } from '@modules/communication/communication.module';
import { DatabaseErrorHandlerModule } from '@modules/database-error-handler/database.error.handler.module';
import { UserModule } from '@modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { LoggerModule } from 'nestjs-pino';
import { TwilioModule } from 'nestjs-twilio';
import { mailerModuleConfigs, twilioModuleConfig } from 'src/configs';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { APIResponseInterceptor } from 'src/interceptors/api.response.interceptor';
import { PrismaService } from 'src/prisma.service';
import { AddressModule } from './modules/address/address.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { LibraryModule } from './modules/library/library.module';
import { PublisherModule } from './modules/publisher/publisher.module';

@Module({
  imports: [
    PublisherModule,
    AuthorModule,
    AddressModule,
    BookModule,
    LibraryModule,
    // LoggerModule.forRoot(),
    // LoggerModule.forRootAsync(logggerModuleConfig),
    TwilioModule.forRootAsync(twilioModuleConfig),
    MailerModule.forRootAsync(mailerModuleConfigs),
    UserModule,
    AuthModule,
    DatabaseErrorHandlerModule,
    CommunicationModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: APIResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
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
