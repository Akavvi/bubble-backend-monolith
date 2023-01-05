import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto';
import { CreateOptionDto } from './dto/create-options.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly question = this.prismaService.question;

  async create(dto: CreateQuestionDto) {
    try {
      return this.question.create({
        data: {
          type: dto.type,
          formId: dto.formId,
          options: {
            create: this.__normalizeOptions(dto.options),
          },
        },
      });
    } catch {
      throw new BadRequestException('Form is not exists');
    }
  }

  async getAllQuestionsInForm(formId: number) {
    return this.question.findMany({
      where: {
        formId: formId,
      },
    });
  }

  private __normalizeOptions(options: CreateOptionDto[]) {
    return options.map((i) => {
      i.row = i.row ?? null;
      i.cell = i.cell ?? null;
      i.value = i.value ?? null;
    });
  }
}
