import type { User } from "@prisma/client";

import type { IUserRepository } from "../../../repositories/users/IUserRepository";
import type {
  UserDeleteInput,
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
  update = jest.fn<Promise<Partial<User>>, [UserUpdateInput]>();
  delete = jest.fn<Promise<User>, [UserDeleteInput]>();
}
