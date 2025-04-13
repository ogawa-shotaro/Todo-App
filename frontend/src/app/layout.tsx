"use client";

import "@/styles/globals.css";
import { Provider } from "react-redux";

import { ContextProvider as AuthContextProvider } from "@/contexts/authUserContext";
import { store } from "@/stores/store";
import fonts from "@/components/shared/fonts/fonts";
import Header from "@/components/shared/layouts/header";
import Footer from "@/components/shared/layouts/footer";
import Toast from "@/components/shared/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${fonts.playfair.className} ${fonts.noto.className} flex flex-col min-h-screen`}
      >
        <AuthContextProvider>
          <Provider store={store}>
            <Header />
            <main className="flex-1">{children}</main>
            <Toast />
            <Footer />
          </Provider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
