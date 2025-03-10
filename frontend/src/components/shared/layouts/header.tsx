"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { MouseEventHandler, FC } from "react";

import { type AuthContextType, AuthContext } from "@/app/layout";
import { useAppDispatch } from "@/stores/hooks";
import { createSignoutAction } from "@/features/users/stores/reducers/signoutReducer";
import HamburgerButton from "@/components/shared//buttons/hamburgerButton";
import { RedButton } from "@/components/shared/buttons/buttons";
import { BlueButtonWithBorder } from "@/components/shared/buttons/buttons";

const Header: FC = () => {
  const { isLoggedIn, setIsLoggedIn } =
    useContext<AuthContextType>(AuthContext);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    dispatch(createSignoutAction());

    setIsLoggedIn(false);
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">Todo App</Link>
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
      </header>
    );
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <HamburgerButton />
        <h1 className="text-3xl font-bold">
          {" "}
          <Link href="/todos">Todo App</Link>
        </h1>
      </div>
      <RedButton label="ログアウト" onClick={handleSubmit} />
    </header>
  );
};

export default Header;
