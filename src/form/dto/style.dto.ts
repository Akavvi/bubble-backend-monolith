import { ApiProperty } from '@nestjs/swagger';
import { FontDto } from './font.dto';
import { Style, Font } from '@prisma/client';

export class StyleDto {
  @ApiProperty()
  hex_color: string;

  @ApiProperty()
  background_hex_colors: string[];

  @ApiProperty()
  fonts: FontDto[];

  constructor(partial: Partial<Style & { fonts: Font[] }>) {
    this.hex_color = partial.hexColor;
    this.background_hex_colors = partial.backgroundHexColors;
    this.fonts = partial.fonts.map((font) => new FontDto(font));
  }
}
