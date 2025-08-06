"use client";

import {
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

import type { User, ResponseError, ApiResponse } from "@/types/shared/type";
import type { SigninInput, SignupInput } from "@/features/auths/types/type";
import type { UpdateInput } from "@/features/users/types/type";
import { checkAuthApi } from "@/features/auths/api/checkAuth";
import { signupApi } from "@/features/auths/api/signup";
import { signinApi } from "@/features/auths/api/signin";
import { signoutApi } from "@/features/auths/api/signout";
import { updateUserApi } from "@/features/users/api/updateUser";
import { deleteUserApi } from "@/features/users/api/deleteUser";

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
  deleteUser: () => Promise<boolean>;
}

const AuthUserContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType
);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ResponseError | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      (async () => {
        const response = await checkAuthApi();
        if (!response?.user) return;
        setHasInitialized(true);
        setIsLoggedIn(true);
      })();
    }
  }, []);

  const signup = async (formData: SignupInput) => {
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

  const signin = async (formData: SigninInput) => {
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

  const signout = async () => {
    try {
      await signoutApi();

      setUser(null);
      setHasInitialized(false);
      setIsLoggedIn(false);
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
    }
  };

  const updateUser = async (formData: UpdateInput) => {
    try {
      setError(null);
      setLoading(true);
      const response = await updateUserApi(formData);
      setUser((response as ApiResponse).user);
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setError(null);
      setLoading(true);
      await deleteUserApi();
      setUser(null);
      setHasInitialized(false);
      setIsLoggedIn(false);
      return true;
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthUserContext.Provider
      value={{
        user,
        error,
        loading,
        isLoggedIn,
        hasInitialized,
        signin,
        signup,
        signout,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);
