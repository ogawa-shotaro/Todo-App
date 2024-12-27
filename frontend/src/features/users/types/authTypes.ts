interface User {
  name: string;
  email: string;
}

export interface AuthState {
  inProgress: boolean;
  user: User | null;
  isUserUpdateAuthorized: boolean;
  error: AuthResponseError | null;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface SignupInput extends SigninInput {
  name: string;
}

export interface AuthResponse {
  user?: {
    name: string;
    email: string;
  };
  message?: string[] | string;
}

export interface AuthResponseError {
  message?: string[] | string;
}
