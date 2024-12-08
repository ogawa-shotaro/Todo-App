export interface AuthState {
  signup: {
    inProgress: boolean;
    isSucceeded: boolean;
    error: SignupResponse | null;
  };
  user: {
    name: string;
    email: string;
  };
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  user?: {
    name: string;
    email: string;
  };
  message?: string[] | string;
}
