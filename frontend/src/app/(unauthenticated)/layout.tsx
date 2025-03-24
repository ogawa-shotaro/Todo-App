"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/app/layout";
import type { AuthContextType } from "@/features/auths/types/type";

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
