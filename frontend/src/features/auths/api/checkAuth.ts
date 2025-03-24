export const checkAuthApi = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!response.ok) return;

  const { name, email } = await response.json();

  return { user: { name, email } };
};
