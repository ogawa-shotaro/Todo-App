export const signoutApi = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData = await response.json();

    throw errorData;
  }

  return undefined;
};
