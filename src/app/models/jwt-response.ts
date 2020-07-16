export interface JwtResponse {
  token: string;
}

export interface UserLog{
  email: string;
  password: string;
}

export interface UserLogged {
  id : number;
  actor : string;
}

