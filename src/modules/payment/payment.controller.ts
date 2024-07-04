import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { GetReportResponse, PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BankAccountService } from '../bank-account/bank-account.service';
import { IBankAccount } from '../bank-account/bank-account.interface';
import { IPayment } from './payment.interface';
import { InvalidBankAccount } from 'src/presentation/errors/invalid-bank-account';
import { InsufficientBalance } from 'src/presentation/errors/insufficient-balance';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly bankAccountService: BankAccountService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPayment(@Request() req, @Body() body: { bankAccountId: string, amount: number, date: Date, description: string }): Promise<IPayment | Error> {
        const { bankAccountId, amount, date, description } = body
        const bankAccount: IBankAccount = await this.bankAccountService.getBankAccountById(bankAccountId)
        if (req.user._id != bankAccount.userId) return new InvalidBankAccount()
        if (bankAccount.initialBalance < amount) return new InsufficientBalance()
        return this.paymentService.createPayment({ payment: body, bankAccount });
    }

    @UseGuards(JwtAuthGuard)
    @Post('report')
    async getReport(@Request() req, @Body() body: { bankAccountId: string, startDate: Date, endDate: Date }): Promise<GetReportResponse | Error> {
        const { bankAccountId, startDate, endDate } = body
        const bankAccount: IBankAccount = await this.bankAccountService.getBankAccountById(bankAccountId)
        if (req.user.admin || req.user._id === bankAccount.userId) {
            return this.paymentService.getReport({ bankAccount, startDate, endDate });
        }
        return new InvalidBankAccount();
    }

}