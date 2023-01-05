import { ApiProperty } from '@nestjs/swagger';
import { FontDto } from './font.dto';

export class StyleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  formId: number;

  @ApiProperty()
  fonts: FontDto[];

  @ApiProperty()
  hexColor: string;

  @ApiProperty()
  backgroundHexColors: string[];
}
