import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post('/create')
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.create(dto.type, dto.formId);
  }
  @Get('/:id')
  getQuestionsInForm(@Param('id') id: number) {
    return this.questionService.getAllQuestionsInForm(id);
  }
}
