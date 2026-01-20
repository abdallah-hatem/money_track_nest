export interface ParsedTransaction {
    amount: number;
    type: 'income' | 'expense';
    description: string;
}
export declare function parseRawText(text: string): ParsedTransaction | null;
