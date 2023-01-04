import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, RefreshStrategy } from './strategies';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, PrismaModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
