export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoUpdatedInput extends TodoInput {
  id: number;
}

export interface TodoListParams {
  page: number;
  count: number;
}
