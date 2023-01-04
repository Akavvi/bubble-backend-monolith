import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';

export const getRefreshConfig = (
  configService: ConfigService,
): JwtSignOptions => {
  return {
    secret: configService.getOrThrow('JWT_REFRESH_SECRET'),
    expiresIn: configService.getOrThrow('JWT_REFRESH_TIME'),
  };
};
