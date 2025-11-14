import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, UsersModule, ProductsModule, TransactionsModule],
  controllers: [AppController],
})
export class AppModule {}

