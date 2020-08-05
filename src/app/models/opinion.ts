import { BasicReader } from './reader';
export interface Opinion {
  id: number,
  positive: boolean,
  review: string,
  date: Date,
  book: number
  user: BasicReader;
}

export interface OpinionToSave {
  opinion_id: number,
  positive: boolean,
  review: string,
  date: Date,
  book_id: number,
  reader_id: number
}
