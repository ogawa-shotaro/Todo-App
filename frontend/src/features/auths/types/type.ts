import type { User, ResponseError } from "@/types/shared/type";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  error: ResponseError | null;
  setError: React.Dispatch<React.SetStateAction<ResponseError | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  hasInitialized: boolean;
  setHasInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface SignupInput extends SigninInput {
  name: string;
}
