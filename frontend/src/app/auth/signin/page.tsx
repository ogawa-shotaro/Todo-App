"use client";

import SigninForm from "@/features/users/components/signinForm";
import { useAuthUserRedirect } from "@/hooks/useAuthUserRedirect";

const SigninPage = () => {
  useAuthUserRedirect();
  return <SigninForm />;
};

export default SigninPage;
