"use client";

import type { MouseEventHandler, FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthUserContext } from "@/contexts/authUserContext";
import HamburgerButton from "@/components/shared//buttons/hamburgerButton";
import { IndigoButtonWithBorder } from "@/components/shared/buttons/buttons";

const Header: FC = () => {
  const { signout, isLoggedIn } = useAuthUserContext();
  const router = useRouter();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signout();
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <header className="bg-indigo-900 text-white p-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">Todo App</Link>
          </h1>
        </div>
        <div className="ml-auto flex space-x-4">
          <Link href="/signin">
            <IndigoButtonWithBorder label="サインイン" />
          </Link>
          <Link href="/signup">
            <IndigoButtonWithBorder label="サインアップ" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-indigo-900 text-white p-6 flex justify-between items-center">
      <div className="flex items-center">
        <HamburgerButton />
        <h1 className="text-3xl font-bold">
          {" "}
          <Link href="/todos">Todo App</Link>
        </h1>
      </div>
      <IndigoButtonWithBorder label="ログアウト" onClick={handleSubmit} />
    </header>
  );
};

export default Header;
