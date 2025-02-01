export interface TodoInput {
  title: string;
  body: string;
  userId: number;
}

export interface TodoFindParams {
  todoId: number;
  userId: number;
}

export type TodoDeletionParams = TodoFindParams;

export interface TodoModificationParams extends TodoInput {
  id: number;
}

export interface TodoListParams {
  userId: number;
  page?: number;
  count?: number;
}
