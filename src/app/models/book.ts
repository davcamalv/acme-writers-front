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
