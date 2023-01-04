import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  form_id: number;
}
