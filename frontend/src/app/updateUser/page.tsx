"use client";

import UpdateUserForm from "@/features/users/components/updateUserForm";
import { useAuthSigninRedirect } from "@/hooks/useAuthSigninRedirect";

const UpdateUserPage = () => {
  useAuthSigninRedirect();

  return <UpdateUserForm />;
};

export default UpdateUserPage;
