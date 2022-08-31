import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthServiceProvider } from '@modules/auth/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthServiceProvider],
})
export class AuthModule {}
