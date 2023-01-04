import { Controller, Get, Param } from '@nestjs/common';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':publicId')
  async getByPublicId(@Param('publicId') publicId: string) {
    const form = await this.formService.findByPublicId(publicId);
    if (form.isPublic) {
    }
  }
}
