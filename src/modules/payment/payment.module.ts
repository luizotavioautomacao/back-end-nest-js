import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentModel, PaymentSchema } from './payment.schema';
import { BankAccountModule } from '../bank-account/bank-account.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentModel.name, schema: PaymentSchema }]),
    BankAccountModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
