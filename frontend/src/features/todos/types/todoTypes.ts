interface Todo {
  id?: number;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoState {
  inProgress: boolean;
  todoPage: { items: Todo[]; totalCount: number };
  error: null | TodoResponseError;
}

export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoListParams {
  page?: number;
}

export interface TodoListProps {
  todos: Todo[];
}

export interface TodoResponseError {
  message?: string[] | string;
}

export interface TodoResponse {
  todo?: {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
  };
  items?: Todo[];
  totalCount?: number;
  message?: string[] | string;
}
