"use client";

import "@/styles/globals.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
