export interface TodoInput {
  title: string;
  body: string;
  user: { id: number };
}

export interface TodoFindParams {
  userId: number;
  todoId: number;
}

export interface TodoUpdatedInput extends TodoInput {
  id: number;
}

export interface TodoListParams {
  userId: number;
  todoListRange?: {
    page?: number;
    count?: number;
  };
}
