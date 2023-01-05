import { ApiProperty } from '@nestjs/swagger';
import { Question, QuestionType } from '@prisma/client';

export class QuestionDto {
  @ApiProperty({ enum: ['TEXT', 'RADIO', 'CHECK', 'TABLE', 'IMAGE'] })
  type: QuestionType;

  constructor(partial: Partial<Question>) {
    this.type = partial.type;
  }
}
