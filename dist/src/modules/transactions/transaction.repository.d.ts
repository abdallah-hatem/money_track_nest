import { PrismaService } from '../../common/prisma/prisma.service';
import { Transaction, Prisma } from '@prisma/client';
export declare class TransactionRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TransactionCreateInput): Promise<Transaction>;
    findAll(userId: string): Promise<Transaction[]>;
    findToday(userId: string): Promise<Transaction[]>;
}
