export interface Reader {
  id: number,
  name: string,
  email: string,
  password: string,
  address?: string,
  phone_number?: string,
  photo: string,
}

export interface BasicReader {
  id: number,
  name: string,
  photo?: string
}
