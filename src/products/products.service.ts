import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { AdjustProductDto } from './dto/adjust-product.dto';
import { Transaction } from '../transactions/entities/transaction.entity';
import { TransactionType } from '../transactions/entities/transaction.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  private calculateStatus(quantity: number): ProductStatus {
    if (quantity === 0) return ProductStatus.OUT_OF_STOCK;
    if (quantity < 10) return ProductStatus.LOW_STOCK;
    return ProductStatus.IN_STOCK;
  }

  async create(createProductDto: CreateProductDto, userId: string): Promise<Product> {
    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      quantity: createProductDto.initialQuantity,
    });
    const savedProduct = await this.productRepository.save(product);

    const transaction = this.transactionRepository.create({
      type: TransactionType.PRODUCT_CREATED,
      userId,
      productId: savedProduct.id,
      quantityChange: createProductDto.initialQuantity,
      previousQuantity: 0,
      newQuantity: createProductDto.initialQuantity,
    });
    await this.transactionRepository.save(transaction);

    return savedProduct;
  }

  async adjust(
    productId: string,
    adjustProductDto: { quantityChange: number },
    userId: string,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const previousQuantity = product.quantity;
    const newQuantity = previousQuantity + adjustProductDto.quantityChange;

    if (newQuantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }

    product.quantity = newQuantity;
    const updatedProduct = await this.productRepository.save(product);

    const transaction = this.transactionRepository.create({
      type: TransactionType.PRODUCT_ADJUSTED,
      userId,
      productId: product.id,
      quantityChange: adjustProductDto.quantityChange,
      previousQuantity,
      newQuantity,
    });
    await this.transactionRepository.save(transaction);

    return updatedProduct;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getStatus(id: string): Promise<{ id: string; name: string; quantity: number; status: ProductStatus }> {
    const product = await this.findOne(id);
    return {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      status: this.calculateStatus(product.quantity),
    };
  }
}

