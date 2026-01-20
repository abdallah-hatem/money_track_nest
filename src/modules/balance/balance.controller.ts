import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller()
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get('balance')
  async getBalance(@Query('userId') userId: string) {
    return this.balanceService.getBalance(userId);
  }

  @Patch('balance')
  async updateBalance(@Body() data: { userId: string; total: number }) {
    return this.balanceService.setBalance(data.userId, data.total);
  }
}
