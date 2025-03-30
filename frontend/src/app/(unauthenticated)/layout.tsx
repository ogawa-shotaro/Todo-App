"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthUserContext } from "@/contexts/authUserContext";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAuthUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/todos");
    }
  }, [isLoggedIn]);

  return <div>{children}</div>;
}
