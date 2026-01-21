import Tesseract from 'tesseract.js';

export class OCRService {
  async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imagePath, 'eng+ara', {
        // Use both English and Arabic
        logger: (m) => console.log(m),
      });

      return text.trim();
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('Failed to extract text from image');
    }
  }
}
