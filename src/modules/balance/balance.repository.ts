import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Balance } from '@prisma/client';

@Injectable()
export class BalanceRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Balance | null> {
    return this.prisma.balance.findUnique({
      where: { userId },
    });
  }

  async update(userId: string, amount: number): Promise<Balance> {
    return this.prisma.balance.upsert({
      where: { userId },
      update: {
        total: {
          increment: amount,
        },
      },
      create: {
        userId,
        total: amount,
      },
    });
  }

  async set(userId: string, total: number): Promise<Balance> {
    return this.prisma.balance.upsert({
      where: { userId },
      update: { total },
      create: {
        userId,
        total,
      },
    });
  }
}
