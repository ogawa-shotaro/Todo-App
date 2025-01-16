"use client";

import { useEffect } from "react";
import type { FC } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { clearToast } from "@/stores/toastSlice";

const Toast: FC = () => {
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

  return (
    <ToastContainer
      position="top-center"
      className="custom-toast-container"
      autoClose={2000}
    />
  );
};

export default Toast;
