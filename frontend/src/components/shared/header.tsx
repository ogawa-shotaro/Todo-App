"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { MouseEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { createSignoutAction } from "@/features/users/stores/reducers/signoutReducer";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const signoutState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (signoutState.isSignedOut) {
      router.push("/signin");
    }
  }, [signoutState.isSignedOut]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    dispatch(createSignoutAction());
  };

  if (signoutState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Todo App</h1>
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
