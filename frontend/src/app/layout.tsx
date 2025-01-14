"use client";

import { useEffect } from "react";
import "@/styles/globals.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { clearToast } from "@/stores/toastSlice";

function HandlerShowToast() {
  const message = useAppSelector((state) => state.toast.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      toast(message.text, {
        type: message.type,
        onClose: () => dispatch(clearToast()),
      });
    }
  }, [message]);

  return null;
}

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
          {/* トーストの状態管理 */}
          <HandlerShowToast />
          {/* トースト表示 */}
          <ToastContainer
            position="top-center"
            className="custom-toast-container"
            autoClose={2000}
          />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
