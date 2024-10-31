import { User } from "@prisma/client";

import type {
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "../../types/users/UserRequest.type";

export interface IUserRepository {
  register(
    inputData: UserRegisterInput,
  ): Promise<{ user: User; token: string }>;
  login(inputData: UserLoginInput): Promise<{ user: User; token: string }>;
  update(inputData: UserUpdateInput): Promise<Partial<User>>;
}
