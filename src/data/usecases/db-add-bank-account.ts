import { AddBankAccountModel, IAddBankAccount } from "src/domain/usecases/add-bank-account";
import { IAddBankAccountRepository } from "../protocols/db/bank-account/add-bank-account-repository";

export class DbAddBankAccount implements IAddBankAccount {
    constructor(private readonly addBankAccountRepository: IAddBankAccountRepository) { }
    async add(data: AddBankAccountModel): Promise<void> {
        await this.addBankAccountRepository.add(data)
    }
}