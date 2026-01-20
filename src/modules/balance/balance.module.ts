import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceRepository } from './balance.repository';
import { BalanceController } from './balance.controller';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository],
  exports: [BalanceService, BalanceRepository],
})
export class BalanceModule {}
