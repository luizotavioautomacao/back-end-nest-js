import { AddBankAccountModel } from "src/domain/usecases/add-bank-account";

export interface IAddBankAccountRepository {
    add(bankAccountData: AddBankAccountModel): Promise<void>
}