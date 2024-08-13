import type {
  TodoInput,
  TodoListParams,
  TodoUpdatedInput,
} from "../../../types/TodoRequest.type";

export type KeyOfMethods = "save" | "list" | "find" | "update" | "delete";

export type CallDataMapType = {
  [Key in KeyOfMethods]: CallDataType<Key>;
};

export type CallDataType<Key extends KeyOfMethods> = {
  callCount: number;
  argumentStack: ArgumentStackTypeMap[Key];
};

export type ArgumentStackTypeMap = {
  save: TodoInput[];
  list: TodoListParams[];
  find: number[];
  update: TodoUpdatedInput[];
  delete: number[];
};

export type TodoResponseType = {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updateAt: Date;
};
