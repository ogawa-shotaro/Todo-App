"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/stores/hooks";
import Header from "@/components/shared/header";

export default function TodoPage() {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user === null) {
      router.push("/signin");
    }
  }, [authState.user]);
  return <Header />;
}
