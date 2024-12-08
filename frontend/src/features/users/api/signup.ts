import type { SignupInput, SignupResponse } from "../types/signupTypes";

export const signupApi = async (
  formData: SignupInput
): Promise<SignupResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData = await response.json();

    throw errorData;
  }
  const { name, email } = await response.json();

  return { user: { name, email } };
};
