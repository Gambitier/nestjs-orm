import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  onModuleInit(): void {
    console.log('Initializing server modules 📡 ');
  }

  onApplicationBootstrap(): void {
    console.log('Initialized server, waiting for requests 🚀');
  }
}
