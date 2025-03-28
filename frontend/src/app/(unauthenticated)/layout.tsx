"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/authContext";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/todos");
    }
  }, [isLoggedIn]);

  return <div>{children}</div>;
}
