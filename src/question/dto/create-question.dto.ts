import { QuestionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateOptionDto } from './create-options.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  formId: number;

  @ApiProperty({ enum: ['TEXT', 'RADIO', 'CHECK', 'TABLE', 'IMAGE'] })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}
