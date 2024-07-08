export interface AddBankAccountModel {
    name: string,
    type: string,
    initialBalance: number
}

export interface IAddBankAccount {
    add(bankAccount: AddBankAccountModel): Promise<void>
}