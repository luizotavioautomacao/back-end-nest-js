export interface IPayment {
  _id?: string;
  bankAccountId: string;
  amount: number;
  date: Date;
  description: string;
  imageUrl?: string
}