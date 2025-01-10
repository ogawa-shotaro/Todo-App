"use client";

import "@/styles/globals.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

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
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
