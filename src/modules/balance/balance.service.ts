import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { Balance } from '@prisma/client';

@Injectable()
export class BalanceService {
  constructor(private balanceRepository: BalanceRepository) {}

  async getBalance(userId: string): Promise<Balance | null> {
    return this.balanceRepository.findByUserId(userId);
  }

  async updateBalance(userId: string, amount: number): Promise<Balance> {
    return this.balanceRepository.update(userId, amount);
  }

  async setBalance(userId: string, total: number): Promise<Balance> {
    return this.balanceRepository.set(userId, total);
  }
}
