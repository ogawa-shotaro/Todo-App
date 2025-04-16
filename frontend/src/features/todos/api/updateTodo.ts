import type {
  TodoResponse,
  TodoUpdateInput,
} from "@/features/todos/types/type";

export const updateTodoApi = async (
  updatedata: TodoUpdateInput
): Promise<TodoResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${updatedata.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updatedata.title, body: updatedata.body }),
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
