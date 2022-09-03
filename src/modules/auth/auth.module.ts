import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthServiceProvider } from '@modules/auth/service.providers';
import { JwtFromQueryParamStrategy } from '@modules/auth/strategies/jwt.query.param.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { OTPStrategy } from '@modules/auth/strategies/otp.strategy';
import { CommunicationModule } from '@modules/communication/communication.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule, CommunicationModule],
  controllers: [AuthController],
  providers: [
    AuthServiceProvider,
    JwtStrategy,
    LocalStrategy,
    OTPStrategy,
    JwtFromQueryParamStrategy,
  ],
})
export class AuthModule {}
