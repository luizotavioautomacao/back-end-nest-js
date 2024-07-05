import { Controller, Get, Post, Body, Request, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GetReportResponse, PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BankAccountService } from '../bank-account/bank-account.service';
import { IBankAccount } from '../bank-account/bank-account.interface';
import { IPayment } from './payment.interface';
import { InvalidBankAccount } from 'src/presentation/errors/invalid-bank-account';
import { InsufficientBalance } from 'src/presentation/errors/insufficient-balance';
import { MinioS3Service } from '../minio-s3/minio-s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly bankAccountService: BankAccountService,
        private readonly minioS3Service: MinioS3Service,
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
    async getPaymentsReport(@Request() req, @Body() body: { bankAccountId: string, startDate: Date, endDate: Date }): Promise<GetReportResponse | Error> {
        const { bankAccountId, startDate, endDate } = body
        const bankAccount: IBankAccount = await this.bankAccountService.getBankAccountById(bankAccountId)
        if (req.user.admin || req.user._id === bankAccount.userId) {
            return this.paymentService.getPaymentsReport({ bankAccount, startDate, endDate });
        }
        return new InvalidBankAccount();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('paymentId') paymentId: string) {
        const imageUrl = await this.minioS3Service.uploadFile(file);
        await this.paymentService.addImageToPayment({ paymentId, imageUrl });
        return { imageUrl };
    }
}