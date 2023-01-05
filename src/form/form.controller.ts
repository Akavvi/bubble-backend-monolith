import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Form } from '@prisma/client';
import { User } from 'src/common/decorators';
import { CreateFormDto } from './dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':publicId')
  async getByPublicId(
    @Param('publicId') publicId: string,
  ): Promise<Form | null> {
    const form = await this.formService.findByPublicId(publicId);
    if (form.isPublic) {
      return form;
    } else {
      return null;
    }
  }

  @Post('/create')
  async create(
    @Body()
    dto: CreateFormDto,
    @User('sub') ownerId: number,
  ): Promise<Form> {
    return this.formService.create(dto, ownerId);
  }
}
