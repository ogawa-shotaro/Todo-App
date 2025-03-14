export interface UserRegisterInput {
  name: string;
  password: string;
  email: string;
}

export interface UserId {
  userId: number;
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
