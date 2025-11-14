import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export enum TransactionType {
  PRODUCT_CREATED = 'PRODUCT_CREATED',
  PRODUCT_ADJUSTED = 'PRODUCT_ADJUSTED',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'integer' })
  quantityChange: number;

  @Column({ type: 'integer' })
  previousQuantity: number;

  @Column({ type: 'integer' })
  newQuantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, (product) => product.transactions)
  @JoinColumn({ name: 'productId' })
  product: Product;
}

