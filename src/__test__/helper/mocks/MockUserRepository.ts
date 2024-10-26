import type { User } from "@prisma/client";

import type { IUserRepository } from "../../../repositories/users/IUserRepository";
import type {
  UserLoginInput,
  UserRegisterInput,
} from "../../../types/users/UserRequest.type";

export class MockRepository implements IUserRepository {
  register = jest.fn<
    Promise<{ user: User; token: string }>,
    [UserRegisterInput]
  >();
  login = jest.fn<Promise<{ user: User; token: string }>, [UserLoginInput]>();
}
