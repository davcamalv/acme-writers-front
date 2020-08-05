import { CreditCard } from './credit-card';
export interface Writer {
  id: number,
  name: string,
  email: string,
  password: string,
  address?: string,
  phone_number?: string,
  photo: string,
  credit_card: CreditCard
}
