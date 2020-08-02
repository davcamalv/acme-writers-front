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
  writer: number

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
