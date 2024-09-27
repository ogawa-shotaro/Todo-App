import type { Request } from "express";

export interface TodoInput extends Request {
  title: string;
  body: string;
  user_id: number;
}

export interface TodoUpdatedInput extends TodoInput {
  id: number;
}

export interface TodoListParams {
  page: number;
  count: number;
}
