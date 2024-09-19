import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import type { UserInput } from "../types/users/UserRequest.type";

const prisma = new PrismaClient();

export class UserRepository {
  async register(inputData: UserInput) {
    const userData: User = await prisma.user.create({
      data: {
        name: inputData.name,
        password: inputData.password,
        email: inputData.email,
      },
    });

    return userData;
  }
}
