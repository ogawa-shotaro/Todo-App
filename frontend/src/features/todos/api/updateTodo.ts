import type {
  TodoResponse,
  TodoUpdateInput,
} from "@/features/todos/types/type";

export const updateTodoApi = async (
  todoItem: TodoUpdateInput
): Promise<TodoResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${todoItem.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: todoItem.title, body: todoItem.body }),
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData = await response.json();

    throw errorData;
  }

  const updatedTodo = await response.json();

  return { todo: updatedTodo };
};
