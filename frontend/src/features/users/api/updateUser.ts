import type {
  SignupInput as UpdateUserInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const updateUserApi = async (
  formData: UpdateUserInput
): Promise<AuthResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();

    throw errorData;
  }
  const { name, email } = await response.json();

  return { user: { name, email } };
};
