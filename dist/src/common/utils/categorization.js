"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FALLBACK_CATEGORY = exports.CATEGORY_KEYWORDS = void 0;
exports.autoCategorize = autoCategorize;
exports.CATEGORY_KEYWORDS = {
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
exports.FALLBACK_CATEGORY = 'Other';
function autoCategorize(description) {
    const desc = description.toLowerCase();
    for (const [category, keywords] of Object.entries(exports.CATEGORY_KEYWORDS)) {
        if (keywords.some((keyword) => desc.includes(keyword))) {
            return category;
        }
    }
    return exports.FALLBACK_CATEGORY;
}
//# sourceMappingURL=categorization.js.map