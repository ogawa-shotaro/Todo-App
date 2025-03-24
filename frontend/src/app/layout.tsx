"use client";

import "@/styles/globals.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import { createContext, useState, useContext, useEffect } from "react";

import type { User, ResponseError, ApiResponse } from "@/types/shared/type";
import type { AuthContextType } from "@/features/auths/types/type";
import Header from "@/components/shared/layouts/header";
import Footer from "@/components/shared/layouts/footer";
import Toast from "@/components/shared/toast";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ResponseError | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useContext<AuthContextType>(AuthContext);

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
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
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
          <Provider store={store}>
            <Header />
            <main className="flex-1">{children}</main>
            <Toast />
            <Footer />
          </Provider>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
