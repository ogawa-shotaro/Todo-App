export interface AuthState {
  signup: {
    inProgress: boolean;
    isSucceeded: boolean;
    error: SignupError | null;
  };
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export type SignupResponse = SignupSuccess | SignupError;

export type SignupSuccess = undefined;
export interface SignupError {
  message: string[] | string;
}
