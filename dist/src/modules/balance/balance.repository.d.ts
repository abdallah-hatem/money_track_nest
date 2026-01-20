import { PrismaService } from '../../common/prisma/prisma.service';
import { Balance } from '@prisma/client';
export declare class BalanceRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: string): Promise<Balance | null>;
    update(userId: string, amount: number): Promise<Balance>;
    set(userId: string, total: number): Promise<Balance>;
}
