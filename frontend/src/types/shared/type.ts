import type { SignupInput, SigninInput } from "@/features/auths/types/type";
import type { UpdateInput } from "@/features/users/types/type";

export interface User {
  name: string;
  email: string;
}

export interface AuthUserContextType {
  user: User | null;
  error: ResponseError | null;
  loading: boolean;
  isLoggedIn: boolean;
  hasInitialized: boolean;
  signin: (input: SigninInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  signout: () => Promise<void>;
  updateUser: (input: UpdateInput) => Promise<void>;
  deleteUser: () => Promise<void>;
}

export interface ResponseError {
  message?: string | string[];
}

export interface ApiResponse {
  user: {
    name: string;
    email: string;
  };
  message?: string | string[];
}
