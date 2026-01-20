import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  TransactionShortcutDto,
} from './dto/transaction.dto';

@Controller()
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

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
}
