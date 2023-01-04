import { QuestionType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsInt()
  formId: number;

  @IsEnum(QuestionType)
  type: QuestionType;
}
