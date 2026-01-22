import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TransactionsService } from './transactions.service';
import { OCRService } from './ocr.service';
import {
  CreateTransactionDto,
  TransactionShortcutDto,
} from './dto/transaction.dto';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class TransactionsController {
  private ocrService: OCRService;

  constructor(private transactionsService: TransactionsService) {
    this.ocrService = new OCRService();
  }

  @Post('transactions')
  async create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.addTransaction(dto);
  }

  @Get('transactions')
  async findAll(@Query('email') email: string) {
    return this.transactionsService.getHistory(email);
  }

  @Get('summary/today')
  async getSummary(@Query('email') email: string) {
    return this.transactionsService.getDailySummary(email);
  }

  @Post('shortcut/import')
  async importShortcut(@Body() dto: TransactionShortcutDto) {
    // Shortcut import is essentially a simple create without explicit category
    return this.transactionsService.addTransaction(dto);
  }

  @Post('transactions/parse')
  async parseText(@Body() dto: { text: string; email: string }) {
    return this.transactionsService.processRawText(dto.text, dto.email);
  }

  @Post('transactions/ocr')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `screenshot-${uniqueSuffix}${path.extname(file.originalname)}`);
        },
      }),
    }),
  )
  async extractTextFromImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('email') email: string,
  ) {
    try {
      // Extract text using OCR
      const extractedText = await this.ocrService.extractTextFromImage(
        file.path,
      );

      console.log('=== OCR EXTRACTED TEXT ===');
      console.log(extractedText);
      console.log('=== END EXTRACTED TEXT ===');

      // Parse multiple transactions intelligently
      const transactions = this.ocrService.parseMultipleTransactions(extractedText);

      console.log('=== PARSED TRANSACTIONS ===');
      console.log(JSON.stringify(transactions, null, 2));
      console.log('=== END PARSED TRANSACTIONS ===');

      // Format for the text input (one transaction per line with +/- signs)
      const formattedText = this.ocrService.formatTransactionsForInput(transactions);

      console.log('=== FORMATTED TEXT ===');
      console.log(formattedText);
      console.log('=== END FORMATTED TEXT ===');

      // Clean up uploaded file
      fs.unlinkSync(file.path);

      // Return formatted text and parsed transactions
      return {
        text: formattedText,
        rawText: extractedText,
        transactions
      };
    } catch (error) {
      // Clean up file on error
      if (file && file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }
}
