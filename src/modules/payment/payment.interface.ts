export interface Payment {
  _id?: string;
  bankAccountId: string;
  amount: number;
  date: Date;
  description: string;
}