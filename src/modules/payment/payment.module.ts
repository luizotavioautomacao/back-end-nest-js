import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment, PaymentSchema } from './payment.schema';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { MinioS3Module } from '../minio-s3/minio-s3.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    BankAccountModule,
    MinioS3Module
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
