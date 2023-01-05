import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards';
import { FormService } from 'src/form/form.service';
import { CreateQuestionDto } from './dto';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly formService: FormService,
  ) {}

  @Post('/create')
  @UseGuards(JwtGuard)
  async create(@Body() dto: CreateQuestionDto, @User('sub') userId: number) {
    const form = await this.formService.findById(dto.formId);
    if (form.ownerId !== userId) throw new ForbiddenException();
    return this.questionService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get('/:formId')
  getQuestionsInForm(@Param('id') formId: number) {
    return this.questionService.getAllQuestionsInForm(formId);
  }
}
