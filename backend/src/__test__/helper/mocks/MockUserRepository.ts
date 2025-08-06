import type { User } from "@prisma/client";

import type { IUserRepository } from "../../../repositories/users/IUserRepository";
import type {
  LoginInput,
  RegisterInput,
} from "../../../types/auths/AuthRequest.type";
import type {
  UserId,
  UserUpdateInput,
} from "../../../types/users/UserRequest.type";

export class MockRepository implements IUserRepository {
  register = jest.fn<Promise<{ user: User; token: string }>, [RegisterInput]>();
  login = jest.fn<Promise<{ user: User; token: string }>, [LoginInput]>();
  checkAndRefresh = jest.fn<Promise<{ user: User; token: string }>, [UserId]>();
  update = jest.fn<Promise<Partial<User>>, [UserUpdateInput]>();
  delete = jest.fn<Promise<User>, [UserId]>();
}
