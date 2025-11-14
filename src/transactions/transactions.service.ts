import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionQueryDto } from './dto/transaction-query.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(queryDto: TransactionQueryDto): Promise<{
    data: Transaction[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');

    if (queryDto.userId) {
      queryBuilder.andWhere('transaction.userId = :userId', { userId: queryDto.userId });
    }

    if (queryDto.productId) {
      queryBuilder.andWhere('transaction.productId = :productId', {
        productId: queryDto.productId,
      });
    }

    if (queryDto.type) {
      queryBuilder.andWhere('transaction.type = :type', { type: queryDto.type });
    }

    const total = await queryBuilder.getCount();

    queryBuilder
      .orderBy('transaction.createdAt', 'DESC')
      .skip(queryDto.offset || 0)
      .take(queryDto.limit || 10);

    const data = await queryBuilder.getMany();

    return {
      data,
      total,
      limit: queryDto.limit || 10,
      offset: queryDto.offset || 0,
    };
  }
}

