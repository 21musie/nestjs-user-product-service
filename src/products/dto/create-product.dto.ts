import { IsNotEmpty, IsString, IsInt, Min, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  initialQuantity: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

