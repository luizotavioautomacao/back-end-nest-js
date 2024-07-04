import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentDocument, PaymentModel } from './payment.schema';
import { Payment } from './payment.interface';

@Injectable()
export class PaymentService {
    constructor(@InjectModel(PaymentModel.name) private paymentModel: Model<PaymentDocument>) { }

    async createPayment(createPayment: Payment): Promise<PaymentModel> {
        const createdPayment = new this.paymentModel(createPayment);
        return createdPayment.save();
    }

}
