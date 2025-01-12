"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TopPage() {
  const searchParams = useSearchParams();
  const toastMessage = searchParams.get("toastMessage");

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, [toastMessage]);

  return (
    <div>
      <h1>トップページ</h1>
      {/* トースト */}
      <ToastContainer
        position="top-center"
        className="custom-toast-container"
        autoClose={2000}
      />
    </div>
  );
}
