import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, TransactionShortcutDto } from './dto/transaction.dto';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(dto: CreateTransactionDto): Promise<{
        id: string;
        userId: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
    }>;
    findAll(email: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
    }[]>;
    getSummary(email: string): Promise<{
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
    importShortcut(dto: TransactionShortcutDto): Promise<{
        id: string;
        userId: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
    }>;
    parseText(dto: {
        text: string;
        email: string;
    }): Promise<{
        id: string;
        userId: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
    }>;
}
