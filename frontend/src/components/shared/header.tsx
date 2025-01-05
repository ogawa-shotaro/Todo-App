"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { MouseEventHandler, FC } from "react";

import { useAppDispatch } from "@/stores/hooks";
import { createSignoutAction } from "@/features/users/stores/reducers/signoutReducer";
import HamburgerButton from "@/components/shared/hamburgerButton";
import { RedButton } from "@/components/shared/buttons";
import { BlueButtonWithBorder } from "./buttons";

interface HeaderProps {
  currentPage: "top" | "content";
}

const Header: FC<HeaderProps> = ({ currentPage }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    dispatch(createSignoutAction());
    localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between  items-center">
      {currentPage === "top" && (
        <>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
              Todo App
            </h1>
          </div>
          <div className="ml-auto flex space-x-4">
            <Link href="/signin">
              <BlueButtonWithBorder label="サインイン" />
            </Link>
            <Link href="/signup">
              <BlueButtonWithBorder label="サインアップ" />
            </Link>
          </div>
        </>
      )}
      {currentPage === "content" && (
        <>
          <div className="flex items-center">
            <HamburgerButton />
            <Link href="/todo">
              <h1 className="text-3xl font-bold">Todo App</h1>
            </Link>
          </div>
          <RedButton label="ログアウト" onClick={handleSubmit} />
        </>
      )}
    </header>
  );
};

export default Header;
