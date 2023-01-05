import { User, Form } from '@prisma/client';
import { FormDto } from '../../form/dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserExtraDto extends UserDto {
  @ApiProperty({ type: [FormDto] })
  forms: FormDto[];

  constructor(partial: Partial<User & { forms: Form[] }>) {
    super(partial);

    this.forms = partial.forms.map((form) => new FormDto(form));
  }
}
