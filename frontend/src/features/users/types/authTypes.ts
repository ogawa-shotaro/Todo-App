export interface AuthState {
  inProgress: boolean;
  isSucceeded: boolean;
  error: AuthResponseError | null;
  user: {
    name: string;
    email: string;
  };
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
