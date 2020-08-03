import { BookSimple } from './book';
export interface Chapter {
  id: number,
  title: string,
  number: number,
  text: string,
  book: BookSimple
}
