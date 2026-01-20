"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const transaction_repository_1 = require("./transaction.repository");
const balance_service_1 = require("../balance/balance.service");
const users_service_1 = require("../users/users.service");
const categorization_1 = require("../../common/utils/categorization");
const parser_1 = require("../../common/utils/parser");
const common_2 = require("@nestjs/common");
let TransactionsService = class TransactionsService {
    transactionRepository;
    balanceService;
    usersService;
    constructor(transactionRepository, balanceService, usersService) {
        this.transactionRepository = transactionRepository;
        this.balanceService = balanceService;
        this.usersService = usersService;
    }
    async addTransaction(dto) {
        const user = await this.usersService.findOrCreate(dto.email);
        const category = dto.category || (0, categorization_1.autoCategorize)(dto.description);
        const transaction = await this.transactionRepository.create({
            amount: dto.amount,
            type: dto.type,
            category,
            description: dto.description,
            user: { connect: { id: user.id } },
        });
        const balanceChange = dto.type === 'income' ? dto.amount : -dto.amount;
        await this.balanceService.updateBalance(user.id, balanceChange);
        return transaction;
    }
    async getHistory(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return [];
        return this.transactionRepository.findAll(user.id);
    }
    async getDailySummary(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return { totalIncome: 0, totalExpense: 0, transactions: [] };
        const transactions = await this.transactionRepository.findToday(user.id);
        const summary = transactions.reduce((acc, t) => {
            if (t.type === 'income')
                acc.totalIncome += t.amount;
            else
                acc.totalExpense += t.amount;
            return acc;
        }, { totalIncome: 0, totalExpense: 0 });
        return { ...summary, transactions };
    }
    async processRawText(text, email) {
        const parsed = (0, parser_1.parseRawText)(text);
        if (!parsed) {
            throw new common_2.BadRequestException('Could not parse transaction from text');
        }
        return this.addTransaction({
            amount: parsed.amount,
            type: parsed.type,
            description: parsed.description,
            email: email,
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository,
        balance_service_1.BalanceService,
        users_service_1.UsersService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map