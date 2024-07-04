import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPayment(@Body() body: { bankAccountId: string, amount: number, date: Date, description: string }) {
        return this.paymentService.createPayment(body);
    }

}