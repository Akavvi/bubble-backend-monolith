import { ApiProperty } from '@nestjs/swagger';

export class StyleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  formId: number;

  @ApiProperty()
  font: string;

  @ApiProperty()
  hexColor: string;

  @ApiProperty()
  backgroundHexColors: string[];
}
