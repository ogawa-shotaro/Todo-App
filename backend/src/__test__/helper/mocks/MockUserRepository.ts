import type { User } from "@prisma/client";

import type { IUserRepository } from "../../../repositories/users/IUserRepository";
import type {
  UserId,
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "../../../types/users/UserRequest.type";

export class MockRepository implements IUserRepository {
  register = jest.fn<
    Promise<{ user: User; token: string }>,
    [UserRegisterInput]
  >();
  login = jest.fn<Promise<{ user: User; token: string }>, [UserLoginInput]>();
  reLogin = jest.fn<Promise<User>, [UserId]>();
  update = jest.fn<Promise<Partial<User>>, [UserUpdateInput]>();
  delete = jest.fn<Promise<User>, [UserId]>();
}
