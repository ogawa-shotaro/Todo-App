"use client";

import type { MouseEventHandler, FC } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { createSignoutAction } from "@/features/users/stores/reducers/signoutReducer";
import HamburgerButton from "@/components/shared/hamburgerButton";
import { RedButton } from "@/components/shared/buttons";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

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
        <RedButton label="ログアウト" onClick={handleSubmit} />
      </header>
    </div>
  );
};

export default Header;
