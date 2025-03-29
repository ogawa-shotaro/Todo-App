export interface SigninInput {
  email: string;
  password: string;
}

export interface SignupInput extends SigninInput {
  name: string;
}
