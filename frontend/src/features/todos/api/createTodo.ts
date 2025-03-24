import type { TodoInput, TodoResponse } from "@/features/todos/types/type";

export const createTodoApi = async (
  formData: TodoInput
): Promise<TodoResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();

    throw errorData;
  }
  const { id, title, body, createdAt, updatedAt } = await response.json();

  return { todo: { id, title, body, createdAt, updatedAt } };
};
