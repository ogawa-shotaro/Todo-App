"use client";

import SignupForm from "@/features/users/components/signupForm";
import { useAuthUserRedirect } from "@/hooks/useAuthUserRedirect";

const SignupPage = () => {
  useAuthUserRedirect();
  return <SignupForm />;
};

export default SignupPage;
