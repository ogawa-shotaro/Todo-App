export interface TodoInput {
  title: string;
  body: string;
  userId: number;
}

export interface TodoFindParams {
  todoId: number;
  userId: number;
}

export interface TodoDeletionParams {
  todoId: number;
  userId: number;
}

export interface TodoModificationParams extends TodoInput {
  id: number;
}

export interface TodoListParams {
  userId: number;
  page?: number;
  count?: number;
}
