import { User } from "@prisma/client";

import type {
  UserLoginInput,
  UserRegisterInput,
} from "../../types/auths/AuthRequest.type";
import type {
  UserId,
  UserUpdateInput,
} from "../../types/users/UserRequest.type";

export interface IUserRepository {
  register(
    inputData: UserRegisterInput,
  ): Promise<{ user: User; token: string }>;
  login(inputData: UserLoginInput): Promise<{ user: User; token: string }>;
  checkAndRefresh(inputData: UserId): Promise<{ user: User; token: string }>;
  update(inputData: UserUpdateInput): Promise<Partial<User>>;
  delete(inputData: UserId): Promise<User>;
}
