"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/shared/header";

export default function TopPage() {
  const router = useRouter();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      router.push("/todo");
    }
  }, []);

  return (
    <div>
      <Header currentPage="top" />
      <h1>トップページ</h1>
    </div>
  );
}
