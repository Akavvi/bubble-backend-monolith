import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsHexColor()
  @IsOptional()
  hexColor: string;
}
