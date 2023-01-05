import { ApiProperty } from '@nestjs/swagger';
import { Font, FontType } from '@prisma/client';

export class FontDto {
  @ApiProperty()
  type: FontType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  size: number;

  constructor(partial: Partial<Font>) {
    this.type = partial.type;
    this.name = partial.name;
    this.size = partial.size;
  }
}
