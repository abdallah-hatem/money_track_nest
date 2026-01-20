import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionRepository } from './transaction.repository';
import { TransactionsController } from './transactions.controller';
import { BalanceModule } from '../balance/balance.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [BalanceModule, UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository],
})
export class TransactionsModule {}
