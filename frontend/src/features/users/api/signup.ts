import type { SignupInput, SignupResponse } from "../types";

export const signupApi = async (
  formData: SignupInput
): Promise<SignupResponse> => {
  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errorData = await response.json();

    return errorData;
  }
  return undefined as SignupResponse;
};
