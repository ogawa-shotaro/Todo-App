"use client";

import Link from "next/link";
import type { FC } from "react";

import { BlueButtonWithBorder } from "./buttons";

const TopPageHeader: FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-center items-center relative">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Todo App
        </h1>
      </div>
      <div className="ml-auto flex space-x-4">
        <Link href="/auth/signin">
          <BlueButtonWithBorder label="サインイン" />
        </Link>
        <Link href="/auth/signup">
          <BlueButtonWithBorder label="サインアップ" />
        </Link>
      </div>
    </header>
  );
};

export default TopPageHeader;
