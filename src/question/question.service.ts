import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionType } from '@prisma/client';
import { FormService } from 'src/form/form.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly forms: FormService,
  ) {}

  private readonly question = this.prismaService.question;

  async create(type: QuestionType, formId: number) {
    return this.question.create({
      data: {
        type,
        formId,
      },
    });
  }

  async getAllQuestionsInForm(formId: number) {
    return this.question.findMany({
      where: {
        formId,
      },
    });
  }
}
