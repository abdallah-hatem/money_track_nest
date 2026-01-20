import { BalanceService } from './balance.service';
export declare class BalanceController {
    private balanceService;
    constructor(balanceService: BalanceService);
    getBalance(userId: string): Promise<{
        id: string;
        userId: string;
        total: number;
        updatedAt: Date;
    } | null>;
    updateBalance(data: {
        userId: string;
        total: number;
    }): Promise<{
        id: string;
        userId: string;
        total: number;
        updatedAt: Date;
    }>;
}
