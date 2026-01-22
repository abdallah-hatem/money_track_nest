import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, TransactionShortcutDto } from './dto/transaction.dto';
export declare class TransactionsController {
    private transactionsService;
    private ocrService;
    constructor(transactionsService: TransactionsService);
    create(dto: CreateTransactionDto): Promise<{
        id: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
        userId: string;
    }>;
    findAll(email: string): Promise<{
        id: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
        userId: string;
    }[]>;
    getSummary(email: string): Promise<{
        transactions: {
            id: string;
            amount: number;
            type: string;
            category: string;
            description: string;
            date: Date;
            userId: string;
        }[];
        totalIncome: number;
        totalExpense: number;
    }>;
    importShortcut(dto: TransactionShortcutDto): Promise<{
        id: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
        userId: string;
    }>;
    parseText(dto: {
        text: string;
        email: string;
    }): Promise<{
        id: string;
        amount: number;
        type: string;
        category: string;
        description: string;
        date: Date;
        userId: string;
    }>;
    extractTextFromImage(file: Express.Multer.File, email: string): Promise<{
        text: string;
        rawText: string;
        transactions: import("./ocr.service").ParsedTransaction[];
    }>;
}
