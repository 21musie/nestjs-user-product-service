import { IsNotEmpty, IsInt, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class AdjustProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  quantityChange: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

