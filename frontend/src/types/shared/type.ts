export interface User {
  name: string;
  email: string;
}

export interface ResponseError {
  message?: string | string[];
}

export interface ApiResponse {
  user: {
    name: string;
    email: string;
  };
  message?: string | string[];
}
