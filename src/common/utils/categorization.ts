export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: [
    'kfc',
    'pizza',
    'market',
    'carrefour',
    'restaurant',
    'mcdonalds',
    'food',
    'مطعم',
    'اكل',
    'سوبر ماركت',
    'هايبر ماركت',
  ],
  Transport: [
    'uber',
    'careem',
    'taxi',
    'bus',
    'fuel',
    'gas',
    'اوبر',
    'كريم',
    'تاكسي',
    'مواصلات',
    'بنزين',
  ],
  Bills: [
    'vodafone',
    'electric',
    'internet',
    'water',
    'gas',
    'bill',
    'فودافون',
    'كهرباء',
    'انترنت',
    'مياه',
    'غاز',
    'فاتورة',
  ],
  Shopping: [
    'amazon',
    'store',
    'mall',
    'clothing',
    'shoes',
    'امازون',
    'محل',
    'مول',
    'ملابس',
    'شراء',
  ],
  Salary: ['salary', 'payroll', 'bonus', 'راتب', 'مرتب', 'حافز'],
};

export const FALLBACK_CATEGORY = 'Other';

export function autoCategorize(description: string): string {
  const desc = description.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => desc.includes(keyword))) {
      return category;
    }
  }
  return FALLBACK_CATEGORY;
}
