"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { type AuthContextType, AuthContext } from "@/app/layout";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useContext<AuthContextType>(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/todos");
    }
  }, [isLoggedIn]);

  return <div>{children}</div>;
}
