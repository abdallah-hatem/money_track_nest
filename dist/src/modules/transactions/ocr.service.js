"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCRService = void 0;
const tesseract_js_1 = require("tesseract.js");
class OCRService {
    async extractTextFromImage(imagePath) {
        try {
            const worker = await (0, tesseract_js_1.createWorker)('eng+ara');
            const { data: { text }, } = await worker.recognize(imagePath);
            await worker.terminate();
            return text.trim();
        }
        catch (error) {
            console.error('OCR Error:', error);
            throw new Error('Failed to extract text from image');
        }
    }
    parseMultipleTransactions(text) {
        const transactions = [];
        const lines = text.split('\n').map((line) => line.trim()).filter(line => line.length > 0);
        const amountPattern = /(\d+(?:\.\d+)?)\s*(?:EGP|egp|جنيه)/i;
        const receivedPattern = /received\s+money|استلام|تم الاستلام|Received Money/i;
        const sentPattern = /send\s+money|إرسال|تم الإرسال|Send Money/i;
        const successfulPattern = /successful/i;
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            const amountMatch = line.match(amountPattern);
            if (amountMatch) {
                const amount = parseFloat(amountMatch[1]);
                let description = '';
                let type = null;
                let j = i + 1;
                while (j < lines.length) {
                    const nextLine = lines[j];
                    if (nextLine.match(amountPattern)) {
                        break;
                    }
                    if (receivedPattern.test(nextLine)) {
                        type = 'income';
                    }
                    else if (sentPattern.test(nextLine)) {
                        type = 'expense';
                    }
                    if (!receivedPattern.test(nextLine) &&
                        !sentPattern.test(nextLine) &&
                        !successfulPattern.test(nextLine)) {
                        description += (description ? ' ' : '') + nextLine;
                    }
                    j++;
                }
                if (type) {
                    transactions.push({
                        amount,
                        type,
                        description: description.trim() || 'Transaction',
                    });
                }
                i = j;
            }
            else {
                i++;
            }
        }
        return transactions;
    }
    formatTransactionsForInput(transactions) {
        return transactions
            .map((tx) => {
            const sign = tx.type === 'income' ? '+' : '-';
            let cleanDesc = tx.description;
            const emailMatch = cleanDesc.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
            if (emailMatch) {
                cleanDesc = emailMatch[1];
            }
            else {
                const phoneMatch = cleanDesc.match(/(\d{11})/);
                if (phoneMatch) {
                    cleanDesc = phoneMatch[1];
                }
            }
            return `${sign}${tx.amount} ${cleanDesc} via InstaPay`;
        })
            .join('\n');
    }
}
exports.OCRService = OCRService;
//# sourceMappingURL=ocr.service.js.map