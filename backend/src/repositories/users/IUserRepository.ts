import { User } from "@prisma/client";

import type {
  LoginInput,
  RegisterInput,
} from "../../types/auths/AuthRequest.type";
import type {
  UserId,
  UserUpdateInput,
} from "../../types/users/UserRequest.type";

export interface IUserRepository {
  register(inputData: RegisterInput): Promise<{ user: User; token: string }>;
  login(inputData: LoginInput): Promise<{ user: User; token: string }>;
  checkAndRefresh(inputData: UserId): Promise<{ user: User; token: string }>;
  update(inputData: UserUpdateInput): Promise<Partial<User>>;
  delete(inputData: UserId): Promise<User>;
}
