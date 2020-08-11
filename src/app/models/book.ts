import { BasicPublisher } from './publisher';
import { BasicWriter } from './writer';
export interface Book {
  id: number,
  title: string,
  description: string,
  language: string,
  cover?: string,
  draft: boolean,
  identifier: string,
  genre?: string,
  publisher?: BasicPublisher,
  writer: BasicWriter,
  readers: number[],
  status: string
}

export interface BookToSave {
  book_id: number,
  title: string,
  description: string,
  language: string,
  cover?: string,
  genre?: string,
  publisher_id?: number,
}

export interface BookSimple {
  id: number,
  title: string,
  draft: boolean,
}

export interface BookStatus {
  book_id: number,
  status: string,
}
