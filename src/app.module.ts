import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BalanceModule } from './modules/balance/balance.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [UsersModule, BalanceModule, TransactionsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
