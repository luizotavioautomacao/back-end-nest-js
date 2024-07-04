import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { BankAccountModel, BankAccountSchema } from './bank-account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BankAccountModel.name, schema: BankAccountSchema }])],
  providers: [BankAccountService],
  controllers: [BankAccountController],
})
export class BankAccountModule { }