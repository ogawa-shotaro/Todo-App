export interface UserRegisterInput {
  name: string;
  password: string;
  email: string;
}

export interface UserLoginInput {
  password: string;
  email: string;
}
