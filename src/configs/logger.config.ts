import { ConfigModule, ConfigService } from '@nestjs/config';

export const logggerModuleConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const NODE_ENV = configService.get<string>('NODE_ENV');
    const shouldUsePrettyPrint = NODE_ENV === 'local';
    return {
      pinoHttp: getPinoHttpConfig(NODE_ENV),
    };
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPinoHttpConfig(NODE_ENV: string) {
  return {
    level: NODE_ENV !== 'production' ? 'debug' : 'info',
    redact: [
      'req.headers',
      'req.remoteAddress',
      'req.remotePort',
      'res.headers',
    ],
    transport:
      NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              ignore: 'req.headers,res',
              colorize: true,
              levelFirst: true,
            },
          }
        : undefined,
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
  };
}
