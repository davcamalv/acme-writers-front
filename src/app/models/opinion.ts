import { BasicReader } from './reader';
export interface Opinion {
  id: number,
  positive: boolean,
  review: string,
  date: Date,
  book: number
  user: BasicReader;

}
