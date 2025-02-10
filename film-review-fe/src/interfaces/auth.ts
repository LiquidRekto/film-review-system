export interface IAccountLogin {
  username: string;
  password: string;
}

export interface IAccountRegister {
  firstName: string;
  lastName: string;
  dob: Date;
  phoneNumber: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAccountInfo {
  id: string;
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
