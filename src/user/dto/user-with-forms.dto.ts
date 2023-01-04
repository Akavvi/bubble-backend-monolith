import { User, Form } from '@prisma/client';
import { FormDto } from '../../form/dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserWithFormsDto {
  @ApiProperty()
  email: string;

  @ApiProperty({ type: [FormDto] })
  forms: FormDto[];

  constructor(partial: Partial<User & { forms?: Form[] }>) {
    this.email = partial.email;
    this.forms = partial.forms?.map((form) => new FormDto(form)) ?? [];
  }
}
