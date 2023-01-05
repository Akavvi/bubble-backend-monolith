import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.create(dto.type, dto.formId);
  }

  @UseGuards(JwtGuard)
  @Get('/:formId')
  getQuestionsInForm(@Param('id') formId: number) {
    return this.questionService.getAllQuestionsInForm(formId);
  }
}
