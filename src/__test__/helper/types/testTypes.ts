export type TodoResponseType = {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updateAt: Date;
};

export type RequestAPIArg = {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  statusCode: number;
};
