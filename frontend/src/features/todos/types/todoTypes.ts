interface Todo {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

type TODO_STATUS =
  | "waiting"
  | "working"
  | "pending"
  | "discontinued"
  | "completed";

export interface TodoState {
  inProgress: boolean;
  todo: Todo | null;
  isModalOpen: boolean;
  status: TODO_STATUS;
  error: null | TodoResponseError;
}

export interface TodoInput {
  title: string;
  body: string;
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
  message?: string[] | string;
}
