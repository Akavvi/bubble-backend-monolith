import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { JwtPayload } from '../types';
import { JwtRefreshPayload } from '../types';
import { EMPTY_REFRESH_TOKEN_ERROR } from '../constants';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: FastifyRequest, payload: JwtPayload): JwtRefreshPayload {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new ForbiddenException(EMPTY_REFRESH_TOKEN_ERROR);
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
