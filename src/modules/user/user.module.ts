import { UserRepositoryProvider } from '@modules/user/repo.providers';
import { UserServiceProvider } from '@modules/user/service.providers';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UserServiceProvider, UserRepositoryProvider],
  exports: [UserServiceProvider],
})
export class UserModule {}
