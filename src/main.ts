import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { Logger } from 'nestjs-pino';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // the bufferLogs field, it will force NestJS to wait for logger
    // to be ready instead of using built -in logger on start
    bufferLogs: true,
    abortOnError: false,
  });

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  // Prisma interferes with NestJS enableShutdownHooks.
  // Prisma listens for shutdown signals and will call process.exit()
  // before your application shutdown hooks fire.To deal with this,
  // you would need to add a listener for Prisma beforeExit event.
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb', parameterLimit: 100 }));

  const config = new DocumentBuilder()
    .setTitle('Nesjs ORM Examples')
    .setDescription('Nesjs ORM Examples')
    .setVersion('1.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = parseInt(process.env.PORT) || 7575;
  await app.listen(port, '0.0.0.0', function () {
    console.log('Listening on port %d', port);
  });
}

bootstrap();
