"use client";

import { useRouter } from "next/navigation";
import type { MouseEventHandler, FC } from "react";

import { useAppDispatch } from "@/stores/hooks";
import { createSignoutAction } from "@/features/users/stores/reducers/signoutReducer";
import HamburgerButton from "@/components/shared/hamburgerButton";
import { RedButton } from "@/components/shared/buttons";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    dispatch(createSignoutAction());
    router.push("/");
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between  items-center">
      <div className="flex items-center">
        <HamburgerButton />
        <h1 className="text-2xl font-bold">Todo App</h1>
      </div>
      <RedButton label="ログアウト" onClick={handleSubmit} />
    </header>
  );
};

export default Header;
