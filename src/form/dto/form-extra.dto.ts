import { FormDto } from './form.dto';
import { Style, Font, Form, User, Question } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { StyleDto } from './style.dto';
import { UserDto } from '../../user/dto';
import { QuestionDto } from '../../question/dto';

export class FormExtraDto extends FormDto {
  @ApiProperty()
  style: StyleDto;

  @ApiProperty()
  owner: UserDto;

  @ApiProperty()
  questions: QuestionDto[];

  constructor(
    partial: Partial<
      Form & {
        owner: User;
        style: Style & { fonts: Font[] };
        questions: Question[];
      }
    >,
  ) {
    super(partial);

    this.style = new StyleDto(partial.style);
    this.owner = new UserDto(partial.owner);
    this.questions = partial.questions.map(
      (question) => new QuestionDto(question),
    );
  }
}
