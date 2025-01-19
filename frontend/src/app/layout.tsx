"use client";

import "@/styles/globals.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";

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
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          <Header />
          <main className="flex-1">{children}</main>
          <Toast />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
