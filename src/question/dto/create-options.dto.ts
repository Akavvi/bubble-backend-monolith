import { IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsOptional()
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  cell: string;

  @IsOptional()
  @IsString()
  row: string;
}
