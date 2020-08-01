export interface Reader {
  id: number,
  name: string,
  email: string,
  password: string,
  address?: string,
  phone_number?: string
}

export interface BasicReader {
  name: string,
  photo?: string
}
