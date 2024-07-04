import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = PaymentModel & Document;

@Schema()
export class PaymentModel {
  @Prop({ required: true })
  bankAccountId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop()
  description: string;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentModel);
