export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoUpdatedInput extends TodoInput {
  id: number;
}

export interface TodoListRange {
  page: number;
  count: number;
}
