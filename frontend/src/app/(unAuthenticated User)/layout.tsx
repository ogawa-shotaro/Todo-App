"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/stores/hooks";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user) {
      router.push("/todo");
    }
  }, [authState.user]);

  return <div>{children}</div>;
}
