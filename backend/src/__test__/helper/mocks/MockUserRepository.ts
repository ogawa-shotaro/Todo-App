import type { User } from "@prisma/client";

import type { IUserRepository } from "../../../repositories/users/IUserRepository";
import type {
  UserLoginInput,
  UserRegisterInput,
} from "../../../types/auths/AuthRequest.type";
import type {
  UserId,
  UserUpdateInput,
} from "../../../types/users/UserRequest.type";

export class MockRepository implements IUserRepository {
  register = jest.fn<
    Promise<{ user: User; token: string }>,
    [UserRegisterInput]
  >();
  login = jest.fn<Promise<{ user: User; token: string }>, [UserLoginInput]>();
  checkAndRefresh = jest.fn<Promise<{ user: User; token: string }>, [UserId]>();
  update = jest.fn<Promise<Partial<User>>, [UserUpdateInput]>();
  delete = jest.fn<Promise<User>, [UserId]>();
}
