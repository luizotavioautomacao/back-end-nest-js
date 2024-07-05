import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaymentDocument, Payment } from './payment.schema'
import { IPayment } from './payment.interface'
import { IBankAccount } from '../bank-account/bank-account.interface'
import { BankAccountService } from '../bank-account/bank-account.service'

interface PaymentParams {
    bankAccount: IBankAccount,
    payment: IPayment
}

interface GetReportParams {
    bankAccount: IBankAccount,
    startDate?: Date,
    endDate?: Date
}

export interface GetReportResponse {
    bankAccount: IBankAccount,
    totalPayments: number
    payments: IPayment[]
    startDate?: Date,
    endDate?: Date,
}

interface AddImageToPaymentParams {
    paymentId: string,
    imageUrl: string
}

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
        private bankAccountService: BankAccountService,
    ) { }

    async createPayment(paymentParams: PaymentParams): Promise<Payment> {
        const { bankAccount, payment } = paymentParams
        payment.date = new Date()
        const createdPayment = new this.paymentModel(paymentParams.payment)
        createdPayment.save()
        bankAccount.initialBalance = bankAccount.initialBalance - payment.amount
        this.bankAccountService.updateBankAccount(bankAccount)
        return createdPayment
    }

    private async findPaymentsByQuery(query): Promise<Payment[]> {
        return this.paymentModel.find(query).exec();
    }

    async getPaymentsReport(getReportParams: GetReportParams): Promise<GetReportResponse> {
        const payments: Payment[] = await this.findPaymentsByQuery(
            {
                bankAccountId: getReportParams.bankAccount._id,
                date: { $gte: getReportParams.startDate },
            })
        let totalPayments = 0
        for (const payment of payments) {
            totalPayments += payment.amount;
        }
        return {
            bankAccount: getReportParams.bankAccount,
            totalPayments: -totalPayments,
            payments,
            startDate: getReportParams.startDate,
            endDate: getReportParams.endDate,
        }
    }

    async addImageToPayment(addImageToPaymentParams: AddImageToPaymentParams): Promise<Payment> {
        const payment = await this.paymentModel.findByIdAndUpdate(addImageToPaymentParams.paymentId, { imageUrl: addImageToPaymentParams.imageUrl }, { new: true }).exec();
        return payment
    }

}
