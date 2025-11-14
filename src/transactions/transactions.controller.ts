import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionQueryDto } from './dto/transaction-query.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() queryDto: TransactionQueryDto) {
    return await this.transactionsService.findAll(queryDto);
  }
}

