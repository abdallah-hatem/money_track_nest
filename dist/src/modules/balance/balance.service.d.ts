import { BalanceRepository } from './balance.repository';
import { Balance } from '@prisma/client';
export declare class BalanceService {
    private balanceRepository;
    constructor(balanceRepository: BalanceRepository);
    getBalance(userId: string): Promise<Balance | null>;
    updateBalance(userId: string, amount: number): Promise<Balance>;
    setBalance(userId: string, total: number): Promise<Balance>;
}
