import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BankAccount } from '../bank-account/bank-account.interface';
import { Payment } from './payment.interface';
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
    async createPayment(@Request() req, @Body() body: { bankAccountId: string, amount: number, date: Date, description: string }): Promise<Payment | Error> {
        const { bankAccountId, amount, date, description } = body
        const bankAccount: BankAccount = await this.bankAccountService.getBankAccountById(bankAccountId)
        if (req.user._id != bankAccount.userId) return new InvalidBankAccount()
        if (bankAccount.initialBalance < amount) return new InsufficientBalance()
        return this.paymentService.createPayment({ payment: body, bankAccount });
    }

}