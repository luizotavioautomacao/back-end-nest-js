export interface AddBankAccountModel {
    name: string,
    type: BankAccountType,
    initialBalance: number
}

export enum BankAccountType {
    current = 'corrente',
    saving = 'poupança',
}

export interface IAddBankAccount {
    add(bankAccount: AddBankAccountModel): Promise<void>
}