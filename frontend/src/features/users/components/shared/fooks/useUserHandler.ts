import { useState } from "react";

import type { ApiResponse } from "@/types/shared/type";
import type { UpdateInput } from "@/features/users/types/type";
import { useAuthContext } from "@/contexts/authContext";
import { updateUserApi } from "@/features/users/api/updateUser";
import { deleteUserApi } from "@/features/users/api/deleteUser";

export const useUserHandler = () => {
  const { setUser, setLoading, setError, setHasInitialized, setIsLoggedIn } =
    useAuthContext();
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUserUpdate = async (formData: UpdateInput) => {
    try {
      setError(null);
      setLoading(true);
      const response = await updateUserApi(formData);
      setUser((response as ApiResponse).user);
      setIsUpdated(true);
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      setError(null);
      setLoading(true);
      await deleteUserApi();
      setUser(null);
      setHasInitialized(false);
      setIsLoggedIn(false);
    } catch (error) {
      setError({ message: (error as ApiResponse).message });
    } finally {
      setLoading(false);
    }
  };

  return { handleUserUpdate, isUpdated, handleUserDelete, setIsUpdated };
};
