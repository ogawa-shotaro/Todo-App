"use client";

import type { MouseEventHandler, FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthContext } from "@/contexts/authContext";
import HamburgerButton from "@/components/shared//buttons/hamburgerButton";
import { RedButton } from "@/components/shared/buttons/buttons";
import { BlueButtonWithBorder } from "@/components/shared/buttons/buttons";
import { signoutApi } from "@/features/auths/api/signout";

const Header: FC = () => {
  const { setUser, isLoggedIn, setIsLoggedIn, setHasInitialized } =
    useAuthContext();
  const router = useRouter();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    (async () => {
      await signoutApi();

      setUser(null);
      setHasInitialized(false);
      setIsLoggedIn(false);
    })();

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
