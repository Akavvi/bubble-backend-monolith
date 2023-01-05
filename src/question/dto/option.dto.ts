import { ApiProperty } from '@nestjs/swagger';

export class OptionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cell: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  row: string;

  @ApiProperty()
  questionId: number;
}
