import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { hashPassword } from "../auths/password_operator";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { UserAuthInput, UserInput } from "../types/users/UserRequest.type";

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
  async login(inputData: UserAuthInput) {
    const user = await prisma.user.findUnique({
      where: { email: inputData.email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundError("ユーザーが見つかりません。");
    }

    const passwordMatches = await bcrypt.compare(
      inputData.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedError("認証に失敗しました。");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return token;
  }
}
