import { User } from "@prisma/client";

import type {
  UserId,
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "../../types/users/UserRequest.type";

export interface IUserRepository {
  register(
    inputData: UserRegisterInput,
  ): Promise<{ user: User; token: string }>;
  login(inputData: UserLoginInput): Promise<{ user: User; token: string }>;
  reLogin(inputData: UserId): Promise<User>;
  update(inputData: UserUpdateInput): Promise<Partial<User>>;
  delete(inputData: UserId): Promise<User>;
}
