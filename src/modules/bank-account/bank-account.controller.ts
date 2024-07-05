import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { IBankAccount, BankAccountType } from './bank-account.interface';
import { UnauthorizedError } from 'src/presentation/errors/unauthorized-error';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bank-account')
@Controller('bank-account')
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBankAccount(@Request() req, @Body() body: { name: string, type: BankAccountType, initialBalance: number }): Promise<IBankAccount> {
        const { name, type, initialBalance } = body
        return this.bankAccountService.createBankAccount({ name: name, type, initialBalance, userId: req.user._id });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllBankAccounts(@Request() req): Promise<IBankAccount[] | Error> {
        if (!req.user.admin) {
            return new UnauthorizedError()
        }
        return this.bankAccountService.getAllBankAccounts();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getBankAccountById(@Request() req, @Param('id') id: string): Promise<IBankAccount | Error> {
        const bankAccount: IBankAccount = await this.bankAccountService.getBankAccountById(id)
        if (bankAccount.userId != req.user._id) return new UnauthorizedError()
        return this.bankAccountService.getBankAccountById(id);
    }

    // // essa rota não deve existir em teoria pois o admin não pode ter o poder de alterar um valor
    // @UseGuards(JwtAuthGuard)
    // @Put(':id')
    // async updateBankAccount(@Request() req, @Param('id') id: string, @Body() body: { name: string, accountType: string, initialBalance: number }): Promise<BankAccount|Error> {
    //     if (!req.user.admin) {
    //         return new UnauthorizedError()
    //     }
    //     return this.bankAccountService.updateBankAccount(id, body.name, body.accountType, body.initialBalance);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Delete(':id')
    // async deleteBankAccount(@Request() req, @Param('id') id: string): Promise<BankAccount | Error> {
    //     const bankAccount: BankAccount = await this.bankAccountService.getBankAccountById(id)
    //     if (bankAccount.userId != req.user._id) return new UnauthorizedError()
    //     return this.bankAccountService.deleteBankAccount(id);
    // }
}