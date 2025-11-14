import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AdjustProductDto } from './dto/adjust-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto, createProductDto.userId);
  }

  @Put('products/adjust')
  @HttpCode(HttpStatus.OK)
  async adjust(@Body() adjustProductDto: AdjustProductDto) {
    return await this.productsService.adjust(
      adjustProductDto.productId,
      adjustProductDto,
      adjustProductDto.userId,
    );
  }

  @Get('status/:productId')
  @HttpCode(HttpStatus.OK)
  async getStatus(@Param('productId') productId: string) {
    return await this.productsService.getStatus(productId);
  }
}

