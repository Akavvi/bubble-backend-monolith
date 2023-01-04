import { Tokens } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  access_token: string;

  constructor(partial: Partial<Tokens>) {
    this.access_token = partial.accessToken;
  }
}
