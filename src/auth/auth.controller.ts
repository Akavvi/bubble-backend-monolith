import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthDto } from './dto';
import { JwtGuard, RefreshGuard } from '../common/guards';
import { User } from '../common/decorators';
import { FastifyReply } from 'fastify';
import { REFRESH_TOKEN_COOKIE } from './constants';
import { JwtRefreshPayload } from './types';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthDto })
  @Post('local/register')
  async localRegister(@Body() dto: LoginDto) {
    const tokens = await this.authService.localRegister(dto);
    return new AuthDto(tokens);
  }

  @ApiOkResponse({ type: AuthDto })
  @Post('local/login')
  @HttpCode(200)
  async localLogin(@Body() dto: LoginDto) {
    const tokens = await this.authService.localLogin(dto);
    return new AuthDto(tokens);
  }

  @ApiCookieAuth()
  @ApiOkResponse({ type: AuthDto })
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshTokens(
    @Res({ passthrough: true }) res: FastifyReply,
    @User() user: JwtRefreshPayload,
  ) {
    const tokens = await this.authService.refreshTokens(
      user.sub,
      user.refreshToken,
    );

    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
      httpOnly: true,
    });

    return new AuthDto(tokens);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(200)
  logout(
    @Res({ passthrough: true }) res: FastifyReply,
    @User('sub') userId: number,
  ) {
    try {
      res.clearCookie(REFRESH_TOKEN_COOKIE);
    } catch {}

    return this.authService.logout(userId);
  }
}
