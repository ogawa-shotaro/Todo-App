import { useContext } from "react";

import type { ApiResponse } from "@/types/shared/type";
import type {
  AuthContextType,
  SigninInput,
  SignupInput,
} from "@/features/auths/types/type";
import { AuthContext } from "@/app/layout";
import { signinApi } from "@/features/auths/api/signin";
import { signupApi } from "@/features/auths/api/signup";

export const useAuthHandler = () => {
  const { setUser, setError, setLoading, setIsLoggedIn, setHasInitialized } =
    useContext<AuthContextType>(AuthContext);

  const handleSignup = async (formData: SignupInput) => {
    try {
      setError(null);
      setLoading(true);
      const response = await signupApi(formData);
      setUser((response as ApiResponse).user);
      setHasInitialized(true);
      setIsLoggedIn(true);
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (formData: SigninInput) => {
    try {
      setError(null);
      setLoading(true);
      const response = await signinApi(formData);
      setUser((response as ApiResponse).user);
      setHasInitialized(true);
      setIsLoggedIn(true);
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
    } finally {
      setLoading(false);
    }
  };
  return { handleSignin, handleSignup };
};
