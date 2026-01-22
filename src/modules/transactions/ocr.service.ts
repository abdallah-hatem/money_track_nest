import { createWorker } from 'tesseract.js';

export interface ParsedTransaction {
  amount: number;
  type: 'income' | 'expense';
  description: string;
}

export class OCRService {
  async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      const worker = await createWorker('eng+ara');
      const {
        data: { text },
      } = await worker.recognize(imagePath);
      await worker.terminate();

      return text.trim();
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  parseMultipleTransactions(text: string): ParsedTransaction[] {
    const transactions: ParsedTransaction[] = [];

    // Split text into sections - each transaction typically has amount, name/phone, and type
    const lines = text.split('\n').map((line) => line.trim()).filter(line => line.length > 0);

    // Look for patterns: amount + currency, followed by transaction type
    const amountPattern = /(\d+(?:\.\d+)?)\s*(?:EGP|egp|جنيه)/i;
    const receivedPattern =
      /received\s+money|استلام|تم الاستلام|Received Money/i;
    const sentPattern = /send\s+money|إرسال|تم الإرسال|Send Money/i;
    const successfulPattern = /successful/i;

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // Check if this line contains an amount - this starts a new transaction
      const amountMatch = line.match(amountPattern);
      if (amountMatch) {
        const amount = parseFloat(amountMatch[1]);
        let description = '';
        let type: 'income' | 'expense' | null = null;

        // Look ahead to find the type and description for this transaction
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];

          // If we hit another amount, we've reached the next transaction
          if (nextLine.match(amountPattern)) {
            break;
          }

          // Check for transaction type
          if (receivedPattern.test(nextLine)) {
            type = 'income';
          } else if (sentPattern.test(nextLine)) {
            type = 'expense';
          }

          // Collect description (skip "Successful" and type indicators)
          if (
            !receivedPattern.test(nextLine) &&
            !sentPattern.test(nextLine) &&
            !successfulPattern.test(nextLine)
          ) {
            description += (description ? ' ' : '') + nextLine;
          }

          j++;
        }

        // Save transaction if we found the type
        if (type) {
          transactions.push({
            amount,
            type,
            description: description.trim() || 'Transaction',
          });
        }

        // Move to where the next transaction starts
        i = j;
      } else {
        i++;
      }
    }

    return transactions;
  }

  formatTransactionsForInput(transactions: ParsedTransaction[]): string {
    return transactions
      .map((tx) => {
        const sign = tx.type === 'income' ? '+' : '-';

        // Clean up description - extract email or phone number
        let cleanDesc = tx.description;

        // Extract email if present
        const emailMatch = cleanDesc.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
        if (emailMatch) {
          cleanDesc = emailMatch[1];
        } else {
          // Extract phone number if present (Egyptian format)
          const phoneMatch = cleanDesc.match(/(\d{11})/);
          if (phoneMatch) {
            cleanDesc = phoneMatch[1];
          }
        }

        // Add InstaPay tag
        return `${sign}${tx.amount} ${cleanDesc} via InstaPay`;
      })
      .join('\n');
  }
}
