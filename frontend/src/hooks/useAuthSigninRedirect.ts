import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/stores/hooks";

export const useAuthSigninRedirect = () => {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user === null) {
      router.push("/signin");
    }
  }, [authState.user]);
};
