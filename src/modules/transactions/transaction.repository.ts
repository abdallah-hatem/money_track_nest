import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Transaction, Prisma } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    return this.prisma.transaction.create({
      data,
    });
  }

  async findAll(userId: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findToday(userId: string): Promise<Transaction[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
      orderBy: { date: 'desc' },
    });
  }
}
