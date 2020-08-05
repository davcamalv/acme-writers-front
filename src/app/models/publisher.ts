import { CreditCard } from './credit-card';
export interface Publisher {
  id: number,
  name: string,
  email: string,
  password: string,
  address?: string,
  phone_number?: string,
  photo: string,
  VAT: string,
  comercial_name: string,
  credit_card: CreditCard
}
