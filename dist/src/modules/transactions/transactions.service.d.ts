import { TransactionRepository } from './transaction.repository';
import { BalanceService } from '../balance/balance.service';
import { UsersService } from '../users/users.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from '@prisma/client';
export declare class TransactionsService {
    private transactionRepository;
    private balanceService;
    private usersService;
    constructor(transactionRepository: TransactionRepository, balanceService: BalanceService, usersService: UsersService);
    addTransaction(dto: CreateTransactionDto): Promise<Transaction>;
    getHistory(email: string): Promise<Transaction[]>;
    getDailySummary(email: string): Promise<{
        transactions: {
            id: string;
            userId: string;
            amount: number;
            type: string;
            category: string;
            description: string;
            date: Date;
        }[];
        totalIncome: number;
        totalExpense: number;
    }>;
    processRawText(text: string, email: string): Promise<Transaction>;
}
