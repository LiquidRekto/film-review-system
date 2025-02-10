export interface IAccountLogin {
  username: string;
  password: string;
}

export interface IAccountInfo {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  dob: Date;
  email: string;
  phone_number: string;
  role: string;
}

export interface ITokenInfo {
  token: string;
}

export interface IAccountRegister {
  first_name: string;
  last_name: string;
  dob: Date;
  phone_number: string;
  username: string;
  email: string;
  password_hash: string;
  role: string;
}
