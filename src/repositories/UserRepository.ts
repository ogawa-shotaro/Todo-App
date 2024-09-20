import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { hashPassword } from "../auths/hashPassword";
import type { UserInput } from "../types/users/UserRequest.type";

const prisma = new PrismaClient();

export class UserRepository {
  async register(inputData: UserInput) {
    const hashedPassword = await hashPassword(inputData.password);
    const userData: User = await prisma.user.create({
      data: {
        name: inputData.name,
        password: hashedPassword,
        email: inputData.email,
      },
    });

    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { user: userData, token };
  }
}
