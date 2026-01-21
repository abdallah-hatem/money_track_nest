"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCRService = void 0;
const tesseract_js_1 = require("tesseract.js");
class OCRService {
    async extractTextFromImage(imagePath) {
        try {
            const { data: { text }, } = await tesseract_js_1.default.recognize(imagePath, 'eng+ara', {
                logger: (m) => console.log(m),
            });
            return text.trim();
        }
        catch (error) {
            console.error('OCR Error:', error);
            throw new Error('Failed to extract text from image');
        }
    }
}
exports.OCRService = OCRService;
//# sourceMappingURL=ocr.service.js.map