import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BankAccountType } from './bank-account.interface';

export type BankAccountDocument = BankAccount & Document;

@Schema()
export class BankAccount {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: BankAccountType })
  type: BankAccountType;

  @Prop({ default: 0 })
  initialBalance: number;

  @Prop({ required: true })
  userId: string;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);