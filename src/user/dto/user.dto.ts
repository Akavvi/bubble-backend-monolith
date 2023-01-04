import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  email: string;

  constructor(partial: Partial<User>) {
    this.email = partial.email;
  }
}
