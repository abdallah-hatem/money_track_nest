import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { BalanceService } from '../balance/balance.service';
import { UsersService } from '../users/users.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from '@prisma/client';
import { autoCategorize } from '../../common/utils/categorization';
import { parseRawText } from '../../common/utils/parser';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(
    private transactionRepository: TransactionRepository,
    private balanceService: BalanceService,
    private usersService: UsersService,
  ) {}

  async addTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const user = await this.usersService.findOrCreate(dto.email);

    const category = dto.category || autoCategorize(dto.description);

    const transaction = await this.transactionRepository.create({
      amount: dto.amount,
      type: dto.type,
      category,
      description: dto.description,
      user: { connect: { id: user.id } },
    });

    const balanceChange = dto.type === 'income' ? dto.amount : -dto.amount;
    await this.balanceService.updateBalance(user.id, balanceChange);

    return transaction;
  }

  async getHistory(email: string): Promise<Transaction[]> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return [];
    return this.transactionRepository.findAll(user.id);
  }

  async getDailySummary(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return { totalIncome: 0, totalExpense: 0, transactions: [] };

    const transactions = await this.transactionRepository.findToday(user.id);
    const summary = transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') acc.totalIncome += t.amount;
        else acc.totalExpense += t.amount;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 },
    );

    return { ...summary, transactions };
  }

  async processRawText(text: string, email: string): Promise<Transaction> {
    const parsed = parseRawText(text);
    if (!parsed) {
      throw new BadRequestException('Could not parse transaction from text');
    }

    return this.addTransaction({
      amount: parsed.amount,
      type: parsed.type,
      description: parsed.description,
      email: email,
    });
  }
}
