"use client";

import "@/styles/globals.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import { createContext, useState, useContext, useEffect } from "react";

import Header from "@/components/shared/layouts/header";
import Footer from "@/components/shared/layouts/footer";
import Toast from "@/components/shared/toast";
import { checkAuthApi } from "@/features/users/api/checkAuth";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  hasInitialized: boolean;
  setHasInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    if (!hasInitialized) {
      (async () => {
        const result = await checkAuthApi();
        if (result) {
          setHasInitialized(true);
          setIsLoggedIn(true);
        }
      })();
    }
  }, []);

  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <AuthContext.Provider
          value={{
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
