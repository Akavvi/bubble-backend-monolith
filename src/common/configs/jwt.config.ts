import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const getJwtConfig = (configService: ConfigService): JwtSignOptions => {
  return {
    secret: configService.get('JWT_ACCESS_SECRET'),
    expiresIn: configService.get('JWT_ACCESS_TIME'),
  };
};
