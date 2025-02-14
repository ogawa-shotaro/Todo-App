import type {
  TodoListParams,
  TodoResponse,
} from "@/features/todos/types/todoTypes";

export const getTodosApi = async (
  paramsData: TodoListParams
): Promise<TodoResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/todos?page=${paramsData.page}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData = await response.json();

    throw errorData;
  }
  const pageResult = await response.json();

  return pageResult;
};
