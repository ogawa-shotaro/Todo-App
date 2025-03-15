export type UserId = number;

export interface UserRegisterInput {
  name: string;
  password: string;
  email: string;
}

export interface UserLoginInput {
  password: string;
  email: string;
}

export interface UserUpdateInput {
  userId: number;
  name?: string;
  password?: string;
  email?: string;
}
