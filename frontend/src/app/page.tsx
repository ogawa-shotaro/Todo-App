"use client";

import React from "react";

import Header from "@/components/shared/header";
import { useAuthSigninRedirect } from "@/hooks/useAuthSigninRedirect";

export default function TodoPage() {
  useAuthSigninRedirect();

  return <Header />;
}
