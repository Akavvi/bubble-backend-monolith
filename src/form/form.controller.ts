import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { CreateFormDto } from './dto';
import { FormService } from './form.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards';
import { FormExtraDto } from './dto/form-extra.dto';

@ApiTags('form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':publicId')
  async getByPublicId(@Param('publicId') publicId: string) {
    const form = await this.formService.findByPublicId(publicId);
    return form.isPublic ? new FormExtraDto(form) : null;
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async create(@Body() dto: CreateFormDto, @User('sub') ownerId: number) {
    const form = await this.formService.create(dto, ownerId);
    return new FormExtraDto(form);
  }
}
