import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceProvider } from './providers';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthServiceProvider],
})
export class AuthModule {}
