"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { MouseEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { createSignoutAction } from "@/features/users/stores/reducers/signoutReducer";
import HamburgerButton from "./hamburgerButton";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user === null) {
      router.push("/signin");
    }
  }, [authState.user]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    dispatch(createSignoutAction());
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 flex justify-between  items-center">
        <div className="flex items-center">
          <HamburgerButton />
          <h1 className="text-2xl font-bold">Todo App</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          ログアウト
        </button>
      </header>
    </div>
  );
};

export default Header;
