export interface Book {
  id: number,
  title: string,
  description: string,
  language: string,
  cover?: string,
  draft: boolean,
  identifier: string,
  genre?: string,
  publisher?: number,
  writer: number,
  readers: number[]
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
