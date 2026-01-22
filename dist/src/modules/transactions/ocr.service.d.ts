export interface ParsedTransaction {
    amount: number;
    type: 'income' | 'expense';
    description: string;
}
export declare class OCRService {
    extractTextFromImage(imagePath: string): Promise<string>;
    parseMultipleTransactions(text: string): ParsedTransaction[];
    formatTransactionsForInput(transactions: ParsedTransaction[]): string;
}
