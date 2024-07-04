export interface IBankAccount {
    _id?: string;
    name: string;
    type: BankAccountType;
    initialBalance: number;
    userId: string
  }

  export enum BankAccountType {
    current = 'corrente',
    saving = 'poupança',
  }