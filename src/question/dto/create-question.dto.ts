import { QuestionType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  formId: number;

  @ApiProperty({ enum: ['TEXT', 'RADIO', 'CHECK', 'TABLE', 'IMAGE'] })
  @IsEnum(QuestionType)
  type: QuestionType;
}
