import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccountModel, BankAccountDocument } from './bank-account.schema';
import { IBankAccount } from './bank-account.interface';


@Injectable()
export class BankAccountService {

    constructor(@InjectModel(BankAccountModel.name) private accountModel: Model<BankAccountDocument>) { }

    async createBankAccount(bankAccount: IBankAccount): Promise<BankAccountModel> {
        if (bankAccount.initialBalance < 0) bankAccount.initialBalance = 0 // deveria estar em domain
        const newAccount = new this.accountModel(bankAccount);
        return newAccount.save();
    }

    async getAllBankAccounts(): Promise<BankAccountModel[]> {
        return this.accountModel.find().exec();
    }

    async getBankAccountById(id: string): Promise<BankAccountModel> {
        return this.accountModel.findById(id).exec();
    }

    async updateBankAccount(bankAccount: IBankAccount): Promise<BankAccountModel> {
        return this.accountModel.findByIdAndUpdate(bankAccount._id, bankAccount, { new: true }).exec();
    }

    async deleteBankAccount(id: string): Promise<BankAccountModel> {
        return this.accountModel.findByIdAndDelete(id).exec();
    }

}
