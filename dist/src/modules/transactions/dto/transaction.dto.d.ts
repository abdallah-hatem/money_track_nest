export declare class CreateTransactionDto {
    amount: number;
    type: string;
    category?: string;
    description: string;
    email: string;
}
export declare class TransactionShortcutDto {
    amount: number;
    type: string;
    description: string;
    email: string;
}
export declare class ParseTextDto {
    text: string;
    email: string;
}
