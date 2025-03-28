"use client";

import "@/styles/globals.css";
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

import type { User, ResponseError } from "@/types/shared/type";
import type { AuthContextType } from "@/features/auths/types/type";
import { checkAuthApi } from "@/features/auths/api/checkAuth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  error: null,
  setError: () => {},
  loading: false,
  setLoading: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  hasInitialized: false,
  setHasInitialized: () => {},
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        hasInitialized,
        setHasInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
