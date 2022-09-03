import { AuthModule } from '@modules/auth/auth.module';
import { JwtGuard } from '@modules/auth/common';
import { CommunicationModule } from '@modules/communication/communication.module';
import { DatabaseErrorHandlerModule } from '@modules/database-error-handler/database.error.handler.module';
import { UserModule } from '@modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { TwilioModule } from 'nestjs-twilio';
import { mailerModuleConfigs, twilioModuleConfig } from 'src/configs';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { APIResponseInterceptor } from 'src/interceptors/api.response.interceptor';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    // LoggerModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        const shouldUsePrettyPrint = nodeEnv === 'local';
        return {
          pinoHttp: {
            redact: [
              'req.headers',
              'req.remoteAddress',
              'req.remotePort',
              'res.headers',
            ],
            transport: {
              target: 'pino-pretty',
              options: {
                ignore: 'req.headers,res',
                colorize: true,
                levelFirst: true,
              },
            },
            customSuccessMessage(req) {
              return `request completed | RquestId: ${req.id} | API: ${req.method}: ${req.url}`;
            },
            customErrorMessage(req) {
              return `request errored | RquestId: ${req.id} | API: ${req.method}: ${req.url}`;
            },
            serializers: {
              req(req) {
                req.body = req.raw.body;
                return req;
              },
            },
            autoLogging: {
              ignore: (req) => {
                const baseApiUrl = '/api/v1';
                const apiEndpointList = [
                  'notification',
                  // 'auth/signup',
                  // 'auth/login',
                ];
                const shouldIgnore = apiEndpointList.some(
                  (api) =>
                    req.url.startsWith(`${baseApiUrl}/${api}`) ||
                    req.url === `${baseApiUrl}` ||
                    req.url === `${baseApiUrl}/` ||
                    req.url.includes('favicon.ico'),
                );

                return shouldIgnore;
              },
            },
          },
        };
      },
    }),
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
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
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
