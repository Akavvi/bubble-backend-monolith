import { ApiProperty } from '@nestjs/swagger';
import { FontType } from '@prisma/client';
import { StyleDto } from './style.dto';

export class FontDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: FontType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  styleId: number;

  @ApiProperty()
  style: StyleDto;
}
