import { IsOptional, IsString } from 'class-validator';
import { StyleDto } from './style.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  style?: StyleDto;
}
