import type { ApiResponse } from "@/types/shared/type";
import type { SigninInput, SignupInput } from "@/features/auths/types/type";
import { useAuthContext } from "@/contexts/authContext";
import { signinApi } from "@/features/auths/api/signin";
import { signupApi } from "@/features/auths/api/signup";

export const useAuthHandler = () => {
  const { setUser, setError, setLoading, setIsLoggedIn, setHasInitialized } =
    useAuthContext();

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
