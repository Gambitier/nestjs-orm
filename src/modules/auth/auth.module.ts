import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthServiceProvider } from '@modules/auth/service.providers';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthServiceProvider],
})
export class AuthModule {}
