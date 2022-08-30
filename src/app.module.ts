import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  onModuleInit(): void {
    console.log('Initializing server modules 📡 ');
  }

  onApplicationBootstrap(): void {
    console.log('Initialized server, waiting for requests 🚀');
  }
}
