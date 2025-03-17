export type UserId = number;

export interface UserUpdateInput {
  userId: number;
  name?: string;
  password?: string;
  email?: string;
}
