import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsHexColor()
  hexColor?: string;
}
