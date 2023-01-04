import { IsOptional, IsString } from 'class-validator';
import { StyleDto } from './style.dto';

export class CreateFormDto {
  @IsString()
  name: string;

  @IsOptional()
  style: StyleDto;
}
