export interface ParsedTransaction {
  amount: number;
  type: 'income' | 'expense';
  description: string;
}

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

export function parseRawText(text: string): ParsedTransaction | null {
  const normalized = text.toLowerCase();

  // 1. Extract Amount (Looking for numbers with optional currency symbols)
  // Matches "123", "123.45", "EGP 100", "100$"
  // Added support for Arabic digits (optionally) but let's stick to standard digits as they are common in bank SMS
  const amountRegex = /(\d+(?:\.\d+)?)/;
  const amountMatch = normalized.match(amountRegex);

  if (!amountMatch) return null;
  const amount = parseFloat(amountMatch[1]);

  // 2. Determine Type
  let type: 'income' | 'expense' = 'expense'; // Default to expense

  if (INCOME_KEYWORDS.some((kw) => normalized.includes(kw))) {
    type = 'income';
  } else if (EXPENSE_KEYWORDS.some((kw) => normalized.includes(kw))) {
    type = 'expense';
  }

  return {
    amount,
    type,
    description: text,
  };
}
