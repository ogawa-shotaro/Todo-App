import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { hashPassword } from "../../auths/password_operator";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import type {
  UserLoginInput,
  UserRegisterInput,
} from "../../types/users/UserRequest.type";

const prisma = new PrismaClient();

const createJWT = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};

export class UserRepository {
  async register(inputData: UserRegisterInput) {
    const hashedPassword = await hashPassword(inputData.password);
    const userData: User = await prisma.user.create({
      data: {
        name: inputData.name,
        password: hashedPassword,
        email: inputData.email,
      },
    });

    const token = createJWT(userData.id);

    return { user: userData, token };
  }
  async login(inputData: UserLoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: inputData.email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundError("認証に失敗しました。");
    }

    const passwordMatches = await bcrypt.compare(
      inputData.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedError("認証に失敗しました。");
    }

    const token = createJWT(user.id);

    return token;
  }
}
