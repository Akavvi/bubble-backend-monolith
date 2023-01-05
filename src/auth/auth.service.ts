import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import { JwtPayload, Tokens } from './types';
import * as argon2 from 'argon2';
import { getJwtConfig, getRefreshConfig } from '../common/configs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_DENIED_ERROR,
  USER_INCORRECT_PASSWORD_ERROR,
} from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async localRegister(dto: LoginDto) {
    const passwordHash = await this.generatePasswordHash(dto.password);
    const user = await this.userService.create(dto.email, passwordHash);

    return this.generateTokens({ sub: user.id, email: user.email });
  }

  async localLogin(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    const isSimilarPassword = await this.verifyPassword(
      user.passwordHash,
      dto.password,
    );
    if (!isSimilarPassword) {
      throw new ForbiddenException(USER_INCORRECT_PASSWORD_ERROR);
    }

    return this.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.find(userId);

    const matches = await argon2.verify(user.refreshTokenHash, refreshToken);
    if (!matches) {
      throw new ForbiddenException(ACCESS_DENIED_ERROR);
    }

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
    });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.userService.clearRefreshTokenHash(userId);
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);
    return this.userService.updateRefreshTokenHash(userId, hash);
  }

  private async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, getJwtConfig(this.configService)),
      this.jwtService.signAsync(payload, getRefreshConfig(this.configService)),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async verifyPassword(passwordHash: string, password: string) {
    return await argon2.verify(passwordHash, password);
  }

  private async generatePasswordHash(password: string) {
    return argon2.hash(password);
  }
}
