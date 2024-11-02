import { User } from "@prisma/client";

import type {
  UserDeleteInput,
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
  delete(inputData: UserDeleteInput): Promise<User>;
}
