import type { TodoFindParams } from "@/features/todos/types/type";

export const deleteTodoApi = async (
  params: TodoFindParams
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${params.id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return true;
};
