import type { ResponseError } from "@/types/shared/type";

export interface Todo {
  id?: number;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoState {
  inProgress: boolean;
  todoPage: { items: Todo[]; totalCount: number };
  error: null | ResponseError;
}

export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoFindParams {
  id?: number;
}

export interface TodoUpdateInput extends TodoFindParams {
  title?: string;
  body?: string;
}

export interface TodoListParams {
  page?: number;
}

export interface TodoListProps {
  todos: Todo[];
  onDeleteSuccess: () => Promise<void>;
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
