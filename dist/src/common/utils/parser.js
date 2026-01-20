"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRawText = parseRawText;
const INCOME_KEYWORDS = [
    'credited',
    'received',
    'deposit',
    'plus',
    'income',
    'salary',
    'added',
    'ايداع',
    'تم اضافة',
    'تم تحويل',
    'تم استلام',
    'وارد',
    'دخل',
];
const EXPENSE_KEYWORDS = [
    'debited',
    'spent',
    'paid',
    'withdrawn',
    'minus',
    'expense',
    'purchase',
    'سحب',
    'تم خصم',
    'تم ارسال',
    'تم إرسال',
    'صرف',
    'خروج',
    'مدفوعات',
    'مشتريات',
];
function parseRawText(text) {
    const normalized = text.toLowerCase();
    const amountRegex = /(\d+(?:\.\d+)?)/;
    const amountMatch = normalized.match(amountRegex);
    if (!amountMatch)
        return null;
    const amount = parseFloat(amountMatch[1]);
    let type = 'expense';
    if (INCOME_KEYWORDS.some((kw) => normalized.includes(kw))) {
        type = 'income';
    }
    else if (EXPENSE_KEYWORDS.some((kw) => normalized.includes(kw))) {
        type = 'expense';
    }
    return {
        amount,
        type,
        description: text,
    };
}
//# sourceMappingURL=parser.js.map