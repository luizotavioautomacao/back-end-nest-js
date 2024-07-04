import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaymentDocument, PaymentModel } from './payment.schema'
import { Payment } from './payment.interface'
import { BankAccount } from '../bank-account/bank-account.interface'
import { BankAccountService } from '../bank-account/bank-account.service'

interface PaymentParams {
    bankAccount: BankAccount,
    payment: Payment
}

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(PaymentModel.name) private paymentModel: Model<PaymentDocument>,
        private bankAccountService: BankAccountService,
    ) { }

    async createPayment(paymentParams: PaymentParams): Promise<PaymentModel> {
        const { bankAccount, payment } = paymentParams
        payment.date = new Date()
        const createdPayment = new this.paymentModel(paymentParams.payment)
        createdPayment.save()
        bankAccount.initialBalance = bankAccount.initialBalance - payment.amount
        this.bankAccountService.updateBankAccount(bankAccount)
        return createdPayment
    }

}
