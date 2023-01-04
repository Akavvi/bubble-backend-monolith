import { JwtPayload } from './jwt-payload.type';

type RefreshPayload = {
  refreshToken: string;
};

export type JwtRefreshPayload = JwtPayload & RefreshPayload;
