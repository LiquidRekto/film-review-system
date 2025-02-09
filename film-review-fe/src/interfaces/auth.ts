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
